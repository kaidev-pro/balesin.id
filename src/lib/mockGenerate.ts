import { GenerateRequest, GenerateResponse } from "./generatePrompt";

const mockSamples: Record<string, (input: string) => GenerateResponse> = {
  "Izin Kerja": (input: string) => ({
    results: [
      {
        title: "Versi Singkat",
        text: `Maaf, hari ini saya izin tidak masuk kerja karena sedang kurang sehat. Terima kasih atas pengertiannya.`,
      },
      {
        title: "Versi Sopan",
        text: `Selamat pagi. Mohon izin, hari ini saya belum bisa masuk kerja karena kondisi badan sedang kurang sehat. Terima kasih atas pengertiannya.`,
      },
      {
        title: "Versi Hangat",
        text: `Selamat pagi, maaf sebelumnya. Hari ini saya izin tidak masuk kerja karena sedang kurang sehat. Semoga besok sudah bisa kembali masuk seperti biasa. Terima kasih banyak.`,
      },
    ],
  }),
  "Balasan Chat": (input: string) => ({
    results: [
      {
        title: "Versi Singkat",
        text: `Baik, nanti aku kabarin lagi ya. Makasih!`,
      },
      {
        title: "Versi Sopan",
        text: `Baik, terima kasih infonya. Nanti akan saya kabari kembali jika ada perkembangan.`,
      },
      {
        title: "Versi Hangat",
        text: `Siap, makasih banyak udah ngasih tahu! Nanti aku update lagi ya kalau ada kabar baru. Santai aja dulu.`,
      },
    ],
  }),
  "Komplain Sopan": (input: string) => ({
    results: [
      {
        title: "Versi Singkat",
        text: `Halo, mau tanya nih, pesanan saya belum sampai padahal udah lewat estimasi. Mohon dicek ya. Terima kasih.`,
      },
      {
        title: "Versi Sopan",
        text: `Selamat siang, maaf mengganggu. Saya ingin menanyakan status pesanan saya karena sampai saat ini belum diterima, padahal sudah melewati estimasi pengiriman. Mohon bantuannya untuk dicek. Terima kasih.`,
      },
      {
        title: "Versi Hangat",
        text: `Halo kak, maaf sebelumnya ya. Saya mau tanya soal pesanan saya yang belum sampai. Sudah lewat estimasi sih, tapi mungkin ada kendala di perjalanan. Mohon dibantu dicek ya, terima kasih banyak kak!`,
      },
    ],
  }),
  "Caption Jualan": (input: string) => ({
    results: [
      {
        title: "Versi Singkat",
        text: `${input} — Langsung order, yuk! Stok terbatas.`,
      },
      {
        title: "Versi Sopan",
        text: `Halo! Kami ada ${input} yang pastinya bakal kamu suka. Dijamin kualitasnya, cocok buat kamu yang ingin sesuatu yang spesial. Yuk, order sekarang!`,
      },
      {
        title: "Versi Hangat",
        text: `Hai! Udah pada tahu ${input}? Ini recommended banget, apalagi buat yang suka hal-hal praktis dan berkualitas. Buruan order sebelum kehabisan! 😊`,
      },
    ],
  }),
  "Rapihin Kalimat": (input: string) => ({
    results: [
      {
        title: "Versi Singkat",
        text: `${input} — Mohon bantuannya, terima kasih.`,
      },
      {
        title: "Versi Sopan",
        text: `Permisi, saya ingin bertanya mengenai hal ini. Mohon bantuannya ya. Terima kasih sebelumnya.`,
      },
      {
        title: "Versi Hangat",
        text: `Halo, maaf sebelumnya. Saya mau tanya-tanya soal ini. Kalau berkenan, tolong dibantu ya. Makasih banyak!`,
      },
    ],
  }),
  "Translate Indonesia-Jepang": (input: string) => ({
    results: [
      {
        title: "Versi Singkat",
        text: `お世話になっております。本件についてよろしくお願いいたします。`,
      },
      {
        title: "Versi Sopan",
        text: `いつもお世話になっております。この件についてご確認いただけますと幸いです。何卒よろしくお願い申し上げます。`,
      },
      {
        title: "Versi Hangat",
        text: `お疲れさまです！この件についてですが、もしお時間がありましたらご確認いただけると嬉しいです。引き続きよろしくお願いします！`,
      },
    ],
  }),
};

export function mockGenerate(req: GenerateRequest): GenerateResponse {
  const generator = mockSamples[req.category];
  if (generator) {
    return generator(req.input);
  }

  // Fallback
  return {
    results: [
      {
        title: "Versi Singkat",
        text: `Halo, ${req.input}. Mohon bantuannya, terima kasih.`,
      },
      {
        title: "Versi Sopan",
        text: `Selamat pagi/siang/sore. ${req.input}. Mohon bantuan dan perhatiannya. Terima kasih banyak.`,
      },
      {
        title: "Versi Hangat",
        text: `Hai! ${req.input}. Makasih banyak sebelumnya! Semoga harimu menyenangkan!`,
      },
    ],
  };
}
