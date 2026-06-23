import Image from "next/image";
import { BASE_PATH } from "@/lib/config";

const footerLinks = [
  { label: "Fitur", href: "#fitur" },
  { label: "Contoh", href: "#contoh" },
  { label: "Cara Pakai", href: "#cara-pakai" },
  { label: "Kontak", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1F2F6B]/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div className="sm:col-span-1">
            <Image
              src={`${BASE_PATH}/brand/logo-balesin.png`}
              alt="Balesin.id Logo"
              width={140}
              height={45}
              className="h-10 w-auto object-contain"
            />
            <p className="mt-3 text-lg font-semibold text-[#5DADEC]">
              &ldquo;Sini, Bale balesin.&rdquo;
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
              Balesin.id membantu kamu membuat pesan yang lebih rapi, sopan, dan
              siap dikirim.
            </p>
          </div>

          {/* Links */}
          <div className="sm:col-span-1">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#1F2F6B]">
              Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#64748B] transition-colors hover:text-[#1F2F6B]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="sm:col-span-1">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#1F2F6B]">
              Tentang Bale
            </h4>
            <p className="text-sm leading-relaxed text-[#64748B]">
              Bale adalah asisten AI yang bantu kamu menyusun pesan. Ramah,
              lucu, dan selalu siap bantu. Tinggal ceritain situasinya, Bale
              yang urus sisanya.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#1F2F6B]/10 pt-8 text-center">
          <p className="text-sm text-[#64748B]">
            &copy; 2026 Balesin.id. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
