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
        personal: {
            name: "Sadir Ahmed Zidan",
            location: "Dhaka, Bangladesh",
            email: "sazidan559@gmail.com",
            phone: "01640423606",
            linkedin: "Sadir Ahmed Zidan",
            title: "Machine Learning Engineer",
            experience: "2+ years",
            marital_relationship_Status: "Single",
            future_career_Goals: [
                "Lead AI-driven projects in NLP and computer vision to solve real-world problems in tech giant companies.",
                "Contribute to open-source AI frameworks and tools",
                "Pursue advanced certifications in deep learning and cloud-based AI deployment",
                "Build Own AI products."
            ],
            availability: "Available for remote/online/work from home positions only. Available / Can be hired only for Machine Learning/AI related positions",
            lookingFor: [
                "Opportunities to work on innovative AI projects- building and deployment, particularly in NLP, LLMs, and computer vision",
                "Collaborative environments with a focus on cutting-edge technology and continuous learning",
                "Roles that offer growth into senior technical or leadership positions"
            ]
        },
        summary: "Passionate Machine Learning Engineer with 2+ years of experience developing and deploying custom AI models, AI APIs, leveraging pretrained solutions, and optimizing scalable systems. Reduced resource usage by 70% and improved processing efficiency by 40% through innovative data pipelines and API deployments. Proficient in Python, TensorFlow, PyTorch, Fast API and Docker, with a strong focus on NLP, LLMs, and computer vision.",
        education: {
            degree: "BSc in Computer Science & Engineering",
            university: "American International University Bangladesh",
            cgpa: "3.77/4.00",
            duration: "January 2020 – September 2023"
        },
        experience: [
            {
                title: "Jr. Machine Learning Engineer",
                company: "Nasir Syntax Solution Limited (concern of Nasir Group)",
                duration: "January 2024 – Present",
                achievements: [
                    "Developed and optimized NLP models and LLMs, enhancing data processing efficiency by 40% for language-based tasks",
                    "Designed scalable data pipelines, reducing resource consumption by 70% through model finetuning, quantization and optimization techniques",
                    "Deployed RESTful APIs using Fast API and Docker, improving traffic handling capacity by 50% and ensuring robust error handling and validation",
                    "Contributed to AI-driven projects, including Search Engines, Recommendation Systems, Object Detection, Segmentation, Data Extraction and Retrieval-Augmented Generation (RAG)",
                    "Collaborated with development teams to design AI-driven educational tools, AI Agents using LangChain and LLMs via Groq",
                    "Built and maintained scalable backend APIs with Fast API, integrating with front ends, reducing latency by 30%",
                    "Utilized Jira and GitHub for agile project management, streamlining development cycles and improving team productivity by 20%",
                    "Optimized AI models through prompt engineering, enhancing performance metrics by 25% for educational applications"
                ]
            },
            {
                title: "Machine Learning Intern",
                company: "Nasir Syntax Solution Limited (concern of Nasir Group)",
                duration: "October 2023 – December 2023",
                achievements: [
                    "Conducted research on recommendation systems and chatbots, improving text generation accuracy by 20% using LLMs",
                    "Streamlined data collection processes, aggregating diverse datasets to support different AI use cases, increasing data availability by 35%",
                    "Fine-tuned LLMs for specific applications, achieving a 15% improvement in model performance metrics"
                ]
            }
        ],
        skills: {
            "Programming Languages": ["Python", "R"],
            "Frameworks & Libraries": ["TensorFlow", "Keras", "LangChain", "PyTorch", "Selenium", "Fast API", "Pandas", "Faiss", "Llama cpp", "ONNX", "Ollama", "Hugging Face", "Streamlit", "Swagger", "Eureka", "Groq"],
            "Tools & Platforms": ["Docker", "MLFlow", "Kubernetes", "GitHub", "VS Code", "R Studio", "Colab"],
            "Databases": ["SQL", "MongoDB"],
            "Domains": ["Machine Learning", "NLP", "Computer Vision", "Retrieval-Augmented Generation", "API Development", "AI Agent"],
            "Operating Systems": ["Windows", "Linux"]
        },
        projects: [
            {
                name: "Multilingual RAG System",
                description: "A multilingual RAG system for English and Bengali that retrieves information from PDFs and generates answers using LangChain, FAISS, and an LLM. It features a FastAPI-based REST API, memory modules, and an evaluation framework for quality assessment.",
                github: "https://github.com/zidan010/multilingual-rag-bangla",
                technologies: ["Python", "OpenCV", "Machine Learning", "OCR", "FastAPI", "Groq", "Faiss", "Langchain", "RAG"]
            },
            {
                name: "Face Mask Detection",
                description: "A system to detect facial masks using a cascade classifier. Used a large dataset that varies with different types of poses with masks worn by humans. The model got good accuracy after implementation.",
                github: "https://github.com/zidan010/MaskDetection",
                technologies: ["Python", "OpenCV", "Machine Learning"]
            },
            {
                name: "Drowsiness Detection",
                description: "A real-time system using machine learning algorithms and image processing to detect driver drowsiness. It can continuously monitor the driver while they are driving and provide immediate feedback or alerts.",
                github: "https://github.com/zidan010/DrowsinessDetection",
                technologies: ["Python", "Computer Vision", "Real-time Processing"]
            },
            {
                name: "Data Analysis & Prediction",
                description: "Analyzed a sleep health lifestyle dataset and applied algorithms to predict health levels as part of a data science project.",
                github: "https://github.com/zidan010/DataAnalysis",
                technologies: ["Python", "Data Analysis", "Pandas"]
            },
            {
                name: "Predicting Mental Health Condition",
                description: "Comparisons between different ML algorithms for predicting mental health condition, using online data.",
                github: "https://github.com/zidan010/MachineLearning",
                technologies: ["Python", "Machine Learning", "Data Science"]
            }
        ]
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
