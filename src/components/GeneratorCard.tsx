"use client";

import { useState } from "react";
import { Category, Tone, GenerateResult } from "@/lib/generatePrompt";
import { mockGenerate } from "@/lib/mockGenerate";

const categories: Category[] = [
  "Balasan Chat",
  "Izin Kerja",
  "Komplain Sopan",
  "Caption Jualan",
  "Rapihin Kalimat",
  "Translate Indonesia-Jepang",
];

const tones: Tone[] = [
  "Santai",
  "Sopan",
  "Formal",
  "Singkat",
  "Hangat",
  "Tegas tapi sopan",
];

export default function GeneratorCard() {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState<Category>("Balasan Chat");
  const [tone, setTone] = useState<Tone>("Santai");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GenerateResult[] | null>(null);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError("Ceritain dulu situasinya, nanti Bale bantuin.");
      return;
    }
    setError("");
    setLoading(true);
    setResults(null);

    // Simulate network delay
    try {
      await new Promise((r) => setTimeout(r, 1500));
      const res = mockGenerate({ input, category, tone });
      setResults(res.results);
    } catch {
      setError("Maaf, Bale lagi bingung sebentar. Coba lagi ya.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <section
      id="generator"
      className="scroll-mt-24 bg-gradient-to-b from-[#FFF8ED] to-white py-20"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-[#1F2F6B]/5 ring-1 ring-[#1F2F6B]/10 sm:p-10">
          <h2 className="text-center text-2xl font-bold text-[#1F2F6B] sm:text-3xl">
            Ceritain situasinya,{" "}
            <span className="text-[#5DADEC]">Bale bantu susun pesannya.</span>
          </h2>

          {/* Textarea */}
          <div className="mt-8">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Contoh: Aku mau izin kerja hari ini karena sakit, tapi jangan terlalu formal..."
              rows={4}
              className="w-full resize-none rounded-2xl border-2 border-[#1F2F6B]/10 bg-[#FFF8ED]/50 p-4 text-[#1F2937] placeholder-[#64748B] transition-colors focus:border-[#5DADEC] focus:outline-none focus:ring-2 focus:ring-[#5DADEC]/20 text-base"
            />
            <p className="mt-2 text-sm text-[#64748B]">
              Ceritain aja seadanya. Bale yang rapihin nanti.
            </p>
          </div>

          {/* Dropdowns */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#1F2937]">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full rounded-xl border-2 border-[#1F2F6B]/10 bg-white p-3 text-[#1F2937] focus:border-[#5DADEC] focus:outline-none focus:ring-2 focus:ring-[#5DADEC]/20 text-base"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#1F2937]">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="w-full rounded-xl border-2 border-[#1F2F6B]/10 bg-white p-3 text-[#1F2937] focus:border-[#5DADEC] focus:outline-none focus:ring-2 focus:ring-[#5DADEC]/20 text-base"
              >
                {tones.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-[#1F2F6B] text-base font-semibold text-white shadow-lg shadow-[#1F2F6B]/20 transition-all hover:bg-[#1F2F6B]/90 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                Bale lagi nyusun kata
                <span className="inline-flex">
                  <span className="animate-[dot_1.4s_ease-in-out_infinite]">.</span>
                  <span className="animate-[dot_1.4s_ease-in-out_infinite_0.2s]">.</span>
                  <span className="animate-[dot_1.4s_ease-in-out_infinite_0.4s]">.</span>
                </span>
              </span>
            ) : (
              "Balesin Sekarang"
            )}
          </button>

          {/* Error */}
          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}

          {/* Success message */}
          {results && !loading && (
            <p className="mt-6 text-center text-base font-medium text-[#1F2F6B]">
              Nih, Bale buatin beberapa versi. Tinggal copy yang paling cocok!
            </p>
          )}

          {/* Results */}
          {results && (
            <div className="mt-6 grid gap-4">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="rounded-2xl border-2 border-[#1F2F6B]/10 bg-[#FFF8ED]/50 p-5 transition-all hover:border-[#5DADEC]/30"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-[#1F2F6B] px-3 py-1 text-xs font-semibold text-white">
                      {r.title}
                    </span>
                    <button
                      onClick={() => handleCopy(r.text, i)}
                      className="rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-[#1F2F6B] shadow-sm ring-1 ring-[#1F2F6B]/10 transition-all hover:bg-[#1F2F6B] hover:text-white"
                    >
                      {copiedIndex === i ? "Udah dicopy!" : "Copy"}
                    </button>
                  </div>
                  <p className="text-base leading-relaxed text-[#1F2937]">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes dot {
          0%,
          80%,
          100% {
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
