"use client";

import { useState, useEffect } from "react";
import { Category, Tone, GenerateResult } from "@/lib/generatePrompt";
import { mockGenerate } from "@/lib/mockGenerate";
import { aiGenerate, maskApiKey } from "@/lib/aiGenerate";
import GroqSetupModal from "@/components/GroqSetupModal";

type Mode = "fast" | "smart";

const STORAGE_KEY = "balesin_groq_api_key";

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

  // BYOK state
  const [mode, setMode] = useState<Mode>("fast");
  const [groqKey, setGroqKey] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [fallbackUsed, setFallbackUsed] = useState(false);

  // Load saved key
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setGroqKey(saved);
      setMode("smart");
    }
  }, []);

  const handleSaveKey = (key: string) => {
    localStorage.setItem(STORAGE_KEY, key);
    setGroqKey(key);
    setMode("smart");
  };

  const handleRemoveKey = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGroqKey("");
    setMode("fast");
  };

  const handleModeSwitch = (newMode: Mode) => {
    if (newMode === "smart" && !groqKey) {
      setShowModal(true);
      return;
    }
    setMode(newMode);
  };

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError("Ceritain dulu situasinya, nanti Bale bantuin.");
      return;
    }
    setError("");
    setLoading(true);
    setResults(null);
    setFallbackUsed(false);

    try {
      if (mode === "smart" && groqKey) {
        try {
          const res = await aiGenerate(input, category, tone, groqKey);
          setResults(res.results);
        } catch {
          // Fallback to fast mode
          setFallbackUsed(true);
          await new Promise((r) => setTimeout(r, 800));
          const res = mockGenerate({ input, category, tone });
          setResults(res.results);
        }
      } else {
        // Fast mode
        await new Promise((r) => setTimeout(r, 1200));
        const res = mockGenerate({ input, category, tone });
        setResults(res.results);
      }
    } catch {
      setError("Terjadi kesalahan. Coba lagi ya.");
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
    <>
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

            {/* Mode Toggle */}
            <div className="mt-6 flex justify-center">
              <div className="inline-flex rounded-2xl bg-[#FFF8ED] p-1.5 ring-1 ring-[#1F2F6B]/10">
                <button
                  onClick={() => handleModeSwitch("fast")}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                    mode === "fast"
                      ? "bg-white text-[#1F2F6B] shadow-sm"
                      : "text-[#64748B] hover:text-[#1F2F6B]"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Mode Cepat
                </button>
                <button
                  onClick={() => handleModeSwitch("smart")}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                    mode === "smart"
                      ? "bg-white text-[#1F2F6B] shadow-sm"
                      : "text-[#64748B] hover:text-[#1F2F6B]"
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Bale Pintar
                </button>
              </div>
            </div>

            {/* Mode Description */}
            <div className="mt-3 flex justify-center">
              {mode === "fast" ? (
                <p className="text-sm text-[#64748B]">
                  Gratis, tanpa login, langsung bisa dipakai.
                </p>
              ) : (
                <div className="flex items-center gap-2">
                  {groqKey ? (
                    <>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Terhubung: {maskApiKey(groqKey)}
                      </span>
                      <button
                        onClick={() => setShowModal(true)}
                        className="text-xs text-[#5DADEC] underline hover:text-[#1F2F6B]"
                      >
                        Kelola
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setShowModal(true)}
                      className="text-sm text-[#5DADEC] underline hover:text-[#1F2F6B]"
                    >
                      Hubungkan Groq API Key
                    </button>
                  )}
                </div>
              )}
            </div>

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
                  {mode === "smart"
                    ? "Bale lagi memahami konteksnya"
                    : "Bale lagi nyusun kata"}
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

            {/* Fallback notice */}
            {fallbackUsed && (
              <p className="mt-4 text-center text-sm text-[#FFB347]">
                Bale Pintar lagi belum bisa dipakai. Bale pakai Mode Cepat dulu ya.
              </p>
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
      </section>

      {/* Groq Setup Modal */}
      <GroqSetupModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveKey}
        currentKey={groqKey}
        onRemove={handleRemoveKey}
      />

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
    </>
  );
}
