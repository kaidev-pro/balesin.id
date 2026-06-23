import Image from "next/image";
import { BASE_PATH } from "@/lib/config";
import { HeroClouds } from "@/components/CloudDecorations";

const bubbles = [
  { text: "Mau versi sopan?", position: "top-0 -right-2 sm:-right-8 lg:top-0" },
  { text: "Tinggal copy!", position: "top-1/2 -left-2 sm:-left-8 -translate-y-1/2 lg:bottom-16 lg:top-auto lg:translate-y-0" },
  { text: "Bale rapihin dulu ya.", position: "bottom-0 -right-2 sm:-right-8 lg:bottom-0" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] pt-[72px] overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-mesh absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#5DADEC]/12 blur-[100px]" />
        <div className="animate-mesh-delay absolute top-20 -right-40 h-[600px] w-[600px] rounded-full bg-[#7EE8C6]/12 blur-[120px]" />
        <div className="animate-mesh-slow absolute -bottom-20 left-1/3 h-[400px] w-[400px] rounded-full bg-[#FFB347]/10 blur-[80px]" />
      </div>

      {/* Cloud decorations */}
      <HeroClouds />

      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col items-center gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:py-20">
        {/* Left: text */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <span className="inline-block rounded-full bg-[#5DADEC]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#5DADEC] mb-6">
            AI Pembantu Pesan
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#1F2F6B] sm:text-5xl lg:text-6xl">
            Bingung nulis pesan?
            <br />
            <span className="bg-gradient-to-r from-[#5DADEC] to-[#7EE8C6] bg-clip-text text-transparent">
              Bale bantuin.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#64748B] sm:text-xl">
            Buat balasan chat, izin kerja, komplain sopan, caption jualan, dan
            translate Jepang natural dalam beberapa detik.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#generator"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-[#1F2F6B] px-8 text-base font-semibold text-white shadow-lg shadow-[#1F2F6B]/20 transition-all hover:-translate-y-0.5 hover:bg-[#1F2F6B]/90 hover:shadow-xl"
            >
              Coba Sekarang
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contoh"
              className="inline-flex h-14 items-center gap-2 rounded-full border-2 border-[#1F2F6B]/15 px-8 text-base font-semibold text-[#1F2F6B] transition-all hover:border-[#5DADEC]/40 hover:bg-[#5DADEC]/5"
            >
              Lihat Contoh
            </a>
          </div>

          {/* Social proof mini */}
          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#5DADEC", "#7EE8C6", "#FFB347", "#1F2F6B"].map((c, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#FFF8ED] text-[10px] font-bold text-white"
                  style={{ backgroundColor: c }}
                >
                  {["S", "A", "D", "B"][i]}
                </div>
              ))}
            </div>
            <p className="text-sm text-[#64748B]">
              <span className="font-semibold text-[#1F2F6B]">500+</span> orang udah pakai
            </p>
          </div>
        </div>

        {/* Right: visual + bubbles */}
        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative">
            <Image
              src={`${BASE_PATH}/brand/logo-balesin.png`}
              alt="Balesin.id — Bale"
              width={400}
              height={400}
              priority
              className="h-48 w-auto object-contain sm:h-64 lg:h-80"
            />

            {/* Floating bubbles — positioned to not overlap logo on mobile */}
            {bubbles.map((b, i) => (
              <div
                key={i}
                className={`animate-float absolute ${b.position}`}
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <div className="glass rounded-xl px-3 py-1.5 text-xs font-medium text-[#1F2F6B] shadow-lg shadow-[#1F2F6B]/5 whitespace-nowrap ring-1 ring-[#1F2F6B]/5 sm:rounded-2xl sm:px-4 sm:py-2 sm:text-sm">
                  {b.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
