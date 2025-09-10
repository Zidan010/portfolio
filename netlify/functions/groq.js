// netlify/functions/groq.js
export async function handler(event) {
  try {
    const { message, systemPrompt } = JSON.parse(event.body);

    // Groq REST API endpoint
    const response = await fetch("https://api.groq.com/v1/llama3/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",   // or any Groq LLaMA-3 model
        prompt: `${systemPrompt}\nUser: ${message}\nAssistant:`,
        max_output_tokens: 500,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Groq response text is in data.completion_text
    return {
      statusCode: 200,
      body: JSON.stringify({ choices: [{ message: { content: data.completion_text } }] })
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
