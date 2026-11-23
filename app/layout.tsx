import type { Metadata, Viewport } from "next";
import {
  Righteous,
  Space_Grotesk,
  Silkscreen,
  VT323,
  Cinzel,
  Crimson_Pro,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  GITHUB_URL,
  buildJsonLd,
} from "@/lib/site";

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-righteous",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-pixel",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-crt",
});

const cinzel = Cinzel({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-arcane",
});

const crimsonPro = Crimson_Pro({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-grimoire",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-code",
});

const BOOT_SCRIPT = `(function(){try{var o=["picotron","arcana","sunset","mainframe","win95"];var q=new URLSearchParams(location.search).get("os");var p=(q&&o.indexOf(q)!==-1)?q:o[Math.floor(Math.random()*o.length)];document.documentElement.setAttribute("data-os",p);}catch(e){document.documentElement.setAttribute("data-os","picotron");}})();`;

export const viewport: Viewport = {
  themeColor: "#090612",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: "Peter (@javaijafoi)", url: GITHUB_URL }],
  creator: "Peter (@javaijafoi)",
  publisher: "Peter (@javaijafoi)",
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [{ url: "/llms.txt", title: "LLM Context (llms.txt)" }],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = [
    righteous.variable,
    spaceGrotesk.variable,
    silkscreen.variable,
    vt323.variable,
    cinzel.variable,
    crimsonPro.variable,
    jetbrainsMono.variable,
  ].join(" ");

  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${fontClasses} min-h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="min-h-dvh w-full bg-[var(--os-boot-bg,#090612)] text-[var(--os-boot-fg,#f1f5f9)] antialiased overflow-x-clip selection:bg-pink-500 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
