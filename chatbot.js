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
//     if (!messagesContainer) {
//         console.error('Chat messages container not found!');
//         return;
//     }
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

// async function generateResponse(userMessage) {
//     if (!userMessage) return "Please enter a message.";

//     // Prepare resume data as context
//     const resumeContext = JSON.stringify(resumeData, null, 2);

//     // System prompt for Groq API
//     const systemPrompt = `
// You are an AI assistant representing Sadir Ahmed Zidan, a Machine Learning Engineer. Your role is to provide accurate and professional responses about Sadir's experience, skills, projects, education, and contact information based on the provided resume data. Respond in a friendly, professional tone, and ensure answers are concise and relevant to the user's query. If the query is unrelated to the resume, provide a general helpful response and gently steer the conversation back to Sadir's background if appropriate. Here is the resume data:

// ${resumeContext}

// Now, respond to the user's query: "${userMessage}"
//     `;

//     try {
//         // Make API call to Groq
//         // Make API call to Groq


//         const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' // Replace with your actual API key
//             },
//             body: JSON.stringify({
//                 model: 'llama3-70b-8192',
//                 messages: [
//                     { role: 'system', content: systemPrompt },
//                     { role: 'user', content: userMessage }
//                 ],
//                 max_tokens: 500,
//                 temperature: 0.7
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         return data.choices[0].message.content.trim();
//     } catch (error) {
//         console.error('Error calling Groq API:', error);
//         return "Sorry, I encountered an issue while processing your request. Please try again or ask about Sadir's experience, skills, or projects!";
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
    
//     // Add user message
//     addMessage(message, true);
//     userInput.value = '';
    
//     // Show typing indicator
//     isTyping = true;
//     addTypingIndicator();
    
//     // Generate and show response
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

// // Initialize chatbot with welcome message
// document.addEventListener('DOMContentLoaded', () => {
//     addMessage("Hi! I'm an AI assistant of Sadir Ahmed Zidan. Ask me anything about his skills, projects, or career!");
// });




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
//                 "Contributed to AI-driven projects, including Search Engines, Recommendation Systems, Object Detection, Segmentation, Data Extraction and Retrieval-Augmented Generation (RAG)",

//                 "Collaborated with development teams to design AI-driven educational tools, AI Agents using LangChain and LLMs via Groq",
//                 "Built and maintained scalable backend APIs with Fast API, integrating with front ends, reducing latency by 30%",
//                 "Utilized Jira and GitHub for agile project management, streamlining development cycles and improving team productivity by 20%",
//                 "Optimized AI models through prompt engineering, enhancing performance metrics by 25% for educational applications"
            
//             ]
//         },
//         // {
//         //     title: "AI Developer - Remote",
//         //     company: "GradMate AI",
//         //     duration: "Apr 2025 – Present",
//         //     achievements: [
//         //         "Collaborated with development teams to design AI-driven educational tools, AI Agents using LangChain and LLMs via Groq",
//         //         "Built and maintained scalable backend APIs with Fast API, integrating with front ends, reducing latency by 30%",
//         //         "Utilized Jira and GitHub for agile project management, streamlining development cycles and improving team productivity by 20%",
//         //         "Optimized AI models through prompt engineering, enhancing performance metrics by 25% for educational applications"
//         //     ]
//         // },
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
//             technologies: ["Python", "OpenCV", "Machine Learning","OCR","FastAPI","Groq","Faiss","Langchain","RAG"]
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







