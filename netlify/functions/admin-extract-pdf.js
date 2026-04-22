// netlify/functions/admin-extract-pdf.js
// Receives a base64-encoded PDF, extracts its text using pdf-parse,
// then calls Groq to structure it into the resume JSON schema.

import crypto from 'crypto';

// ─── JWT verification ────────────────────────────────────────────────────────
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

// ─── Handler ─────────────────────────────────────────────────────────────────
export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const authHeader = event.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '');
    if (!verifyJWT(token, process.env.JWT_SECRET || '')) {
        return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    if (!process.env.GROQ_API_KEY) {
        return { statusCode: 500, body: JSON.stringify({ error: 'GROQ_API_KEY not set' }) };
    }

    try {
        const { pdfBase64, existingConstants } = JSON.parse(event.body);
        if (!pdfBase64) {
            return { statusCode: 400, body: JSON.stringify({ error: 'pdfBase64 is required' }) };
        }

        // Decode base64 → Buffer → extract text with pdf-parse
        const pdfBuffer = Buffer.from(pdfBase64, 'base64');
        const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default;
        const parsed = await pdfParse(pdfBuffer);
        const pdfText = parsed.text;

        // Call Groq to structure the text
        const prompt = `You are an expert CV parser. Extract the following structured JSON from this CV text.

Return ONLY valid JSON with exactly these keys:
- personal_info: { name, email, phone, address, github, linkedin }
- education: [ { degree, institution, year } ]
- skills: { "Category Name": ["skill1", "skill2"] }
- experience: [ { title, company, company_link, duration, works_done: [] } ]
- research_work: [ { research_name, description, source_link } ]
- projects: [ { name, description, source_link } ]
- summary: string

For any field you cannot find, use null. For source_link, use null if not found.

CV TEXT:
${pdfText}

Return ONLY the JSON object, no markdown, no explanation.`;

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: 'You are a precise JSON extractor. Output only valid JSON.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.1,
                max_tokens: 4096
            })
        });

        if (!groqRes.ok) {
            const err = await groqRes.text();
            throw new Error(`Groq error: ${groqRes.status} — ${err}`);
        }

        const groqData = await groqRes.json();
        let content = groqData.choices?.[0]?.message?.content || '';

        // Strip any accidental markdown fences
        content = content.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

        const extracted = JSON.parse(content);

        // Preserve existing constants — they are managed separately in the admin
        if (existingConstants) {
            extracted.constants = existingConstants;
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ok: true, resumeData: extracted })
        };
    } catch (err) {
        console.error('admin-extract-pdf error:', err);
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
}
