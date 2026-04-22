// netlify/functions/admin-auth.js
// Validates admin credentials and returns a signed JWT token

import crypto from 'crypto';

function base64url(str) {
    return Buffer.from(str).toString('base64')
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function signJWT(payload, secret) {
    const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = base64url(JSON.stringify(payload));
    const sig = crypto
        .createHmac('sha256', secret)
        .update(`${header}.${body}`)
        .digest('base64')
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return `${header}.${body}.${sig}`;
}

export function verifyJWT(token, secret) {
    try {
        const [header, body, sig] = token.split('.');
        const expected = crypto
            .createHmac('sha256', secret)
            .update(`${header}.${body}`)
            .digest('base64')
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        if (sig !== expected) return null;
        const payload = JSON.parse(Buffer.from(body, 'base64').toString());
        if (payload.exp < Date.now() / 1000) return null;
        return payload;
    } catch {
        return null;
    }
}

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        const { username, password } = JSON.parse(event.body);
        const validUser = process.env.ADMIN_USERNAME;
        const validPass = process.env.ADMIN_PASSWORD;
        const secret = process.env.JWT_SECRET;

        if (!validUser || !validPass || !secret) {
            return { statusCode: 500, body: JSON.stringify({ error: 'Server misconfiguration: env vars missing' }) };
        }

        if (username !== validUser || password !== validPass) {
            return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
        }

        const token = signJWT(
            { sub: username, role: 'admin', exp: Math.floor(Date.now() / 1000) + 86400 }, // 24h
            secret
        );

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        };
    } catch (err) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Bad request' }) };
    }
}
