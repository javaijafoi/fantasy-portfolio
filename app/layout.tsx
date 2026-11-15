import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel-title",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel-body",
});

export const metadata: Metadata = {
  title: "Peter (javaijafoi) | Fantasy Desktop & Quest Log",
  description: "Portfólio de projetos no GitHub e Vercel ambientado em um sistema operacional de fantasia retrô 16-bit.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧙</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${pressStart.variable} ${vt323.variable} h-full select-none`}>
      <body className="h-full w-full overflow-hidden bg-slate-900 font-sans text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
