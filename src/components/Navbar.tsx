"use client";

import Image from "next/image";
import { BASE_PATH } from "@/lib/config";
import { useState } from "react";

const navLinks = [
  { label: "Fitur", href: "#fitur" },
  { label: "Contoh", href: "#contoh" },
  { label: "Cara Pakai", href: "#cara-pakai" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-[#1F2F6B]/10 h-[72px]">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Image
            src={`${BASE_PATH}/brand/logo-balesin.png`}
            alt="Balesin.id Logo"
            width={140}
            height={45}
            priority
            className="h-10 w-auto object-contain sm:h-[44px]"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#1F2937]/80 hover:text-[#1F2F6B] transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#generator"
            className="rounded-full bg-[#1F2F6B] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1F2F6B]/90 transition-colors"
          >
            Coba Gratis
          </a>
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="#generator"
            className="rounded-full bg-[#1F2F6B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1F2F6B]/90 transition-colors"
          >
            Coba Gratis
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[#1F2F6B]"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-white border-b border-[#1F2F6B]/10 shadow-lg md:hidden">
          <div className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-[#1F2937]/80 hover:bg-[#FFF8ED] transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
