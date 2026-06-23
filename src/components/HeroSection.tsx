import Image from "next/image";
import { BASE_PATH } from "@/lib/config";

const bubbles = [
  { text: "Mau versi sopan?", x: "right", delay: "0s" },
  { text: "Tinggal copy!", x: "left", delay: "0.5s" },
  { text: "Bale rapihin dulu ya.", x: "right", delay: "1s" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] pt-[72px] overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-[#5DADEC]/10 blur-3xl" />
      <div className="absolute top-40 -right-20 h-80 w-80 rounded-full bg-[#7EE8C6]/10 blur-3xl" />
      <div className="absolute bottom-20 left-1/3 h-60 w-60 rounded-full bg-[#FFB347]/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col items-center gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:py-20">
        {/* Left: text */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#1F2F6B] sm:text-5xl lg:text-6xl">
            Bingung nulis pesan?
            <br />
            <span className="text-[#5DADEC]">Bale bantuin.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#64748B] sm:text-xl">
            Buat balasan chat, izin kerja, komplain sopan, caption jualan, dan
            translate Jepang natural dalam beberapa detik.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#generator"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-[#1F2F6B] px-8 text-base font-semibold text-white shadow-lg shadow-[#1F2F6B]/20 hover:bg-[#1F2F6B]/90 transition-all hover:-translate-y-0.5"
            >
              Coba Sekarang
            </a>
            <a
              href="#contoh"
              className="inline-flex h-14 items-center gap-2 rounded-full border-2 border-[#1F2F6B]/20 px-8 text-base font-semibold text-[#1F2F6B] hover:bg-[#1F2F6B]/5 transition-all"
            >
              Lihat Contoh
            </a>
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

            {/* Floating bubbles */}
            {bubbles.map((b, i) => (
              <div
                key={i}
                className={`animate-float absolute ${
                  b.x === "right" ? "-right-4 sm:-right-8" : "-left-4 sm:-left-8"
                } ${
                  i === 0
                    ? "top-0"
                    : i === 1
                      ? "bottom-16"
                      : "bottom-0"
                }`}
                style={{ animationDelay: b.delay }}
              >
                <div className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-[#1F2F6B] shadow-lg shadow-[#1F2F6B]/10 whitespace-nowrap">
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
