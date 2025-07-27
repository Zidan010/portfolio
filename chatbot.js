// // Resume data for the chatbot
// const resumeData = {
//     personal: {
//         name: "Sadir Ahmed Zidan",
//         location: "Dhaka, Bangladesh",
//         email: "sazidan559@gmail.com",
//         phone: "01640423606",
//         linkedin: "Sadir Ahmed Zidan",
//         title: "Machine Learning Engineer",
//         experience: "2+ years"
//     },
//     summary: "Passionate Machine Learning Engineer with 2+ years of experience developing and deploying custom AI models, AI APIs, leveraging pretrained solutions, and optimizing scalable systems. Reduced resource usage by 70% and improved processing efficiency by 40% through innovative data pipelines and API deployments. Proficient in Python, TensorFlow, PyTorch, Fast API and Docker, with a strong focus on NLP, LLMs, and computer vision.",
//     education: {
//         degree: "BSc in Computer Science & Engineering",
//         university: "American International University Bangladesh",
//         cgpa: "3.77/4.00",
//         duration: "January 2020 – September 2023"
//     },
//     experience: [
//         {
//             title: "Jr. Machine Learning Engineer",
//             company: "Nasir Syntax Solution Limited (concern of Nasir Group)",
//             duration: "January 2024 – Present",
//             achievements: [
//                 "Developed and optimized NLP models and LLMs, enhancing data processing efficiency by 40% for language-based tasks",
//                 "Designed scalable data pipelines, reducing resource consumption by 70% through model finetuning, quantization and optimization techniques",
//                 "Deployed RESTful APIs using Fast API and Docker, improving traffic handling capacity by 50% and ensuring robust error handling and validation",
//                 "Contributed to AI-driven projects, including Search Engines, Recommendation Systems, Object Detection, Segmentation, Data Extraction and Retrieval-Augmented Generation (RAG)"
//             ]
//         },
//         {
//             title: "AI Developer - Remote",
//             company: "GradMate AI",
//             duration: "Apr 2025 – Present",
//             achievements: [
//                 "Collaborated with development teams to design AI-driven educational tools, AI Agents using LangChain and LLMs via Groq",
//                 "Built and maintained scalable backend APIs with Fast API, integrating with front ends, reducing latency by 30%",
//                 "Utilized Jira and GitHub for agile project management, streamlining development cycles and improving team productivity by 20%",
//                 "Optimized AI models through prompt engineering, enhancing performance metrics by 25% for educational applications"
//             ]
//         },
//         {
//             title: "Machine Learning Intern",
//             company: "Nasir Syntax Solution Limited (concern of Nasir Group)",
//             duration: "October 2023 – December 2023",
//             achievements: [
//                 "Conducted research on recommendation systems and chatbots, improving text generation accuracy by 20% using LLMs",
//                 "Streamlined data collection processes, aggregating diverse datasets to support different AI use cases, increasing data availability by 35%",
//                 "Fine-tuned LLMs for specific applications, achieving a 15% improvement in model performance metrics"
//             ]
//         }
//     ],
//     skills: {
//         "Programming Languages": ["Python", "R"],
//         "Frameworks & Libraries": ["TensorFlow", "Keras", "LangChain", "PyTorch", "Selenium", "Fast API", "Pandas", "Faiss", "Llama cpp", "ONNX", "Ollama", "Hugging Face", "Streamlit", "Swagger", "Eureka", "Groq"],
//         "Tools & Platforms": ["Docker", "MLFlow", "Kubernetes", "GitHub", "VS Code", "R Studio", "Colab"],
//         "Databases": ["SQL", "MongoDB"],
//         "Domains": ["Machine Learning", "NLP", "Computer Vision", "Retrieval-Augmented Generation", "API Development", "AI Agent"],
//         "Operating Systems": ["Windows", "Linux"]
//     },
//     projects: [
//         {
//             name: "Face Mask Detection",
//             description: "A system to detect facial masks using a cascade classifier. Used a large dataset that varies with different types of poses with masks worn by humans. The model got good accuracy after implementation.",
//             github: "github.com/zidan010/MaskDetection",
//             technologies: ["Python", "OpenCV", "Machine Learning"]
//         },
//         {
//             name: "Drowsiness Detection",
//             description: "A real-time system using machine learning algorithms and image processing to detect driver drowsiness. It can continuously monitor the driver while they are driving and provide immediate feedback or alerts.",
//             github: "github.com/zidan010/DrowsinessDetection",
//             technologies: ["Python", "Computer Vision", "Real-time Processing"]
//         },
//         {
//             name: "Data Analysis & Prediction",
//             description: "Analyzed a sleep health lifestyle dataset and applied algorithms to predict health levels as part of a data science project.",
//             github: "github.com/zidan010/DataAnalysis",
//             technologies: ["Python", "Data Analysis", "Pandas"]
//         },
//         {
//             name: "Predicting Mental Health Condition",
//             description: "Comparisons between different ML algorithms for predicting mental health condition, using online data.",
//             github: "github.com/zidan010/MachineLearning",
//             technologies: ["Python", "Machine Learning", "Data Science"]
//         }
//     ]
// };

