// netlify/functions/groq.js
export async function handler(event) {
  try {
    const { message, systemPrompt } = JSON.parse(event.body);

    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not set in environment variables!");
    }

    console.log("Sending request to Groq API...");

    // Prepare prompt for Groq API
    const prompt = `
You are an AI assistant. Answer questions concisely based on the following resume data:

${systemPrompt}

User question: ${message}
Assistant answer:
`;

    const response = await fetch("https://api.groq.com/v1/llama3/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatiles",
        prompt: prompt,
        max_output_tokens: 500,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", response.status, errorText);
      throw new Error(`Groq API error: ${response.status} - see logs`);
    }

    const data = await response.json();
    console.log("Groq API response:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ choices: [{ message: { content: data.completion_text } }] })
    };

  } catch (err) {
    console.error("Netlify function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
