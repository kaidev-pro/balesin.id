"use client";

import { useState, useEffect } from "react";
import { Category, Tone, GenerateResult } from "@/lib/generatePrompt";
import { mockGenerate } from "@/lib/mockGenerate";
import { aiGenerate } from "@/lib/aiGenerate";

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

  // API key management
  const [apiKey, setApiKey] = useState("");
  const [useRealAI, setUseRealAI] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // Load saved API key from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("balesin_api_key");
    if (saved) {
      setApiKey(saved);
      setUseRealAI(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("balesin_api_key", apiKey.trim());
      setUseRealAI(true);
      setShowApiKeyInput(false);
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("balesin_api_key");
    setApiKey("");
    setUseRealAI(false);
    setShowApiKeyInput(false);
  };

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError("Ceritain dulu situasinya, nanti Bale bantuin.");
      return;
    }
    setError("");
    setLoading(true);
    setResults(null);

    try {
      if (useRealAI && apiKey) {
        // Use real AI
        const res = await aiGenerate(input, category, tone, apiKey);
        setResults(res.results);
      } else {
        // Use mock
        await new Promise((r) => setTimeout(r, 1200));
        const res = mockGenerate({ input, category, tone });
        setResults(res.results);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setError(msg);
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

          {/* AI Status */}
          <div className="mt-4 flex justify-center">
            {useRealAI ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                AI Aktif (Groq)
                <button
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                  className="ml-1 text-green-500 hover:text-green-700"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </span>
            ) : (
              <button
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8ED] px-3 py-1 text-xs font-medium text-[#64748B] ring-1 ring-[#1F2F6B]/10 transition-colors hover:bg-[#5DADEC]/10 hover:text-[#5DADEC]"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Aktifkan AI asli
              </button>
            )}
          </div>

          {/* API Key Input */}
          {showApiKeyInput && (
            <div className="mt-4 rounded-2xl border border-[#1F2F6B]/10 bg-[#FFF8ED]/50 p-4">
              <p className="mb-2 text-xs text-[#64748B]">
                Masukkan{" "}
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#5DADEC] underline"
                >
                  Groq API Key
                </a>{" "}
                (gratis, cepat).
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="gsk_..."
                  className="flex-1 rounded-xl border-2 border-[#1F2F6B]/10 bg-white px-3 py-2 text-sm text-[#1F2937] focus:border-[#5DADEC] focus:outline-none focus:ring-2 focus:ring-[#5DADEC]/20"
                />
                {useRealAI ? (
                  <button
                    onClick={handleClearApiKey}
                    className="rounded-xl bg-red-50 px-4 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                  >
                    Matikan
                  </button>
                ) : (
                  <button
                    onClick={handleSaveApiKey}
                    className="rounded-xl bg-[#1F2F6B] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1F2F6B]/90"
                  >
                    Simpan
                  </button>
                )}
              </div>
            </div>
          )}

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
                {useRealAI ? "Bale lagi mikir pake AI" : "Bale lagi nyusun kata"}
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
              {useRealAI
                ? "Nih, AI udah buatin beberapa versi. Tinggal copy yang paling cocok!"
                : "Nih, Bale buatin beberapa versi. Tinggal copy yang paling cocok!"}
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
