import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, context } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is niet ingesteld. Zet het in .env.local" },
      { status: 500 }
    );
  }

  const systemPrompt = `You are an expert web developer. Generate a COMPLETE, fully functional single-page web app based on the user's prompt.

RULES:
- Return ONLY valid JSON with this exact structure: {"html":"...","css":"...","js":"...","title":"..."}
- The HTML must be a complete fragment (no <html>, <head>, <body> tags)
- All CSS must be in the "css" field
- All JavaScript must be in the "js" field
- The app must be FULLY FUNCTIONAL: working buttons, forms, state management, localStorage persistence where appropriate
- Use modern CSS (flexbox, grid, custom properties)
- Dark theme by default with the accent color specified
- Mobile responsive
- No external dependencies (no CDNs, no frameworks)
- Make it look professional and polished
- Include realistic sample data where appropriate
- The title should be a short app name

CONTEXT:
${context || "No additional context"}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 8000,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      return NextResponse.json(
        { error: `OpenAI API error: ${response.status}`, details: errBody },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = content.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const result = JSON.parse(jsonStr);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to generate app" },
      { status: 500 }
    );
  }
}
