import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are an AI Health Helpdesk assistant for a hospital/clinic.

Your job is to help patients and staff with:
- Appointment booking guidance
- Symptom information (general, not diagnosis)
- Department and doctor information
- Hospital facilities, timings, and location
- Medicine and prescription queries (general only)
- Insurance and billing questions

STRICT RULES:
1. NEVER diagnose a disease — always say "please consult a doctor"
2. If user mentions chest pain, difficulty breathing, unconsciousness, or heavy bleeding, immediately say:
   "🚨 This sounds like a medical emergency. Please call 112 immediately or go to the nearest Emergency Room."
3. Always be calm, clear, and compassionate
4. Answer in the same language the user writes in (Hindi or English)
5. Keep answers short and easy to understand for patients`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    // Emergency keyword check — fast path before calling AI
    const emergencyKeywords = [
      "chest pain", "can't breathe", "unconscious", "heavy bleeding",
      "heart attack", "stroke",
      "seene mein dard", "saans nahi aa rahi", "behosh", "zyada khoon",
    ];

    const isEmergency = emergencyKeywords.some((kw) =>
      message.toLowerCase().includes(kw)
    );

    if (isEmergency) {
      return NextResponse.json({
        reply:
          "🚨 Yeh ek medical emergency lag rahi hai. Turant **112** call karein ya nearest Emergency Room jaayein. Akele mat rahein.",
      });
    }

    // Normal Groq AI response
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // free + fast model
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 512,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, kuch problem hui. Please dobara try karein.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json(
      { reply: "Server error aaya. Thodi der baad try karein." },
      { status: 500 }
    );
  }
}


// Smart title generator
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userMessage = searchParams.get("msg") ?? "";

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `Generate a very short 3-5 word title for this chat based on the user's question. 
        Examples: "Fever Treatment Query", "Appointment Booking Help", "OPD Timings Request"
        Return ONLY the title, nothing else.`,
      },
      { role: "user", content: userMessage },
    ],
    max_tokens: 20,
    temperature: 0.3,
  });

  const title = completion.choices[0]?.message?.content?.trim() ?? "Health Query";
  return NextResponse.json({ title });
}
