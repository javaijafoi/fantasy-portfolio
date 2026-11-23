import { CALIFORNIA_PROJECTS } from "@/data/projects";

/** Endereço canônico do portfólio (uma única URL para o Google e as IAs citarem). */
export const SITE_URL = "https://javaijafoi.dev";
export const SITE_NAME = "JAVAI-OS // Fantasy OS do Peter (@javaijafoi)";
export const SITE_TITLE = "Peter (@javaijafoi) | Jogos, histórias interativas e experimentos com IA";
export const SITE_DESCRIPTION =
  "Portfólio do Peter (@javaijafoi): jogos, histórias interativas e experimentos com IA, todos no ar. Arcade no navegador, RPG de mesa, ficção interativa e visão computacional.";
export const GITHUB_URL = "https://github.com/javaijafoi";
export const SITE_LAST_MODIFIED = "2026-11-23";

/** Projetos públicos que não têm cartão no portfólio, mas ficam ligados a ele por links cruzados. */
export const EXTRA_PROJECTS = [
  {
    name: "iFone",
    description: "Celular de mentira para sortear coisas em mesas de #iHunt. PWA que funciona offline.",
    url: "https://ifone.javaijafoi.dev",
    repo: "https://github.com/javaijafoi/ifone",
  },
  {
    name: "iHunt App",
    description: "Fork do Fari App, mesa virtual open source para jogar Fate online, preparado para mesas de #iHunt.",
    url: "https://github.com/javaijafoi/iHunt-app",
    repo: "https://github.com/javaijafoi/iHunt-app",
  },
];

export const SITE_KEYWORDS = [
  "Peter",
  "javaijafoi",
  "portfólio",
  "desenvolvedor",
  "São Paulo",
  "Brasil",
  "jogos no navegador",
  "ficção interativa",
  "RPG de mesa",
  "Tormenta 20",
  "agentes de IA",
  "PICO-8",
  "WASM",
  "MediaPipe",
  "React 19",
  "Next.js 16",
  "TypeScript",
];

const PROJECT_CATEGORIES: Record<string, string> = {
  "pico-multitool": "UtilitiesApplication",
  "rolador": "UtilitiesApplication",
  "matusalem": "GameApplication",
  "pico-poetry": "MultimediaApplication",
  "arena-de-arton": "GameApplication",
  "pinta-kara": "MultimediaApplication",
  "era-vargas": "EducationalApplication",
  "picotron-arena": "GameApplication",
  "jogo-davi": "EducationalApplication",
  "antigravitus": "WebApplication",
  "ihunt-chronicle": "WebApplication",
};

/** JSON-LD: pessoa, site e lista de projetos (ajuda Google e mecanismos de IA / GEO a entender as entidades). */
export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#peter`,
        name: "Peter",
        identifier: "javaijafoi",
        alternateName: ["javaijafoi", "Peter Mac"],
        url: SITE_URL,
        sameAs: [GITHUB_URL],
        mainEntityOfPage: { "@id": `${SITE_URL}/#profilepage` },
        jobTitle: "Desenvolvedor de software, jogos web e experimentos com IA",
        disambiguatingDescription:
          "Desenvolvedor independente brasileiro em São Paulo, criador de jogos de navegador, ficção interativa, ferramentas PICO-8 e aplicações com agentes de IA.",
        nationality: {
          "@type": "Country",
          name: "Brazil",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "São Paulo",
          addressRegion: "SP",
          addressCountry: "BR",
        },
        knowsLanguage: ["pt-BR", "en"],
        knowsAbout: [
          "Desenvolvimento Web",
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Python",
          "WebAssembly",
          "MediaPipe",
          "Three.js",
          "Web Audio API",
          "Jogos no navegador",
          "Ficção interativa",
          "RPG de mesa",
          "Agentes de IA",
          "PICO-8",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "pt-BR",
        publisher: { "@id": `${SITE_URL}/#peter` },
        author: { "@id": `${SITE_URL}/#peter` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: SITE_TITLE,
        dateModified: SITE_LAST_MODIFIED,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#peter` },
        mainEntity: { "@id": `${SITE_URL}/#peter` },
        hasPart: { "@id": `${SITE_URL}/#projetos` },
        inLanguage: "pt-BR",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#projetos`,
        name: "Projetos do Peter (@javaijafoi)",
        description: "Catálogo de jogos, ferramentas web, ficção interativa e experimentos com IA.",
        numberOfItems: CALIFORNIA_PROJECTS.length + EXTRA_PROJECTS.length,
        itemListElement: [
          ...CALIFORNIA_PROJECTS.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "SoftwareApplication",
              name: p.title,
              description: `${p.tagline}. ${p.description}`,
              url: p.vercelUrl,
              applicationCategory: PROJECT_CATEGORIES[p.id] || "SoftwareApplication",
              operatingSystem: "Qualquer navegador moderno",
              inLanguage: "pt-BR",
              isAccessibleForFree: true,
              keywords: p.techStack.join(", "),
              author: { "@id": `${SITE_URL}/#peter` },
              offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
              ...(p.githubUrl ? { codeRepository: p.githubUrl } : {}),
            },
          })),
          ...EXTRA_PROJECTS.map((p, i) => ({
            "@type": "ListItem",
            position: CALIFORNIA_PROJECTS.length + i + 1,
            item: {
              "@type": "SoftwareApplication",
              name: p.name,
              description: p.description,
              url: p.url,
              applicationCategory: "WebApplication",
              operatingSystem: "Qualquer navegador moderno",
              inLanguage: "pt-BR",
              isAccessibleForFree: true,
              author: { "@id": `${SITE_URL}/#peter` },
              offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
              codeRepository: p.repo,
            },
          })),
        ],
      },
    ],
  };
}
