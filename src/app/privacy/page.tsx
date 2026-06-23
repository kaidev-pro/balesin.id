import Link from "next/link";
import { BASE_PATH } from "@/lib/config";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FFF8ED]">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <Link href={`${BASE_PATH}/`} className="mb-8 inline-flex items-center gap-2 text-sm text-[#5DADEC] hover:text-[#1F2F6B]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </Link>

        <h1 className="text-3xl font-bold text-[#1F2F6B]">Kebijakan Privasi</h1>
        <p className="mt-2 text-sm text-[#64748B]">Terakhir diperbarui: 23 Juni 2026</p>

        <div className="mt-10 space-y-8 text-[#1F2937]">
          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">1. Informasi yang Kami Kumpulkan</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Balesin.id mengumpulkan informasi berikut saat Anda menggunakan layanan kami:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              <li><strong>Input teks:</strong> Pesan yang Anda masukkan ke dalam generator akan diproses secara lokal atau dikirim ke API pihak ketiga (Groq) jika Anda mengaktifkan fitur Bale Pintar.</li>
              <li><strong>API Key Groq:</strong> Jika Anda menggunakan fitur Bale Pintar, API key Groq Anda disimpan secara lokal di browser Anda (localStorage) dan tidak pernah dikirim ke server kami.</li>
              <li><strong>Data penggunaan:</strong> Kami dapat mengumpulkan data penggunaan anonim seperti jumlah generate dan kategori yang dipilih untuk meningkatkan layanan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">2. Penggunaan Informasi</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Informasi yang kami kumpulkan digunakan untuk:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              <li>Menyediakan dan meningkatkan layanan Balesin.id</li>
              <li>Memproses input Anda untuk menghasilkan pesan</li>
              <li>Menganalisis penggunaan untuk pengembangan fitur baru</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">3. Penyimpanan Data</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Balesin.id tidak menyimpan input pesan Anda di server kami. Semua input diproses secara real-time dan tidak disimpan setelah sesi berakhir. API key Groq Anda hanya disimpan di browser Anda (localStorage) dan dapat dihapus kapan saja melalui pengaturan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">4. Layanan Pihak Ketiga</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Jika Anda menggunakan fitur Bale Pintar, input Anda akan dikirim ke layanan Groq (groq.com) untuk diproses oleh model AI. Penggunaan Groq tunduk pada kebijakan privasi mereka sendiri. Kami menyarankan Anda untuk membaca kebijakan privasi Groq sebelum menggunakan fitur ini.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">5. Keamanan</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Kami mengambil langkah-langkah yang wajar untuk melindungi informasi Anda. Namun, harap diingat bahwa tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 100% aman.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">6. Hak Anda</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Anda memiliki hak untuk:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              <li>Menghapus API key Groq yang tersimpan di browser Anda</li>
              <li>Tidak menggunakan fitur Bale Pintar (gunakan Mode Cepat saja)</li>
              <li>Meminta informasi tentang data yang kami kumpulkan</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">7. Perubahan Kebijakan</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diposting di halaman ini dengan tanggal &ldquo;Terakhir diperbarui&rdquo; yang baru.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F2F6B]">8. Hubungi Kami</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami melalui halaman <a href="#kontak" className="text-[#5DADEC] underline">Hubungi Kami</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
