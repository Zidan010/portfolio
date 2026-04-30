// netlify/functions/admin-save.js
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
    } catch { return null; }
}

async function ghGet(filePath, token, repo) {
    const branch = process.env.GITHUB_BRANCH || 'main';
    const res = await fetch(
        `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        }
    );
    if (!res.ok) return null;
    return res.json();
}

async function ghPut(filePath, content, message, existingSha, token, repo) {
    const branch = process.env.GITHUB_BRANCH || 'main';

    // Build body — only include sha when updating an existing file
    const body = {
        message,
        content: Buffer.from(content).toString('base64'),
        branch
    };
    if (existingSha) body.sha = existingSha;

    const res = await fetch(
        `https://api.github.com/repos/${repo}/contents/${filePath}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json',
                'Content-Type': 'application/json',
                'X-GitHub-Api-Version': '2022-11-28'
            },
            body: JSON.stringify(body)
        }
    );

    const data = await res.json();

    // 422 / 409 means the file already exists but we didn't have its SHA.
    // Fetch the current SHA and retry once.
    if (!res.ok && (res.status === 422 || res.status === 409)) {
        const existing = await ghGet(filePath, token, repo);
        if (existing?.sha) {
            body.sha = existing.sha;
            const retry = await fetch(
                `https://api.github.com/repos/${repo}/contents/${filePath}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/vnd.github+json',
                        'Content-Type': 'application/json',
                        'X-GitHub-Api-Version': '2022-11-28'
                    },
                    body: JSON.stringify(body)
                }
            );
            const retryData = await retry.json();
            if (!retry.ok) throw new Error(retryData.message || 'GitHub write failed on retry');
            return retryData;
        }
    }

    if (!res.ok) throw new Error(data.message || `GitHub write failed (${res.status})`);
    return data;
}

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const authHeader = event.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '');
    if (!process.env.JWT_SECRET || !verifyJWT(token, process.env.JWT_SECRET)) {
        return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    const ghToken = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO;
    if (!ghToken || !repo) {
        return { statusCode: 500, body: JSON.stringify({ error: 'GitHub env vars not set' }) };
    }

    try {
        const payload = JSON.parse(event.body);

        // 1. Commit resume_data.json
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

        // 2. Commit new PDF if provided
        if (payload.pdfBase64 && payload.pdfFilename) {
            const existingPdf = await ghGet(payload.pdfFilename, ghToken, repo);
            try {
                await ghPut(
                    payload.pdfFilename,
                    Buffer.from(payload.pdfBase64, 'base64').toString('binary'),
                    `chore: update resume PDF (${payload.pdfFilename})`,
                    existingPdf?.sha || null,
                    ghToken,
                    repo
                );
            } catch (pdfErr) {
                console.error('PDF upload error (non-fatal):', pdfErr.message);
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