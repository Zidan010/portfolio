// netlify/functions/admin-debug.js
// TEMPORARY — shows which env vars are present (not their values).
// DELETE THIS FILE after you've confirmed the env vars are set correctly.

import crypto from 'crypto';

function verifyJWT(token, secret) {
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
    // Still require auth so this isn't publicly accessible
    const authHeader = event.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '');
    const secret = process.env.JWT_SECRET;

    if (!secret || !verifyJWT(token, secret)) {
        return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    const checks = {
        JWT_SECRET:       { present: !!process.env.JWT_SECRET,       length: process.env.JWT_SECRET?.length || 0 },
        ADMIN_USERNAME:   { present: !!process.env.ADMIN_USERNAME,   length: process.env.ADMIN_USERNAME?.length || 0 },
        ADMIN_PASSWORD:   { present: !!process.env.ADMIN_PASSWORD,   length: process.env.ADMIN_PASSWORD?.length || 0 },
        GITHUB_TOKEN:     { present: !!process.env.GITHUB_TOKEN,     preview: process.env.GITHUB_TOKEN?.slice(0,8) + '…' || 'NOT SET' },
        GITHUB_REPO:      { present: !!process.env.GITHUB_REPO,      value: process.env.GITHUB_REPO || 'NOT SET' },
        GITHUB_BRANCH:    { present: !!process.env.GITHUB_BRANCH,    value: process.env.GITHUB_BRANCH || '(not set — defaults to main)' },
        GROQ_API_KEY:     { present: !!process.env.GROQ_API_KEY,     preview: process.env.GROQ_API_KEY?.slice(0,8) + '…' || 'NOT SET' },
        NODE_ENV:         { value: process.env.NODE_ENV || 'not set' },
        NODE_VERSION:     { value: process.version },
    };

    // Also try a live GitHub API test if token + repo are present
    let githubTest = null;
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
        try {
            const res = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPO}`, {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            const data = await res.json();
            githubTest = {
                status: res.status,
                repoFound: res.ok,
                repoName: data.full_name || null,
                permissions: data.permissions || null,
                error: res.ok ? null : (data.message || 'Unknown error'),
            };
        } catch (err) {
            githubTest = { status: 'fetch_error', error: err.message };
        }
    } else {
        githubTest = { skipped: 'GITHUB_TOKEN or GITHUB_REPO not set' };
    }

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ envChecks: checks, githubTest }, null, 2)
    };
}