// // Chatbot functionality
// let isTyping = false;

// function addMessage(message, isUser = false) {
//     const messagesContainer = document.getElementById('chatMessages');
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
//     const contentDiv = document.createElement('div');
//     contentDiv.className = 'message-content';
//     contentDiv.textContent = message;
    
//     messageDiv.appendChild(contentDiv);
//     messagesContainer.appendChild(messageDiv);
//     messagesContainer.scrollTop = messagesContainer.scrollHeight;
// }

// function addTypingIndicator() {
//     const messagesContainer = document.getElementById('chatMessages');
//     const typingDiv = document.createElement('div');
//     typingDiv.className = 'message bot-message typing-indicator';
//     typingDiv.id = 'typing-indicator';
    
//     const contentDiv = document.createElement('div');
//     contentDiv.className = 'message-content';
//     contentDiv.innerHTML = 'Typing<span class="dots"><span>.</span><span>.</span><span>.</span></span>';
    
//     typingDiv.appendChild(contentDiv);
//     messagesContainer.appendChild(typingDiv);
//     messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
//     // Add CSS for typing animation
//     if (!document.getElementById('typing-styles')) {
//         const style = document.createElement('style');
//         style.id = 'typing-styles';
//         style.textContent = `
//             .dots span {
//                 animation: typing 1.4s infinite;
//                 animation-fill-mode: both;
//             }
//             .dots span:nth-child(2) { animation-delay: 0.2s; }
//             .dots span:nth-child(3) { animation-delay: 0.4s; }
//             @keyframes typing {
//                 0%, 60%, 100% { opacity: 0; }
//                 30% { opacity: 1; }
//             }
//         `;
//         document.head.appendChild(style);
//     }
// }

// function removeTypingIndicator() {
//     const typingIndicator = document.getElementById('typing-indicator');
//     if (typingIndicator) {
//         typingIndicator.remove();
//     }
// }

// function generateResponse(userMessage) {
//     const message = userMessage.toLowerCase();
    
//     // Personal information
//     if (message.includes('name') || message.includes('who are you') || message.includes('who is sadir')) {
//         return `I'm an AI assistant representing ${resumeData.personal.name}, a ${resumeData.personal.title} based in ${resumeData.personal.location}. I can tell you about his experience, skills, projects, and background in machine learning and AI.`;
//     }
    
//     if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach')) {
//         return `You can contact Sadir at:\n📧 Email: ${resumeData.personal.email}\n📱 Phone: ${resumeData.personal.phone}\n💼 LinkedIn: ${resumeData.personal.linkedin}\n📍 Location: ${resumeData.personal.location}`;
//     }
    
//     // Experience and background
//     if (message.includes('experience') || message.includes('background') || message.includes('work')) {
//         let response = `Sadir has ${resumeData.personal.experience} of experience in machine learning and AI. Here's his work experience:\n\n`;
//         resumeData.experience.forEach((job, index) => {
//             response += `${index + 1}. ${job.title} at ${job.company} (${job.duration})\n`;
//         });
//         return response;
//     }
    
//     if (message.includes('current') || message.includes('now') || message.includes('present')) {
//         const currentJob = resumeData.experience.find(job => job.duration.includes('Present'));
//         if (currentJob) {
//             return `Sadir is currently working as a ${currentJob.title} at ${currentJob.company} since ${currentJob.duration.split(' – ')[0]}. In this role, he has achieved significant improvements including 40% enhancement in data processing efficiency and 70% reduction in resource consumption.`;
//         }
//     }
    
//     // Skills
//     if (message.includes('skill') || message.includes('technology') || message.includes('tech') || message.includes('programming')) {
//         let response = "Sadir's technical expertise includes:\n\n";
//         Object.entries(resumeData.skills).forEach(([category, skills]) => {
//             response += `🔸 ${category}: ${skills.join(', ')}\n\n`;
//         });
//         return response;
//     }
    
