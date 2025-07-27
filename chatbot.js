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

    try {
        // Make API call to Groq
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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' // Replace with your actual API key
            },
            body: JSON.stringify({
                model: 'llama3-70b-8192',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userMessage }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error calling Groq API:', error);
        return "Sorry, I encountered an issue while processing your request. Please try again or ask about Sadir's experience, skills, or projects!";
    }
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