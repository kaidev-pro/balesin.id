const steps = [
  {
    number: "1",
    emoji: "✍️",
    title: "Tulis situasimu",
    desc: "Ceritain pesan seperti apa yang ingin kamu buat.",
  },
  {
    number: "2",
    emoji: "🎯",
    title: "Pilih gaya bahasa",
    desc: "Mau santai, sopan, formal, atau singkat.",
  },
  {
    number: "3",
    emoji: "📋",
    title: "Copy hasilnya",
    desc: "Bale buatin beberapa versi, kamu tinggal pilih dan kirim.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="cara-pakai" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#1F2F6B] sm:text-4xl">
            Cara pakainya <span className="text-[#5DADEC]">gampang</span>
          </h2>
          <p className="mt-4 text-lg text-[#64748B]">
            Cuma 3 langkah aja, kok.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute top-10 left-[60%] hidden h-0.5 w-[60%] bg-gradient-to-r from-[#5DADEC] to-[#7EE8C6] sm:block" />
              )}

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#5DADEC] to-[#7EE8C6] text-3xl shadow-lg">
                {step.emoji}
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#1F2F6B]">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-[#64748B]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
