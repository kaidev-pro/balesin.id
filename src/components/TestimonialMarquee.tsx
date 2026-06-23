const testimonials = [
  {
    name: "Siti Nurhaliza",
    role: "UMKM Frozen Food",
    text: "Balesin.id bantu banget bikin caption jualan yang menarik. Penjualan naik 30% setelah pakai!",
    avatar: "SN",
  },
  {
    name: "Ahmad Rizki",
    role: "Mahasiswa",
    text: "Buat izin ke dosen jadi lebih gampang. Nggak perlu mikir lama, tinggal copy paste aja.",
    avatar: "AR",
  },
  {
    name: "Dewi Lestari",
    role: "Customer Service",
    text: "Komplain pelanggan jadi lebih sopan dan profesional. Recommended buat yang kerja di CS!",
    avatar: "DL",
  },
  {
    name: "Budi Santoso",
    role: "Freelancer",
    text: "Translate Jepang-nya natural banget. Klien Jepang jadi lebih mudah ngerti pesan aku.",
    avatar: "BS",
  },
  {
    name: "Maya Putri",
    role: "Content Creator",
    text: "Nggak perlu bingung lagi mikir caption. Tinggal ceritain situasinya, Bale yang susun!",
    avatar: "MP",
  },
  {
    name: "Rizal Fadli",
    role: "Karyawan",
    text: "Izin sakit jadi lebih sopan. Bos aku bilang pesannya enak dibaca dan profesional.",
    avatar: "RF",
  },
];

const avatarColors = ["#5DADEC", "#7EE8C6", "#FFB347", "#1F2F6B", "#E879F9", "#F97316"];

function TestimonialCard({
  t,
  color,
}: {
  t: (typeof testimonials)[0];
  color: string;
}) {
  return (
    <div className="w-[320px] flex-shrink-0 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#1F2F6B]/5">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {t.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1F2F6B]">{t.name}</p>
          <p className="text-xs text-[#64748B]">{t.role}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#1F2937]">
        &ldquo;{t.text}&rdquo;
      </p>
    </div>
  );
}

export default function TestimonialMarquee() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#7EE8C6]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7EE8C6]">
            Kata Mereka
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#1F2F6B] sm:text-4xl">
            Udah pada <span className="text-[#5DADEC]">pakai</span>
          </h2>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="relative mt-12 flex flex-col gap-4">
        {/* Gradient masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#FFF8ED] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#FFF8ED] to-transparent" />

        {/* Row 1 */}
        <div className="flex gap-4 animate-marquee">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} t={t} color={avatarColors[i % avatarColors.length]} />
          ))}
        </div>

        {/* Row 2 — reverse */}
        <div className="flex gap-4 animate-marquee-reverse">
          {[...testimonials, ...testimonials].reverse().map((t, i) => (
            <TestimonialCard key={i} t={t} color={avatarColors[(i + 3) % avatarColors.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}