//     if (message.includes('python') || message.includes('programming language')) {
//         return `Yes! Sadir is proficient in ${resumeData.skills['Programming Languages'].join(' and ')}. Python is his primary language for machine learning and AI development.`;
//     }
    
//     if (message.includes('ai') || message.includes('artificial intelligence') || message.includes('machine learning') || message.includes('ml')) {
//         return `Sadir specializes in AI and Machine Learning with expertise in:\n• ${resumeData.skills.Domains.join('\n• ')}\n\nHe has successfully reduced resource usage by 70% and improved processing efficiency by 40% through innovative AI solutions.`;
//     }
    
//     if (message.includes('nlp') || message.includes('natural language')) {
//         return `Sadir has extensive experience in NLP (Natural Language Processing) and Large Language Models (LLMs). He has developed and optimized NLP models that enhanced data processing efficiency by 40% for language-based tasks. He's also worked with LangChain and various LLM technologies via Groq.`;
//     }
    
//     if (message.includes('docker') || message.includes('api') || message.includes('deployment')) {
//         return `Sadir is experienced in deployment and scaling with Docker and API development. He has deployed RESTful APIs using FastAPI and Docker, improving traffic handling capacity by 50% with robust error handling and validation.`;
//     }
    
//     // Projects
//     if (message.includes('project') || message.includes('github') || message.includes('portfolio')) {
//         let response = "Here are Sadir's notable projects:\n\n";
//         resumeData.projects.forEach((project, index) => {
//             response += `${index + 1}. **${project.name}**\n${project.description}\nTech: ${project.technologies.join(', ')}\nGitHub: ${project.github}\n\n`;
//         });
//         return response;
//     }
    
//     // Specific projects
//     if (message.includes('mask') || message.includes('face')) {
//         const project = resumeData.projects.find(p => p.name.includes('Face Mask'));
//         return `${project.name}: ${project.description}\nTechnologies: ${project.technologies.join(', ')}\nGitHub: ${project.github}`;
//     }
    
//     if (message.includes('drowsiness') || message.includes('driver')) {
//         const project = resumeData.projects.find(p => p.name.includes('Drowsiness'));
//         return `${project.name}: ${project.description}\nTechnologies: ${project.technologies.join(', ')}\nGitHub: ${project.github}`;
//     }
    
//     if (message.includes('mental health') || message.includes('health prediction')) {
//         const project = resumeData.projects.find(p => p.name.includes('Mental Health'));
//         return `${project.name}: ${project.description}\nTechnologies: ${project.technologies.join(', ')}\nGitHub: ${project.github}`;
//     }
    
//     // Education
//     if (message.includes('education') || message.includes('degree') || message.includes('university') || message.includes('study')) {
//         return `Sadir completed his ${resumeData.education.degree} from ${resumeData.education.university} with a CGPA of ${resumeData.education.cgpa} (${resumeData.education.duration}).`;
//     }
    
//     // Achievements
//     if (message.includes('achievement') || message.includes('accomplishment') || message.includes('success')) {
//         return `Sadir has achieved significant results in his career:\n• 70% reduction in resource usage\n• 40% improvement in processing efficiency\n• 50% improvement in traffic handling capacity\n• 30% reduction in latency\n• 25% enhancement in AI model performance\n• 20% improvement in team productivity`;
//     }
    
//     // General greetings and help
//     if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
//         return `Hello! I'm here to help you learn about Sadir Ahmed Zidan's background and expertise. You can ask me about his experience, skills, projects, education, or contact information. What would you like to know?`;
//     }
    
//     if (message.includes('help') || message.includes('what can you')) {
//         return `I can help you learn about Sadir's:\n• Work experience and current role\n• Technical skills and expertise\n• AI/ML projects and achievements\n• Education background\n• Contact information\n• Specific technologies he works with\n\nJust ask me anything about his background!`;
//     }
    
//     // Default response
//     return `I'd be happy to help you learn more about Sadir Ahmed Zidan! You can ask me about his:\n• Experience in ML and AI\n• Technical skills and projects\n• Education and achievements\n• Contact information\n\nTry asking something like "What is Sadir's experience?" or "What projects has he worked on?"`;
// }

// function sendMessage() {
//     const userInput = document.getElementById('userInput');
//     const message = userInput.value.trim();
    
//     if (!message || isTyping) return;
    
//     // Add user message
//     addMessage(message, true);
//     userInput.value = '';
    
