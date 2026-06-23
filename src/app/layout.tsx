import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./cloud-animations.css";
import { DriftingClouds } from "@/components/CloudDecorations";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Balesin.id — AI Pembantu Bikin Pesan Siap Kirim",
  description:
    "Buat balasan chat, izin kerja, komplain sopan, caption jualan, dan translate Jepang natural dalam beberapa detik bersama Bale.",
  keywords: [
    "bikin pesan AI",
    "balas chat AI",
    "izin kerja",
    "komplain sopan",
    "caption jualan",
    "translate Jepang",
    "Balesin.id",
  ],
  openGraph: {
    title: "Balesin.id — AI Pembantu Bikin Pesan Siap Kirim",
    description:
      "Buat balasan chat, izin kerja, komplain sopan, caption jualan, dan translate Jepang natural dalam beberapa detik bersama Bale.",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://kaidev-pro.github.io/balesin.id"}/brand/logo-balesin.png`,
        width: 1200,
        height: 630,
        alt: "Balesin.id — AI Pembantu Bikin Pesan",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DriftingClouds />
        {children}
      </body>
    </html>
  );
}
