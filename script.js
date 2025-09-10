document.addEventListener('DOMContentLoaded', function() {
    /* ===================== NAVBAR & SCROLLING ===================== */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    /* ===================== ANIMATIONS ===================== */
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

    /* ===================== STATS COUNTER ===================== */
    const stats = document.querySelectorAll('.stat h3');
    let hasAnimated = false;
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                stats.forEach(stat => {
                    const target = stat.textContent;
                    const isPercentage = target.includes('%');
                    const isPlus = target.includes('+');
                    const number = parseInt(target.replace(/[^0-9]/g, ''));
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) { current = number; clearInterval(timer); }
                        let displayValue = Math.floor(current).toString();
                        if (isPercentage) displayValue += '%';
                        if (isPlus) displayValue += '+';
                        stat.textContent = displayValue;
                    }, 30);
                });
            }
        });
    }, { threshold: 0.5 });
    const aboutSection = document.querySelector('.about');
    if (aboutSection) statsObserver.observe(aboutSection);

    /* ===================== CHATBOT ===================== */
    const resumeData = {
        name: "Ahmed Zidan",
        email: "ahmed@example.com",
        skills: ["AI/ML", "NLP", "Computer Vision", "API Development"],
        experience: [{ company: "ABC Corp", role: "AI Developer", years: 1 }],
        education: [{ degree: "BSc in Computer Science", year: 2023 }]
    };

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
        if (!userMessage) return { content: "Please enter a message." };
        const systemPrompt = `You are an AI assistant. Use this resume data to answer questions:\n${JSON.stringify(resumeData, null, 2)}\nAnswer concisely.`;
        try {
            const response = await fetch("/.netlify/functions/groq", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, systemPrompt })
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            const rawContent = data.choices?.[0]?.message?.content?.trim();
            try { return JSON.parse(rawContent); } 
            catch { return { content: rawContent }; }
        } catch (err) {
            console.error(err);
            return { content: "Sorry, something went wrong." };
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
        appendMessage(response.content || "No response.", 'bot');
    }

    window.sendMessage = sendMessage; // expose globally for HTML onclick
    window.handleKeyPress = (e) => { if (e.key === 'Enter') sendMessage(); };

    /* ===================== CHATBOT MINIMIZE ===================== */
    window.minimizeChatbot = function() {
        const chatbot = document.getElementById('chatbot');
        const toggleBtn = document.getElementById('toggle-btn');
        if (!chatbot || !toggleBtn) return console.error('Chatbot or toggle button not found!');
        chatbot.classList.toggle('minimized');
        toggleBtn.innerHTML = chatbot.classList.contains('minimized') ? '&#9650;' : '&#9660;';
        if (!chatbot.classList.contains('minimized')) setTimeout(() => { if (userInput) userInput.focus(); }, 100);
    };
});
