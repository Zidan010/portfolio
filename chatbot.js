// const resumeData = {
//     personal: {
//         name: "Sadir Ahmed Zidan",
//         location: "Dhaka, Bangladesh",
//         email: "sazidan559@gmail.com",
//         phone: "01640423606",
//         linkedin: "Sadir Ahmed Zidan",
//         title: "Machine Learning Engineer",
//         experience: "2+ years",
//         marital_relationship_Status: "Single",
//         future_career_Goals: [
//             "Lead AI-driven projects in NLP and computer vision to solve real-world problems in tech giant companies.",
//             "Contribute to open-source AI frameworks and tools",
//             "Pursue advanced certifications in deep learning and cloud-based AI deployment",
//             "Build Own AI products."
//         ],
//         availability: "Available for remote/online/work from home positions only. Available / Can be hired only for Machine Learning/AI related positions",
//         lookingFor: [
//             "Opportunities to work on innovative AI projects- building and deployment, particularly in NLP, LLMs, and computer vision",
//             "Collaborative environments with a focus on cutting-edge technology and continuous learning",
//             "Roles that offer growth into senior technical or leadership positions"
//         ]
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
//                 "Contributed to AI-driven projects, including Search Engines, Recommendation Systems, Object Detection, Segmentation, Data Extraction and Retrieval-Augmented Generation (RAG)",
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
//             name: "Multilingual RAG System",
//             description: "A multilingual RAG system for English and Bengali that retrieves information from PDFs and generates answers using LangChain, FAISS, and an LLM. It features a FastAPI-based REST API, memory modules, and an evaluation framework for quality assessment.",
//             github: "https://github.com/zidan010/multilingual-rag-bangla",
//             technologies: ["Python", "OpenCV", "Machine Learning", "OCR", "FastAPI", "Groq", "Faiss", "Langchain", "RAG"]
//         },
//         {
//             name: "Face Mask Detection",
//             description: "A system to detect facial masks using a cascade classifier. Used a large dataset that varies with different types of poses with masks worn by humans. The model got good accuracy after implementation.",
//             github: "https://github.com/zidan010/MaskDetection",
//             technologies: ["Python", "OpenCV", "Machine Learning"]
//         },
//         {
//             name: "Drowsiness Detection",
//             description: "A real-time system using machine learning algorithms and image processing to detect driver drowsiness. It can continuously monitor the driver while they are driving and provide immediate feedback or alerts.",
//             github: "https://github.com/zidan010/DrowsinessDetection",
//             technologies: ["Python", "Computer Vision", "Real-time Processing"]
//         },
//         {
//             name: "Data Analysis & Prediction",
//             description: "Analyzed a sleep health lifestyle dataset and applied algorithms to predict health levels as part of a data science project.",
//             github: "https://github.com/zidan010/DataAnalysis",
//             technologies: ["Python", "Data Analysis", "Pandas"]
//         },
//         {
//             name: "Predicting Mental Health Condition",
//             description: "Comparisons between different ML algorithms for predicting mental health condition, using online data.",
//             github: "https://github.com/zidan010/MachineLearning",
//             technologies: ["Python", "Machine Learning", "Data Science"]
//         }
//     ]
// };
// // Chatbot functionality
// let isTyping = false;

// function addMessage(message, isUser = false) {
//     const messagesContainer = document.getElementById('chatMessages');
//     if (!messagesContainer) {
//         console.error('Chat messages container not found!');
//         return;
//     }
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
//     const contentDiv = document.createElement('div');
//     contentDiv.className = 'message-content';
    
//     if (!isUser && typeof message === 'object' && message.content) {
//         contentDiv.innerHTML = formatBotResponse(message);
//     } else {
//         contentDiv.textContent = message;
//     }
    
//     messageDiv.appendChild(contentDiv);
//     messagesContainer.appendChild(messageDiv);
//     messagesContainer.scrollTop = messagesContainer.scrollHeight;
// }

// function formatBotResponse(response) {
//     let formatted = '<div class="bot-response">';
//     formatted += `<p><strong>${response.title || 'Response'}</strong></p>`;
//     formatted += `<p>${response.content}</p>`;
//     if (response.details && Array.isArray(response.details)) {
//         formatted += '<ul>';
//         response.details.forEach(detail => {
//             formatted += `<li>${detail}</li>`;
//         });
//         formatted += '</ul>';
//     }
//     if (response.links && Array.isArray(response.links)) {
//         formatted += '<div class="links">';
//         response.links.forEach(link => {
//             formatted += `<a href="${link.url}" target="_blank">${link.text}</a><br>`;
//         });
//         formatted += '</div>';
//     }
//     formatted += '</div>';
//     return formatted;
// }

