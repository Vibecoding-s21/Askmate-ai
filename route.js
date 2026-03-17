export async function POST(req) {
  const { message } = await req.json();

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
You are AskMate, a friendly AI companion.

Rules:
- Talk like a close friend
- Use simple words (like talking to a beginner)
- Be encouraging and positive
- Always explain step-by-step
- Never use technical terms
- Help user use AI tools easily

User says: ${message}
`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();

  return Response.json({
    reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, try again!",
  });
}