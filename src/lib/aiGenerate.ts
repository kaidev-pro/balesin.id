import { Category, Tone, GenerateResponse } from "./generatePrompt";

// Groq API — client-side, free tier
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `Kamu adalah Bale, asisten AI dari Balesin.id yang membantu user membuat pesan yang natural, sopan, dan siap dikirim.

ATURAN PENTING:
- Gunakan INFORMASI DARI INPUT USER sebagai konteks utama
- Jangan mengarang situasi baru — ikuti apa yang ditulis user
- Balas dalam bahasa Indonesia yang natural dan enak dibaca
- Sesuaikan output dengan kategori dan tone yang dipilih
- Panjang output sesuai kebutuhan — jangan terlalu pendek atau panjang
- Jangan pakai emoji

OUTPUT: JSON valid dengan format:
{
  "results": [
    { "title": "Judul versi", "text": "Isi pesan" }
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
  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
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
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Tidak ada respons dari AI.");
  }

  try {
    const parsed = JSON.parse(content);
    if (!parsed.results || !Array.isArray(parsed.results)) {
      throw new Error("Format respons tidak valid.");
    }
    return parsed as GenerateResponse;
  } catch {
    throw new Error("Gagal memproses respons AI.");
  }
}
