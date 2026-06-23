const examples = [
  {
    before: "besok gue gabisa masuk",
    after: "Maaf, untuk besok saya belum bisa masuk. Terima kasih atas pengertiannya.",
  },
  {
    before: "barangku belum sampai, kok lama banget?",
    after: "Halo kak, maaf sebelumnya. Saya ingin menanyakan status pesanan saya karena sampai sekarang belum diterima. Mohon dibantu dicek ya, terima kasih.",
  },
  {
    before: "aku jual dimsum frozen, bikin caption",
    after: "Dimsum frozen praktis buat stok camilan di rumah! Tinggal kukus, langsung siap dinikmati. Cocok buat keluarga, bekal, atau teman nonton. Yuk order sekarang!",
  },
];

export default function ExampleSection() {
  return (
    <section id="contoh" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#1F2F6B] sm:text-4xl">
            Contoh hasil dari <span className="text-[#5DADEC]">Bale</span>
          </h2>
          <p className="mt-4 text-lg text-[#64748B]">
            Lihat gimana Bale ngerapihin pesan-pesan berikut.
          </p>
        </div>

        <div className="mt-12 grid gap-8">
          {examples.map((ex, i) => (
            <div
              key={i}
              className="grid gap-4 rounded-3xl bg-[#FFF8ED] p-6 sm:grid-cols-2 sm:gap-8 sm:p-8"
            >
              {/* Before */}
              <div className="rounded-2xl border-2 border-red-200 bg-white p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-500">
                    ✕
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                    Seadanya
                  </span>
                </div>
                <p className="text-base italic text-[#64748B]">
                  &ldquo;{ex.before}&rdquo;
                </p>
              </div>

              {/* After */}
              <div className="rounded-2xl border-2 border-green-200 bg-white p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-500">
                    ✓
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-green-400">
                    Dirapihin Bale
                  </span>
                </div>
                <p className="text-base text-[#1F2937]">
                  &ldquo;{ex.after}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
