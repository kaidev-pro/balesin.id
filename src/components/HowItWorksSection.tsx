const steps = [
  {
    number: "1",
    icon: (
      <svg className="h-9 w-9" fill="none" stroke="white" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: "Tulis situasimu",
    desc: "Ceritain pesan seperti apa yang ingin kamu buat.",
  },
  {
    number: "2",
    icon: (
      <svg className="h-9 w-9" fill="none" stroke="white" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Pilih gaya bahasa",
    desc: "Mau santai, sopan, formal, atau singkat.",
  },
  {
    number: "3",
    icon: (
      <svg className="h-9 w-9" fill="none" stroke="white" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Copy hasilnya",
    desc: "Bale buatin beberapa versi, kamu tinggal pilih dan kirim.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="cara-pakai" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#1F2F6B]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#1F2F6B]">
            Cara Pakai
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#1F2F6B] sm:text-4xl">
            Tiga langkah, <span className="text-[#5DADEC]">selesai.</span>
          </h2>
        </div>

        <div className="relative mt-16">
          {/* Connector line */}
          <div className="absolute top-10 left-[16.67%] right-[16.67%] hidden h-0.5 bg-gradient-to-r from-[#5DADEC] via-[#7EE8C6] to-[#5DADEC] sm:block" />

          <div className="grid gap-10 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {/* Icon circle */}
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5DADEC] to-[#7EE8C6] shadow-lg shadow-[#5DADEC]/25 transition-transform duration-300 hover:scale-110">
                  {step.icon}
                  {/* Step number badge */}
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#1F2F6B] text-xs font-bold text-white shadow-md">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#1F2F6B]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[220px] text-base leading-relaxed text-[#64748B]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
