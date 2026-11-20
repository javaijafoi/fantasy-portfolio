import { CALIFORNIA_PROJECTS } from "@/data/projects";

/** Endereço canônico do portfólio (uma única URL para o Google e as IAs citarem). */
export const SITE_URL = "https://javaijafoi.dev";
export const SITE_NAME = "California Dreams '88 // Peter's Arcade";
export const SITE_TITLE = "Peter (@javaijafoi) | Jogos, histórias interativas e experimentos com IA";
export const SITE_DESCRIPTION =
  "Portfólio do Peter (@javaijafoi): jogos, histórias interativas e experimentos com IA, todos no ar. Arcade no navegador, RPG de mesa, ficção interativa e visão computacional.";
export const GITHUB_URL = "https://github.com/javaijafoi";

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

/** Perfil do GitHub mais todo repositório público ligado ao portfólio. */
export function publicLinks(): string[] {
  const repos = [
    ...CALIFORNIA_PROJECTS.map((p) => p.githubUrl),
    ...EXTRA_PROJECTS.map((p) => p.repo),
  ].filter((u): u is string => Boolean(u));
  return [GITHUB_URL, ...Array.from(new Set(repos))];
}

export const SITE_KEYWORDS = [
  "Peter",
  "javaijafoi",
  "portfólio",
  "desenvolvedor",
  "jogos no navegador",
  "ficção interativa",
  "RPG de mesa",
  "agentes de IA",
  "React",
  "TypeScript",
];

/** JSON-LD: pessoa, site e lista de projetos (ajuda Google e mecanismos de IA a entender o que existe aqui). */
export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#peter`,
        name: "Peter",
        alternateName: "javaijafoi",
        url: SITE_URL,
        sameAs: publicLinks(),
        jobTitle: "Desenvolvedor de jogos e experimentos com IA",
        knowsLanguage: "pt-BR",
        knowsAbout: ["JavaScript", "TypeScript", "React", "Jogos web", "Ficção interativa", "Agentes de IA"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "pt-BR",
        author: { "@id": `${SITE_URL}/#peter` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#projetos`,
        name: "Projetos do Peter",
        numberOfItems: CALIFORNIA_PROJECTS.length + EXTRA_PROJECTS.length,
        itemListElement: [...CALIFORNIA_PROJECTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareApplication",
            name: p.title,
            description: `${p.tagline}. ${p.description}`,
            url: p.vercelUrl,
            applicationCategory: "GameApplication",
            operatingSystem: "Qualquer navegador moderno",
            inLanguage: "pt-BR",
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
            applicationCategory: "GameApplication",
            operatingSystem: "Qualquer navegador moderno",
            inLanguage: "pt-BR",
            author: { "@id": `${SITE_URL}/#peter` },
            codeRepository: p.repo,
          },
        })),
        ],
      },
    ],
  };
}
