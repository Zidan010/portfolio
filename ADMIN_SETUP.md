# Admin Panel Setup Guide

## New Files Added

```
portfolio/
├── admin.html                          ← Admin panel UI (/admin)
├── resume_data.json                    ← Source of truth for all resume data
├── script.js                           ← Updated: loads resume_data.json dynamically
├── package.json                        ← New: pdf-parse dependency
├── netlify.toml                        ← Updated: esbuild, /admin redirect, cache headers
└── netlify/functions/
    ├── groq.js                         ← Existing (unchanged)
    ├── admin-auth.js                   ← New: login → JWT token
    ├── admin-save.js                   ← New: commits JSON + PDF to GitHub
    └── admin-extract-pdf.js            ← New: PDF → text → Groq → structured JSON
```

---

## Required Netlify Environment Variables

Go to **Netlify Dashboard → Site → Environment Variables** and add:

| Variable | Value | Notes |
|---|---|---|
| `ADMIN_USERNAME` | `your_username` | Choose any username |
| `ADMIN_PASSWORD` | `your_strong_password` | Choose a strong password |
| `JWT_SECRET` | `any_random_long_string` | e.g. run `openssl rand -hex 32` |
| `GITHUB_TOKEN` | `ghp_xxxxxxxxxxxx` | GitHub Personal Access Token |
| `GITHUB_REPO` | `zidan010/portfolio` | Your GitHub repo (owner/name) |
| `GITHUB_BRANCH` | `main` | Branch to commit to (default: main) |
| `GROQ_API_KEY` | `gsk_xxxxxxxxxxxx` | Already set |

---

## Creating the GitHub Personal Access Token

1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → **Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give it a name: `portfolio-admin`
4. Select scopes: ✅ `repo` (full control of private repositories)
5. Copy the token and paste it as `GITHUB_TOKEN` in Netlify

---

## Deployment Steps

1. **Commit all new files to GitHub:**
   ```bash
   git add .
   git commit -m "feat: add admin panel with GitHub sync"
   git push origin main
   ```

2. **Add env vars in Netlify** (see table above)

3. **Trigger a redeploy** in Netlify (or push any commit)

4. **Visit** `https://ahmedzidan.netlify.app/admin` and log in

---

## How the Admin Panel Works

### Login
- Credentials checked against `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars via a serverless function
- On success, a 24-hour JWT is returned and stored in `localStorage`
- The JWT is sent as a Bearer token with every admin API call

### Editing Sections
- All sections (personal info, experience, projects, research, skills, education, summary, constants) are editable
- Changes are held in memory until you click **Save & Deploy**

### Upload New CV
1. Go to **Upload CV** in the sidebar
2. Drop or click to upload a PDF
3. The PDF is sent to `admin-extract-pdf` function, which:
   - Extracts text using `pdf-parse` (Node.js, no Python needed)
   - Sends the text to Groq LLaMA 3.3 70B to structure it into JSON
4. You see a preview of the extracted JSON
5. Click **Apply to All Sections** — all editor fields are pre-filled
6. Review, adjust anything, then **Save & Deploy**

### Save & Deploy
- Calls `admin-save` function
- Commits `resume_data.json` (and optionally the PDF) to GitHub via the GitHub API
- Netlify detects the push and automatically redeploys (~30 seconds)
- The live site fetches `resume_data.json` fresh on every load (no cache)

### Constants (Chatbot-only data)
- Marital status, availability, career goals, looking-for
- These are stored in `resume_data.json` under the `constants` key
- `script.js` flattens them into `window.resumeDataForChatbot` so the chatbot can access them

---

## How the Main Site Loads Data

`script.js` now starts with:
```js
async function loadResumeData() {
    const res = await fetch('/resume_data.json?v=' + Date.now());
    const data = await res.json();
    window.resumeDataForChatbot = { ...data, ...(data.constants || {}) };
}
```

The `?v=timestamp` cache-buster ensures the browser always gets the latest version after a deploy.

---

## Security Notes

- The admin page is never indexed (meta `noindex` + `X-Frame-Options: DENY`)
- JWT tokens expire after 24 hours
- All admin API endpoints verify the JWT before doing anything
- Credentials are never in the frontend code — only in Netlify env vars
- Consider using a strong, random `JWT_SECRET` (32+ characters)
