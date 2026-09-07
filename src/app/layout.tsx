import type { Metadata } from "next";
import { Kanit, Prompt } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
});

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PETMILY - เพื่อนซี้สี่ขา | แพลตฟอร์มดูแลสัตว์เลี้ยงครบวงจร",
  description: "แอปพลิเคชัน PETMILY เพื่อนซี้สี่ขา สำหรับเจ้าของสัตว์เลี้ยงและสัตวแพทย์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${kanit.variable} ${prompt.variable}`}>
      <body className="antialiased bg-[#EEF2F6] min-h-screen text-slate-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

