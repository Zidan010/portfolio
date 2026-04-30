// script.js — dynamically renders all portfolio sections from resume_data.json

// ════════════════════════════════════════════════════════════════
// DATA LOADING
// ════════════════════════════════════════════════════════════════
async function loadResumeData() {
    try {
        const res = await fetch('/resume_data.json?v=' + Date.now());
        if (!res.ok) throw new Error('Failed to load resume_data.json');
        const data = await res.json();
        window.resumeDataForChatbot = { ...data, ...(data.constants || {}) };
        return data;
    } catch (err) {
        console.error('Could not load resume data:', err);
        return null;
    }
}

// ════════════════════════════════════════════════════════════════
// RENDERERS — each writes into a specific container in index.html
// ════════════════════════════════════════════════════════════════

function renderNavSocials(data) {
    const p = data.personal_info || {};
    const socials = [
        { url: p.facebook,  icon: 'fab fa-facebook',  label: 'Facebook'  },
        { url: p.linkedin,  icon: 'fab fa-linkedin',  label: 'LinkedIn'  },
        { url: p.github,    icon: 'fab fa-github',    label: 'GitHub'    },
        { url: p.whatsapp,  icon: 'fab fa-whatsapp',  label: 'WhatsApp'  },
    ];
    const el = document.getElementById('nav-socials');
    if (!el) return;
    el.innerHTML = socials
        .filter(s => s.url)
        .map(s => `<a href="${s.url}" target="_blank" class="social-link" aria-label="${s.label}"><i class="${s.icon}"></i></a>`)
        .join('');
}

function renderHero(data) {
    const h = data.hero || {};
    const el = id => document.getElementById(id);

    if (el('hero-name'))    el('hero-name').textContent    = h.name  || data.personal_info?.name || '';
    if (el('hero-title'))   el('hero-title').textContent   = h.title || '';
    if (el('hero-buttons')) el('hero-buttons').innerHTML   = `
        <a href="#projects" class="btn btn-primary">View Projects</a>
        <a href="#contact"  class="btn btn-outline">Get in Touch</a>
        <a href="${h.resume_link || '#'}" class="btn btn-secondary" target="_blank" rel="noopener">
            <i class="fas fa-download"></i> Download Resume
        </a>`;
}

function renderAbout(data) {
    const about = data.about || {};
    const textEl  = document.getElementById('about-text');
    const statsEl = document.getElementById('about-stats');
    if (textEl)  textEl.textContent = about.text || '';
    if (statsEl) statsEl.innerHTML  = (about.stats || []).map(s => `
        <div class="stat">
            <h3>${s.value}</h3>
            <p>${s.label}</p>
        </div>`).join('');
}

function renderSkills(data) {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    grid.innerHTML = Object.entries(data.skills || {}).map(([cat, items]) => `
        <div class="skill-category">
            <h4>${cat}</h4>
            <div class="skill-tags">
                ${(items || []).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>`).join('');
}

function renderExperience(data) {
    const grid = document.getElementById('experience-grid');
    if (!grid) return;
    grid.innerHTML = (data.experience || []).map(exp => `
        <div class="experience-card">
            <h3>${exp.title}</h3>
            <h4>${exp.company}</h4>
            <p class="duration">${exp.duration}</p>
            <ul>
                ${(exp.works_done || []).map(w => `<li>${w}</li>`).join('')}
            </ul>
            ${exp.company_link ? `
            <div class="experience-links">
                <a href="${exp.company_link}" target="_blank" class="btn btn-outline btn-sm">View Workspace</a>
            </div>` : ''}
        </div>`).join('');
}

function renderProjects(data) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = (data.projects || []).map(p => `
        <div class="project-card">
            <div class="project-image">
                <i class="fas ${p.icon || 'fa-code'}"></i>
            </div>
            <div class="project-content">
                <div class="project-details">
                    <h3>${p.name}</h3>
                    <p>${p.description}</p>
                    <div class="project-tech">
                        ${(p.tech_tags || []).map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
                <div class="project-links">
                    ${p.source_link ? `<a href="${p.source_link}" target="_blank" class="btn btn-outline btn-sm"><i class="fab fa-github"></i>-Code</a>` : ''}
                </div>
            </div>
        </div>`).join('');
}

function renderResearch(data) {
    const grid = document.getElementById('research-grid');
    if (!grid) return;
    grid.innerHTML = (data.research_work || []).map(r => `
        <div class="research-card">
            <h3>${r.research_name}</h3>
            <h4>${r.role || ''}</h4>
            <p class="status">${r.status || ''}</p>
            <p class="research-description">${r.description}</p>
            <div class="research-details">
                ${(r.tags || []).map(t => `<span class="detail-tag">${t}</span>`).join('')}
            </div>
            ${r.source_link ? `<div style="margin-top:12px"><a href="${r.source_link}" target="_blank" class="btn btn-outline btn-sm">View Paper</a></div>` : ''}
        </div>`).join('');
}

