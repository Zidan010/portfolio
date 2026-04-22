// script.js — loads resume_data.json at runtime so admin panel changes are always reflected

async function loadResumeData() {
    try {
        const res = await fetch('/resume_data.json?v=' + Date.now());
        if (!res.ok) throw new Error('Failed to load resume_data.json');
        const data = await res.json();
        // Flatten constants into the top-level object for chatbot compatibility
        window.resumeDataForChatbot = {
            ...data,
            ...(data.constants || {})
        };
        return data;
    } catch (err) {
        console.error('Could not load resume data:', err);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async function () {

    await loadResumeData();

    /* ===================== Navigation and Scrolling ===================== */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

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
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }
    });

    /* ===================== Animations ===================== */
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.project-card, .contact-card, .skill-category');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    /* ===================== Chatbot ===================== */
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');

    function appendMessage(content, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender === 'bot' ? 'bot-message' : 'user-message');
        msgDiv.innerHTML = content;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function generateResponse(userMessage) {
        if (!userMessage) return { content: "<p>Please enter a message.</p>" };

        const systemPrompt = `You are personal AI assistant for Sadir Ahmed Zidan, a Machine Learning Engineer. Your role is to provide concise, conversational, and user-friendly answers based *exclusively* on Zidan's resume data below. Do not use external information or make assumptions. For general queries (e.g., "Who is he?"), provide a brief summary (2-3 sentences) of Zidan's role, expertise, and location. For specific queries, summarize only the relevant resume sections (e.g., experience, skills, projects, contact details) in a clear, concise manner. Use minimal HTML for readability: <p> for text, <strong> for headings, and <ul><li> for lists only when needed (e.g., for skills or achievements). Ensure responses are displayed in a single column (row-wise). If the query is unrelated to the resume, politely redirect with: "Sorry, I can only answer questions about Zidan's resume. Try asking about his experience, skills, projects, or contact details!"
Resume data:
${JSON.stringify(window.resumeDataForChatbot, null, 2)}
`;

        try {
            const response = await fetch("/.netlify/functions/groq", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, systemPrompt })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            const content = data.choices?.[0]?.message?.content?.trim() || "<p>No response from API.</p>";
            return { content };
        } catch (err) {
            console.error("Chatbot error:", err);
            return { content: "<p>Sorry, something went wrong. Please try again or ask about Zidan's experience, skills, or projects.</p>" };
        }
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        appendMessage(message, 'user');
        userInput.value = '';
        appendMessage('Thinking...', 'bot');
        const response = await generateResponse(message);
        const lastBotMsg = chatMessages.querySelector('.bot-message:last-child');
        if (lastBotMsg && lastBotMsg.textContent === 'Thinking...') lastBotMsg.remove();
        appendMessage(response.content || "<p>No response. Please try again.</p>", 'bot');
    }

    window.sendMessage = sendMessage;
    window.handleKeyPress = (e) => { if (e.key === 'Enter') sendMessage(); };

    window.minimizeChatbot = function () {
        const chatbot = document.getElementById('chatbot');
        const toggleBtn = document.getElementById('toggle-btn');
        if (!chatbot || !toggleBtn) return console.error('Chatbot or toggle button not found!');
        chatbot.classList.toggle('minimized');
        toggleBtn.innerHTML = chatbot.classList.contains('minimized') ? '&#9650;' : '&#9660;';
        if (!chatbot.classList.contains('minimized')) setTimeout(() => { if (userInput) userInput.focus(); }, 100);
    };

    const btn = document.querySelector('.download-resume-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            const key = 'resumeDownloadCount';
            const count = (parseInt(localStorage.getItem(key), 10) || 0) + 1;
            localStorage.setItem(key, count);
            console.log(`Resume download clicked — total: ${count}`);
        });
    }
});
