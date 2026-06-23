const features = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="#5DADEC" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Balas Chat",
    desc: "Bantu bikin balasan chat yang ramah, sopan, atau singkat.",
    span: "col-span-1",
    accent: "#5DADEC",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="#7EE8C6" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Izin Kerja/Sekolah",
    desc: "Buat pesan izin yang enak dibaca tanpa terdengar berlebihan.",
    span: "col-span-1 sm:col-span-2",
    accent: "#7EE8C6",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="#FFB347" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Komplain Sopan",
    desc: "Sampaikan keluhan dengan tegas tapi tetap sopan.",
    span: "col-span-1 sm:col-span-2",
    accent: "#FFB347",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="#1F2F6B" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: "Caption Jualan",
    desc: "Bikin caption promosi yang lebih menarik untuk jualan.",
    span: "col-span-1",
    accent: "#1F2F6B",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="#5DADEC" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: "Rapihin Kalimat",
    desc: "Ubah kalimat seadanya jadi lebih rapi dan natural.",
    span: "col-span-1",
    accent: "#5DADEC",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="#7EE8C6" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Translate Jepang",
    desc: "Bantu translate Indonesia-Jepang dengan gaya natural.",
    span: "col-span-1 sm:col-span-2",
    accent: "#7EE8C6",
  },
];

export default function FeatureSection() {
  return (
    <section id="fitur" className="relative scroll-mt-24 py-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#5DADEC]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#5DADEC]">
            Fitur
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#1F2F6B] sm:text-4xl">
            Yang bisa <span className="text-[#5DADEC]">Bale</span> bantu
          </h2>
          <p className="mt-4 text-lg text-[#64748B]">
            Pilih kebutuhanmu, Bale yang susun kata-katanya.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-3xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1F2F6B]/5 sm:p-8 ${f.span}`}
            >
              {/* Accent line */}
              <div
                className="absolute top-0 left-0 h-1 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, ${f.accent}, transparent)` }}
              />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300" style={{ backgroundColor: `${f.accent}15` }}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1F2F6B]">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