// function addTypingIndicator() {
//     const messagesContainer = document.getElementById('chatMessages');
//     if (!messagesContainer) return;
//     const typingDiv = document.createElement('div');
//     typingDiv.className = 'message bot-message typing-indicator';
//     typingDiv.id = 'typing-indicator';
    
//     const contentDiv = document.createElement('div');
//     contentDiv.className = 'message-content';
//     contentDiv.innerHTML = 'Typing<span class="dots"><span>.</span><span>.</span><span>.</span></span>';
    
//     typingDiv.appendChild(contentDiv);
//     messagesContainer.appendChild(typingDiv);
//     messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
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
//             .bot-response ul {
//                 margin: 10px 0;
//                 padding-left: 20px;
//             }
//             .bot-response .links {
//                 margin-top: 10px;
//             }
//             .bot-response a {
//                 color: rgb(255, 255, 255);
//                 text-decoration: none;
//             }
//             .bot-response a:hover {
//                 text-decoration: underline;
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

// async function generateResponse(userMessage) {
//     if (!userMessage) return { content: "Please enter a message." };

//     // Prepare resume data as context
//     const resumeContext = JSON.stringify(resumeData, null, 2);

//     try {
//         const response = await fetch('/.netlify/functions/groq-api', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 userMessage: userMessage,
//                 resumeContext: resumeContext
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error calling Netlify Function:', {
//             message: error.message,
//             name: error.name,
//             stack: error.stack
//         });
//         return {
//             title: "Error",
//             content: "Sorry, I encountered an issue while processing your request. Please try again or ask about Sadir's experience, skills, or projects!",
//             details: [error.message], // Include specific error message
//             links: []
//         };
//     }
// }

// async function sendMessage() {
//     const userInput = document.getElementById('userInput');
//     if (!userInput) {
//         console.error('User input element not found!');
//         return;
//     }
//     const message = userInput.value.trim();
    
//     if (!message || isTyping) return;
    
//     addMessage(message, true);
//     userInput.value = '';
    
//     isTyping = true;
//     addTypingIndicator();
    
//     const response = await generateResponse(message);
//     removeTypingIndicator();
//     addMessage(response);
//     isTyping = false;
// }

// function handleKeyPress(event) {
//     if (event.key === 'Enter') {
//         sendMessage();
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     addMessage({
//         title: "Welcome",
//         content: "Hi! I'm Zidan's personal AI Assistant. Ask me anything about his skills, projects, or career!",
//         details: [],
//         links: []
//     });
// });


async function generateResponse(userMessage) {
    if (!userMessage) return { content: "Please enter a message." };

    const resumeContext = JSON.stringify(resumeData, null, 2);

    const systemPrompt = `
You are an AI assistant representing Sadir Ahmed Zidan, a Machine Learning Engineer. Your role is to provide accurate and professional responses about Sadir's experience, skills, projects, education, and contact information based on the provided resume data. Respond in a friendly, professional tone, and ensure answers are concise and relevant to the user's query. If the query is unrelated to the resume, provide a general helpful response and gently steer the conversation back to Sadir's background if appropriate. 

**Response Format**: Always return your response in JSON format with the following structure:
{
  "title": "Response title or category (e.g., Skills, Experience, Projects)",
  "content": "Main response text",
  "details": ["Optional list of bullet points for additional details"],
  "links": [{"text": "Link text", "url": "Link URL"}] // Optional
}

Here is the resume data:

${resumeContext}

Now, respond to the user's query: "${userMessage}"
    `;

    try {
        const response = await fetch("/.netlify/functions/groq", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage, systemPrompt }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const rawContent = data.choices[0].message.content.trim();

        try {
            return JSON.parse(rawContent);
        } catch (parseError) {
            console.error("Error parsing LLM response as JSON:", parseError);
            return {
                title: "Error",
                content: "Sorry, I couldn't process the response properly.",
                details: [],
                links: [],
            };
        }
    } catch (error) {
        console.error("Error calling Groq API:", error);
        return {
            title: "Error",
            content: "Sorry, something went wrong. Please try again later.",
            details: [],
            links: [],
        };
    }
}
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");

function appendMessage(sender, content) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    msg.textContent = content;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send button click
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // User message
    appendMessage("user", message);
    userInput.value = "";

    // Bot thinking placeholder
    const thinkingMsg = document.createElement("div");
    thinkingMsg.classList.add("message", "bot-message");
    thinkingMsg.textContent = "Thinking...";
    chatMessages.appendChild(thinkingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Get AI response
    const response = await generateResponse(message);

    // Replace placeholder with AI response
    thinkingMsg.textContent = response.content || "Sorry, I couldn’t generate a response.";
}

// Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
}