function renderContact(data) {
    const p   = data.personal_info || {};
    const grid = document.getElementById('contact-grid');
    const emailBtn = document.getElementById('contact-email-btn');

    if (emailBtn && p.email) emailBtn.href = `mailto:${p.email}`;

    if (!grid) return;
    const cards = [
        p.email   && { icon: 'fas fa-envelope',      title: 'Email',    content: `<a href="mailto:${p.email}">${p.email}</a>` },
        p.phone   && { icon: 'fas fa-phone',          title: 'Phone',    content: `<a href="tel:${p.phone}">${p.phone}</a>` },
        p.linkedin && { icon: 'fab fa-linkedin',      title: 'LinkedIn', content: `<a href="${p.linkedin}" target="_blank">Sadir Ahmed Zidan</a>` },
        p.address && { icon: 'fas fa-map-marker-alt', title: 'Location', content: `<p>${p.address}</p>` },
    ].filter(Boolean);

    grid.innerHTML = cards.map(c => `
        <div class="contact-card">
            <div class="contact-icon"><i class="${c.icon}"></i></div>
            <h3>${c.title}</h3>
            ${c.content}
        </div>`).join('');
}

// ════════════════════════════════════════════════════════════════
// BOOT
// ════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', async function () {

    const data = await loadResumeData();

    if (data) {
        renderNavSocials(data);
        renderHero(data);
        renderAbout(data);
        renderSkills(data);
        renderExperience(data);
        renderProjects(data);
        renderResearch(data);
        renderContact(data);
    }

    /* ── Navigation & Scrolling ── */
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.nav-menu');
    const navLinks  = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            const target = document.querySelector(this.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section').forEach(s => {
            if (pageYOffset >= s.offsetTop - 100) current = s.getAttribute('id');
        });
        navLinks.forEach(l => l.classList.remove('active'));
        navLinks.forEach(l => {
            if (l.getAttribute('href') === `#${current}`) l.classList.add('active');
        });
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.style.boxShadow = window.scrollY > 50 ? '0 2px 20px rgba(255,255,255,0.1)' : 'none';
    });

    /* ── Scroll Animations ── */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Re-observe after render (rendered elements need observing)
    function observeAnimated() {
        document.querySelectorAll('.project-card, .contact-card, .skill-category').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    // Small delay to let renderers finish
    setTimeout(observeAnimated, 100);

    /* ── Chatbot ── */
    const chatMessages = document.getElementById('chatMessages');
    const userInput    = document.getElementById('userInput');

    function appendMessage(content, sender) {
        const d = document.createElement('div');
        d.classList.add('message', sender === 'bot' ? 'bot-message' : 'user-message');
        d.innerHTML = content;
        chatMessages.appendChild(d);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function generateResponse(userMessage) {
        if (!userMessage) return { content: '<p>Please enter a message.</p>' };
        const systemPrompt = `You are personal AI assistant for Sadir Ahmed Zidan, a Machine Learning Engineer. Your role is to provide concise, conversational, and user-friendly answers based *exclusively* on Zidan's resume data below. Do not use external information or make assumptions. For general queries (e.g., "Who is he?"), provide a brief summary (2-3 sentences) of Zidan's role, expertise, and location. For specific queries, summarize only the relevant resume sections in a clear, concise manner. Use minimal HTML: <p> for text, <strong> for headings, <ul><li> for lists. If the query is unrelated to the resume, politely redirect.\nResume data:\n${JSON.stringify(window.resumeDataForChatbot, null, 2)}`;
        try {
            const res  = await fetch('/.netlify/functions/groq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, systemPrompt })
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const d = await res.json();
            return { content: d.choices?.[0]?.message?.content?.trim() || '<p>No response from API.</p>' };
        } catch (err) {
            console.error('Chatbot error:', err);
            return { content: '<p>Sorry, something went wrong. Please try again.</p>' };
        }
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        appendMessage(message, 'user');
        userInput.value = '';
        appendMessage('Thinking...', 'bot');
        const res = await generateResponse(message);
        const last = chatMessages.querySelector('.bot-message:last-child');
        if (last && last.textContent === 'Thinking...') last.remove();
        appendMessage(res.content || '<p>No response. Please try again.</p>', 'bot');
    }

    window.sendMessage   = sendMessage;
    window.handleKeyPress = (e) => { if (e.key === 'Enter') sendMessage(); };

    window.minimizeChatbot = function () {
        const chatbot   = document.getElementById('chatbot');
        const toggleBtn = document.getElementById('toggle-btn');
        if (!chatbot || !toggleBtn) return;
        chatbot.classList.toggle('minimized');
        toggleBtn.innerHTML = chatbot.classList.contains('minimized') ? '&#9650;' : '&#9660;';
        if (!chatbot.classList.contains('minimized')) setTimeout(() => userInput?.focus(), 100);
    };
});
