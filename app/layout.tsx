import type { Metadata } from "next";
import { Righteous, Space_Grotesk } from "next/font/google";
import "./globals.css";

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "CALIFORNIA DREAMS '88 // Peter's Arcade",
  description: "Portfólio retrô anos 80 - Sunset, Synthwave & Projetos no Ar",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌴</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${righteous.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full w-full bg-[#0d071e] text-slate-100 antialiased overflow-x-hidden selection:bg-pink-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
