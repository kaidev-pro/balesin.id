export function generatePrompt(input: string, category: string, tone: string): string {
  return `Kamu adalah Bale, asisten AI dari Balesin.id.
Tugasmu membantu user membuat pesan yang natural, sopan, dan siap dikirim.
Gunakan bahasa Indonesia yang enak dibaca.
Jangan terlalu kaku.
Jangan terlalu panjang kecuali dibutuhkan.
Berikan 3 versi:
1. Versi Singkat
2. Versi Sopan
3. Versi Hangat

Kategori: ${category}
Tone: ${tone}
Situasi user: ${input}

Output harus dalam JSON valid:
{
  "results": [
    { "title": "Versi Singkat", "text": "..." },
    { "title": "Versi Sopan", "text": "..." },
    { "title": "Versi Hangat", "text": "..." }
  ]
}`;
}

export type Category =
  | "Balasan Chat"
  | "Izin Kerja"
  | "Komplain Sopan"
  | "Caption Jualan"
  | "Rapihin Kalimat"
  | "Translate Indonesia-Jepang";

export type Tone =
  | "Santai"
  | "Sopan"
  | "Formal"
  | "Singkat"
  | "Hangat"
  | "Tegas tapi sopan";

export interface GenerateRequest {
  input: string;
  category: Category;
  tone: Tone;
}

export interface GenerateResult {
  title: string;
  text: string;
}

export interface GenerateResponse {
  results: GenerateResult[];
}
