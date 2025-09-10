// // netlify/functions/groq.js
// export async function handler(event) {
//   try {
//     const { message, systemPrompt } = JSON.parse(event.body);

//     if (!process.env.GROQ_API_KEY) {
//       throw new Error("GROQ_API_KEY is not set in environment variables!");
//     }

//     console.log("Sending request to Groq API...");

//     const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "llama-3.3-70b-versatile",
//         messages: [
//           { role: "system", content: systemPrompt },
//           { role: "user", content: message }
//         ],
//         temperature: 0.5,
//         max_tokens: 500  // Note: Use 'max_tokens' for chat completions (not 'max_output_tokens')
//       }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Groq API error:", response.status, errorText);
//       throw new Error(`Groq API error: ${response.status} - see logs`);
//     }

//     const data = await response.json();
//     console.log("Groq API response:", data);

//     // Extract the assistant's response from the standard chat completions format
//     if (!data.choices || !data.choices[0] || !data.choices[0].message) {
//       throw new Error("Invalid response format from Groq API");
//     }

//     const assistantContent = data.choices[0].message.content;

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ choices: [{ message: { content: assistantContent } }] })
//     };

//   } catch (err) {
//     console.error("Netlify function error:", err);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: err.message })
//     };
//   }
// }


// netlify/functions/groq.js
export async function handler(event) {
    try {
        const { message, systemPrompt } = JSON.parse(event.body);

        if (!process.env.GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY is not set in environment variables!");
        }

        console.log("Sending request to Groq API...");

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-120b",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message }
                ],
                temperature: 0.5,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Groq API error:", response.status, errorText);
            throw new Error(`Groq API error: ${response.status} - see logs`);
        }

        const data = await response.json();
        console.log("Groq API response:", data);

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error("Invalid response format from Groq API");
        }

        const assistantContent = data.choices[0].message.content;

        return {
            statusCode: 200,
            body: JSON.stringify({ choices: [{ message: { content: assistantContent } }] })
        };
    } catch (err) {
        console.error("Netlify function error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
}