const resumeData = {
    personal: {
        name: "Sadir Ahmed Zidan",
        location: "Dhaka, Bangladesh",
        email: "sazidan559@gmail.com",
        phone: "01640423606",
        linkedin: "Sadir Ahmed Zidan",
        title: "Machine Learning Engineer",
        experience: "2+ years",
        marital_relationship_Status: "Single", // Replace with your actual marital status (e.g., "Single", "Married", etc.)
        future_career_Goals: [
            "Lead AI-driven projects in NLP and computer vision to solve real-world problems in tech giant companies.",
            "Contribute to open-source AI frameworks and tools",
            "Pursue advanced certifications in deep learning and cloud-based AI deployment",
            "Build Own AI products."
        ], // Replace with your specific goals
        availability: "Available for remote/online/work from home positions only. Available / Can be hired only for Machine Learning/AI related positions", // Replace with your actual availability
        lookingFor: [
            "Opportunities to work on innovative AI projects- building and deployment, particularly in NLP, LLMs, and computer vision",
            "Collaborative environments with a focus on cutting-edge technology and continuous learning",
            "Roles that offer growth into senior technical or leadership positions"
        ] // Replace with what you’re seeking in a role
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

        // {
        //     title: "AI Developer - Remote",
        //     company: "GradMate AI",
        //     duration: "Apr 2025 – Present",
        //     achievements: [
        //         "Collaborated with development teams to design AI-driven educational tools, AI Agents using LangChain and LLMs via Groq",
        //         "Built and maintained scalable backend APIs with Fast API, integrating with front ends, reducing latency by 30%",
        //         "Utilized Jira and GitHub for agile project management, streamlining development cycles and improving team productivity by 20%",
        //         "Optimized AI models through prompt engineering, enhancing performance metrics by 25% for educational applications"
        //     ]
        // },

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
    
    // If it's a bot message, assume message is an object with structured content
    if (!isUser && typeof message === 'object' && message.content) {
        contentDiv.innerHTML = formatBotResponse(message);
    } else {
        contentDiv.textContent = message;
    }
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Format structured bot response
function formatBotResponse(response) {
    let formatted = '<div class="bot-response">';
    formatted += `<p><strong>${response.title || 'Response'}</strong></p>`;
    formatted += `<p>${response.content}</p>`;
    if (response.details && Array.isArray(response.details)) {
        formatted += '<ul>';
        response.details.forEach(detail => {
            formatted += `<li>${detail}</li>`;
        });
        formatted += '</ul>';
    }
    if (response.links && Array.isArray(response.links)) {
        formatted += '<div class="links">';
        response.links.forEach(link => {
            formatted += `<a href="${link.url}" target="_blank">${link.text}</a><br>`;
        });
        formatted += '</div>';
    }
    formatted += '</div>';
    return formatted;
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
            .bot-response ul {
                margin: 10px 0;
                padding-left: 20px;
            }
            .bot-response .links {
                margin-top: 10px;
            }
            .bot-response a {
                color:rgb(255, 255, 255);
                text-decoration: none;
            }
            .bot-response a:hover {
                text-decoration: underline;
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
    if (!userMessage) return { content: "Please enter a message." };

    // Prepare resume data as context
    const resumeContext = JSON.stringify(resumeData, null, 2);

    // System prompt for Groq API with JSON response requirement
    const systemPrompt = `
You are an AI assistant representing Sadir Ahmed Zidan, a Machine Learning Engineer. Your role is to provide accurate and professional responses about Sadir's experience, skills, projects, education, and contact information based on the provided resume data. Respond in a friendly, professional tone, and ensure answers are concise and relevant to the user's query. If the query is unrelated to the resume, provide a general helpful response and gently steer the conversation back to Sadir's background if appropriate. 

**Response Format**: Always return your response in JSON format with the following structure:
{
  "title": "Response title or category (e.g., Skills, Experience, Projects)",
  "content": "Main response text",
  "details": ["Optional list of bullet points for additional details"],
  "links": [{"text": "Link text", "url": "Link URL"}] // Optional, include relevant links (e.g., GitHub projects)
}

Here is the resume data:

${resumeContext}

Now, respond to the user's query: "${userMessage}"
    `;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' // Replace with your actual API key
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
        const rawContent = data.choices[0].message.content.trim();
        
        // Parse the response as JSON
        try {
            const structuredResponse = JSON.parse(rawContent);
            return structuredResponse;
        } catch (parseError) {
            console.error('Error parsing LLM response as JSON:', parseError);
            return {
                title: "Error",
                content: "Sorry, I couldn't process the response properly. Please try again or ask about Sadir's experience, skills, or projects!",
                details: [],
                links: []
            };
        }
    } catch (error) {
        console.error('Error calling Groq API:', error);
        return {
            title: "Error",
            content: "Sorry, I encountered an issue while processing your request. Please try again or ask about Sadir's experience, skills, or projects!",
            details: [],
            links: []
        };
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
    addMessage({
        title: "Welcome",
        content: "Hi! I'm Zidan's personal AI Assistant. Ask me anything about his skills, projects, or career!",
        details: [],
        links: []
    });

});
