// netlify/functions/admin-save.js
// Commits updated resume_data.json (and optionally a new PDF) to GitHub via the API.
// This triggers an automatic Netlify redeploy so the live site updates.

import crypto from 'crypto';

// ─── JWT verification (copied inline to avoid shared module issues) ─────────
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

// ─── GitHub helpers ─────────────────────────────────────────────────────────
async function ghGet(path, token, repo) {
    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    if (!res.ok) return null;
    return res.json();
}

async function ghPut(path, content, message, sha, token, repo) {
    const body = {
        message,
        content: Buffer.from(content).toString('base64'),
        branch: process.env.GITHUB_BRANCH || 'main'
    };
    if (sha) body.sha = sha;

    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'X-GitHub-Api-Version': '2022-11-28'
        },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'GitHub write failed');
    return data;
}

// ─── Handler ────────────────────────────────────────────────────────────────
export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    // Auth check
    const authHeader = event.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '');
    const secret = process.env.JWT_SECRET;
    if (!secret || !verifyJWT(token, secret)) {
        return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    const ghToken = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO; // e.g. "zidan010/portfolio"
    if (!ghToken || !repo) {
        return { statusCode: 500, body: JSON.stringify({ error: 'GitHub env vars not set' }) };
    }

    try {
        const payload = JSON.parse(event.body);

        // 1. Save resume_data.json
        if (payload.resumeData) {
            const jsonContent = JSON.stringify(payload.resumeData, null, 2);
            const existing = await ghGet('resume_data.json', ghToken, repo);
            await ghPut(
                'resume_data.json',
                jsonContent,
                'chore: update resume data via admin panel',
                existing?.sha || null,
                ghToken,
                repo
            );
        }

        // 2. Save new PDF if provided (base64 encoded)
        if (payload.pdfBase64 && payload.pdfFilename) {
            const existingPdf = await ghGet(payload.pdfFilename, ghToken, repo);
            const res = await fetch(`https://api.github.com/repos/${repo}/contents/${payload.pdfFilename}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${ghToken}`,
                    Accept: 'application/vnd.github+json',
                    'Content-Type': 'application/json',
                    'X-GitHub-Api-Version': '2022-11-28'
                },
                body: JSON.stringify({
                    message: `chore: update resume PDF (${payload.pdfFilename})`,
                    content: payload.pdfBase64,
                    sha: existingPdf?.sha || undefined,
                    branch: process.env.GITHUB_BRANCH || 'main'
                })
            });
            if (!res.ok) {
                const err = await res.json();
                console.error('PDF upload error:', err);
                // Non-fatal — JSON save succeeded
            }
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ok: true, message: 'Committed to GitHub. Netlify will redeploy shortly.' })
        };
    } catch (err) {
        console.error('admin-save error:', err);
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
}
