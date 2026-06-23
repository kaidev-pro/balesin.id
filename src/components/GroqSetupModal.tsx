"use client";

import { useState } from "react";
import { maskApiKey } from "@/lib/aiGenerate";

interface GroqSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  currentKey?: string;
  onRemove?: () => void;
}

export default function GroqSetupModal({
  isOpen,
  onClose,
  onSave,
  currentKey,
  onRemove,
}: GroqSetupModalProps) {
  const [inputKey, setInputKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (inputKey.trim()) {
      onSave(inputKey.trim());
      setInputKey("");
      onClose();
    }
  };

  const handleRemove = () => {
    onRemove?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1F2F6B]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#64748B] transition-colors hover:bg-[#FFF8ED] hover:text-[#1F2F6B]"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5DADEC]/10">
            <svg className="h-6 w-6 text-[#5DADEC]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1F2F6B]">
            Hubungkan Groq API Key
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
            Bale Pintar memakai API key Groq milikmu sendiri. Balesin.id tidak menyimpan key ini di database.
          </p>
        </div>

        {/* Current key status */}
        {currentKey && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">API Key tersimpan</p>
                <p className="mt-1 font-mono text-xs text-green-600">{maskApiKey(currentKey)}</p>
              </div>
              <button
                onClick={handleRemove}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Hapus
              </button>
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="mb-6 rounded-2xl bg-[#FFF8ED] p-4">
          <p className="mb-3 text-sm font-semibold text-[#1F2F6B]">Cara mendapatkan API Key:</p>
          <ol className="space-y-2 text-sm text-[#64748B]">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5DADEC] text-[10px] font-bold text-white">1</span>
              <span>Buka Groq Console</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5DADEC] text-[10px] font-bold text-white">2</span>
              <span>Login atau buat akun</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5DADEC] text-[10px] font-bold text-white">3</span>
              <span>Buat API key baru</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5DADEC] text-[10px] font-bold text-white">4</span>
              <span>Paste API key di bawah ini</span>
            </li>
          </ol>
          <a
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F2F6B] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1F2F6B]/90"
          >
            Buka Groq Console
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Input */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-[#1F2F6B]">
            Groq API Key
          </label>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="gsk_..."
              className="w-full rounded-xl border-2 border-[#1F2F6B]/10 bg-white px-4 py-3 pr-12 text-sm text-[#1F2937] placeholder-[#64748B] transition-colors focus:border-[#5DADEC] focus:outline-none focus:ring-2 focus:ring-[#5DADEC]/20"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1F2F6B]"
            >
              {showKey ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-[#1F2F6B]/10 px-4 py-3 text-sm font-semibold text-[#1F2F6B] transition-colors hover:bg-[#FFF8ED]"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={!inputKey.trim()}
            className="flex-1 rounded-xl bg-[#1F2F6B] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#1F2F6B]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Simpan di Browser Ini
          </button>
        </div>
      </div>
    </div>
  );
}