//     // Show typing indicator
//     isTyping = true;
//     addTypingIndicator();
    
//     // Generate and show response after delay
//     setTimeout(() => {
//         removeTypingIndicator();
//         const response = generateResponse(message);
//         addMessage(response);
//         isTyping = false;
//     }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
// }

// function handleKeyPress(event) {
//     if (event.key === 'Enter') {
//         sendMessage();
//     }
// }


// Resume data for the chatbot
const resumeData = {
    personal: {
        name: "Sadir Ahmed Zidan",
        location: "Dhaka, Bangladesh",
        email: "sazidan559@gmail.com",
        phone: "01640423606",
        linkedin: "Sadir Ahmed Zidan",
        title: "Machine Learning Engineer",
        experience: "2+ years"
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
                "Contributed to AI-driven projects, including Search Engines, Recommendation Systems, Object Detection, Segmentation, Data Extraction and Retrieval-Augmented Generation (RAG)"
            ]
        },
        {
            title: "AI Developer - Remote",
            company: "GradMate AI",
            duration: "Apr 2025 – Present",
            achievements: [
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
            name: "Face Mask Detection",
            description: "A system to detect facial masks using a cascade classifier. Used a large dataset that varies with different types of poses with masks worn by humans. The model got good accuracy after implementation.",
            github: "github.com/zidan010/MaskDetection",
            technologies: ["Python", "OpenCV", "Machine Learning"]
        },
        {
            name: "Drowsiness Detection",
            description: "A real-time system using machine learning algorithms and image processing to detect driver drowsiness. It can continuously monitor the driver while they are driving and provide immediate feedback or alerts.",
            github: "github.com/zidan010/DrowsinessDetection",
            technologies: ["Python", "Computer Vision", "Real-time Processing"]
        },
        {
            name: "Data Analysis & Prediction",
            description: "Analyzed a sleep health lifestyle dataset and applied algorithms to predict health levels as part of a data science project.",
            github: "github.com/zidan010/DataAnalysis",
            technologies: ["Python", "Data Analysis", "Pandas"]
        },
        {
            name: "Predicting Mental Health Condition",
            description: "Comparisons between different ML algorithms for predicting mental health condition, using online data.",
            github: "github.com/zidan010/MachineLearning",
            technologies: ["Python", "Machine Learning", "Data Science"]
        }
    ]
};

// Chatbot functionality
let isTyping = false;

function addMessage(message, isUser = false) {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) {
        console.error('Chat messages container not found!');
        return;
    }
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = 'Typing<span class="dots"><span>.</span><span>.</span><span>.</span></span>';
    
    typingDiv.appendChild(contentDiv);
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add CSS for typing animation
    if (!document.getElementById('typing-styles')) {
        const style = document.createElement('style');
        style.id = 'typing-styles';
        style.textContent = `
            .dots span {
                animation: typing 1.4s infinite;
                animation-fill-mode: both;
            }
            .dots span:nth-child(2) { animation-delay: 0.2s; }
            .dots span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes typing {
                0%, 60%, 100% { opacity: 0; }
                30% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function generateResponse(userMessage) {
    if (!userMessage) return "Please enter a message.";

    // Prepare resume data as context
    const resumeContext = JSON.stringify(resumeData, null, 2);

    // System prompt for Groq API
    const systemPrompt = `
You are an AI assistant representing Sadir Ahmed Zidan, a Machine Learning Engineer. Your role is to provide accurate and professional responses about Sadir's experience, skills, projects, education, and contact information based on the provided resume data. Respond in a friendly, professional tone, and ensure answers are concise and relevant to the user's query. If the query is unrelated to the resume, provide a general helpful response and gently steer the conversation back to Sadir's background if appropriate. Here is the resume data:

${resumeContext}

Now, respond to the user's query: "${userMessage}"
    `;

}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    if (!userInput) {
        console.error('User input element not found!');
        return;
    }
    const message = userInput.value.trim();
    
    if (!message || isTyping) return;
    
    // Add user message
    addMessage(message, true);
    userInput.value = '';
    
    // Show typing indicator
    isTyping = true;
    addTypingIndicator();
    
    // Generate and show response
    const response = await generateResponse(message);
    removeTypingIndicator();
    addMessage(response);
    isTyping = false;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Initialize chatbot with welcome message
document.addEventListener('DOMContentLoaded', () => {
    addMessage("Hi! I'm an AI assistant that knows about Sadir's background and experience. Ask me anything about his skills, projects, or career!");
});