import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FFF8ED]">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-[#5DADEC] hover:text-[#1F2F6B]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </Link>

        <h1 className="text-3xl font-bold text-[#1F2F6B]">Syarat & Ketentuan</h1>
        <p className="mt-2 text-sm text-[#64748B]">Terakhir diperbarui: 23 Juni 2026</p>

        <div className="mt-10 space-y-8 text-[#1F2937]">
          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">1. Penerimaan Syarat</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Dengan mengakses dan menggunakan Balesin.id, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan syarat ini, mohon untuk tidak menggunakan layanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">2. Deskripsi Layanan</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Balesin.id adalah layanan berbasis web yang membantu pengguna membuat pesan teks untuk berbagai keperluan. Kami menyediakan dua mode:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              <li><strong>Mode Cepat:</strong> Menggunakan template respons yang telah disiapkan sebelumnya.</li>
              <li><strong>Bale Pintar:</strong> Menggunakan API key Groq milik pengguna untuk menghasilkan respons yang lebih kontekstual melalui model AI.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">3. Penggunaan yang Diizinkan</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Anda dapat menggunakan Balesin.id untuk:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              <li>Membuat pesan untuk penggunaan pribadi</li>
              <li>Membuat pesan untuk keperluan bisnis atau profesional</li>
              <li>Menerjemahkan pesan dari Indonesia ke Jepang</li>
              <li>Merapihkan kalimat yang sudah ada</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">4. Penggunaan yang Dilarang</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Anda dilarang menggunakan Balesin.id untuk:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              <li>Membuat pesan yang mengandung ujaran kebencian, ancaman, atau pelecehan</li>
              <li>Membuat pesan untuk penipuan atau aktivitas ilegal</li>
              <li>Membuat pesan yang melanggar hak kekayaan intelektual pihak lain</li>
              <li>Menggunakan layanan secara berlebihan yang dapat mengganggu kinerja sistem</li>
              <li>Mencoba mengakses sistem atau data yang tidak seharusnya</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">5. Hak Kekayaan Intelektual</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Semua konten, desain, dan kode sumber Balesin.id adalah milik kami. Anda memiliki hak penuh atas pesan yang Anda buat menggunakan layanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">6. Penafian Tanggung Jawab</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Balesin.id disediakan &ldquo;sebagaimana adanya&rdquo; tanpa jaminan apapun. Kami tidak bertanggung jawab atas:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              <li>Akurasi atau kesesuaian pesan yang dihasilkan</li>
              <li>Kerugian yang timbul dari penggunaan pesan yang dihasilkan</li>
              <li>Gangguan atau ketidaktersediaan layanan</li>
              <li>Konten atau kebijakan privasi layanan pihak ketiga (Groq)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">7. Perubahan Syarat</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan diposting di halaman ini dengan tanggal &ldquo;Terakhir diperbarui&rdquo; yang baru. Penggunaan berkelanjutan setelah perubahan dianggap sebagai penerimaan Anda terhadap syarat yang baru.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">8. Hubungi Kami</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami melalui halaman <a href="#kontak" className="text-[#5DADEC] underline">Hubungi Kami</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
