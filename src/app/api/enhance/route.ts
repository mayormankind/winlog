import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { achievement } = await request.json();

    if (!achievement?.trim()) {
      return NextResponse.json(
        { error: "Achievement text is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service not configured. Add OPENAI_API_KEY to your environment variables." },
        { status: 503 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a professional career coach helping people write impactful achievement statements for resumes and performance reviews. Transform basic achievement descriptions into compelling, quantified narratives.

Rules:
- Add specific metrics and numbers where plausible (use ranges if uncertain)
- Describe clear business impact (cost savings, time saved, users affected, revenue impact)
- Use strong action verbs
- Keep it to 2-3 sentences max
- Use professional language
- Return ONLY the enhanced achievement text, no preamble or explanation`,
          },
          {
            role: "user",
            content: `Enhance this career achievement: "${achievement}"`,
          },
        ],
        max_tokens: 250,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("xAI API error:", errText);
      return NextResponse.json(
        { error: "AI service returned an error. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const enhanced = data.choices?.[0]?.message?.content?.trim();

    if (!enhanced) {
      return NextResponse.json(
        { error: "No enhancement generated. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ enhanced });
  } catch (error) {
    console.error("Enhancement error:", error);
    return NextResponse.json(
      { error: "Failed to enhance achievement." },
      { status: 500 }
    );
  }
}
