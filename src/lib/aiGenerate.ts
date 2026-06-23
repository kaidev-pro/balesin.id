import { Category, Tone, GenerateResponse } from "./generatePrompt";

// Groq API — client-side BYOK
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `Kamu adalah Bale, asisten AI dari Balesin.id.
Tugasmu membantu user membuat pesan yang natural, sopan, dan siap dikirim.
Gunakan bahasa Indonesia yang enak dibaca.
Jangan terlalu kaku.
Jangan terlalu panjang kecuali dibutuhkan.
Jangan pakai emoji.

OUTPUT: JSON valid dengan format:
{
  "results": [
    { "title": "Versi Singkat", "text": "..." },
    { "title": "Versi Sopan", "text": "..." },
    { "title": "Versi Hangat", "text": "..." }
  ]
}

Berikan 3 versi dengan gaya berbeda sesuai konteks.`;

function buildUserPrompt(input: string, category: string, tone: string): string {
  const categoryContext: Record<string, string> = {
    "Balasan Chat": "User ingin membuat balasan untuk chat yang masuk.",
    "Izin Kerja": "User ingin membuat pesan izin tidak masuk kerja/sekolah.",
    "Komplain Sopan": "User ingin menyampaikan keluhan dengan sopan.",
    "Caption Jualan": "User ingin membuat caption/promosi untuk jualan.",
    "Rapihin Kalimat": "User ingin merapihkan kalimat yang awut-awutan.",
    "Translate Indonesia-Jepang": "User ingin menerjemahkan pesan dari Indonesia ke Jepang.",
  };

  const toneContext: Record<string, string> = {
    "Santai": "Gaya bahasa: santai, kasual, seperti ngobrol sama temen.",
    "Sopan": "Gaya bahasa: sopan, hormat, cocok untuk situasi formal/non-formal.",
    "Formal": "Gaya bahasa: formal, baku, cocok untuk komunikasi bisnis.",
    "Singkat": "Gaya bahasa: singkat dan to the point, tanpa basa-basi.",
    "Hangat": "Gaya bahasa: hangat, ramah, menunjukkan kepedulian.",
    "Tegas tapi sopan": "Gaya bahasa: tegas menyampaikan maksud tapi tetap sopan.",
  };

  return `Kategori: ${category} — ${categoryContext[category] || ""}
Tone: ${tone} — ${toneContext[tone] || ""}

Situasi/pesan dari user:
"${input}"

Buat 3 versi pesan berdasarkan situasi di atas. Setiap versi harus benar-benar sesuai dengan konteks input user.`;
}

export async function aiGenerate(
  input: string,
  category: Category,
  tone: Tone,
  apiKey: string
): Promise<GenerateResponse> {
  if (!apiKey?.trim()) {
    throw new Error("Hubungkan Groq API Key dulu untuk memakai Bale Pintar.");
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(input, category, tone) },
      ],
      temperature: 0.7,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    throw new Error("Gagal menghubungi Groq API.");
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Tidak ada respons dari Groq.");
  }

  try {
    const parsed = JSON.parse(content);
    if (!parsed.results || !Array.isArray(parsed.results)) {
      throw new Error("Format respons tidak valid.");
    }
    return parsed as GenerateResponse;
  } catch {
    throw new Error("Gagal memproses respons dari Groq.");
  }
}

// Mask API key for display: gsk_****abcd
export function maskApiKey(key: string): string {
  if (!key || key.length < 8) return "****";
  return `${key.slice(0, 4)}****${key.slice(-4)}`;
}
