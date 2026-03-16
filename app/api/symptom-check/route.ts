import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { symptoms, duration, age } = await req.json();

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a medical AI assistant. Based on symptoms, return ONLY a valid JSON object with these exact fields:
{
  "condition": "Most likely condition name (1-2 sentences)",
  "specialist": "Which doctor to see (e.g. General Physician, Cardiologist)",
  "urgency": "low" or "medium" or "high",
  "advice": "2-3 sentences of general home care advice"
}
RULES:
- urgency "high" only for chest pain, breathing issues, severe symptoms
- Never give a definitive diagnosis, say "possibly" or "likely"
- Always recommend consulting a real doctor
- Return ONLY the JSON, no extra text`
      },
      {
        role: "user",
        content: `Patient age: ${age || "unknown"}, Symptoms: ${symptoms.join(", ")}, Duration: ${duration || "unknown"}`
      }
    ],
    max_tokens: 300,
    temperature: 0.3,
  });

  try {
    const text = completion.choices[0]?.message?.content ?? "{}";
    const clean = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(clean);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({
      condition: "Unable to analyze. Please consult a doctor.",
      specialist: "General Physician",
      urgency: "medium",
      advice: "Please visit a doctor for proper evaluation of your symptoms.",
    });
  }
}