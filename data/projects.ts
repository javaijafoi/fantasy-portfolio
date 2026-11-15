export interface RomProject {
  id: string;
  romName: string;
  title: string;
  subtitle: string;
  genre: string;
  year: string;
  system: string;
  developer: string;
  description: string;
  specs: { label: string; value: string }[];
  vercelUrl: string;
  githubUrl?: string;
  fileSize: string;
  status: "ONLINE" | "STABLE";
  boxColor: string;
  accentColor: string;
  icon: string;
  previewArt: string; // ASCII / Pixel Art or visual banner
}

export const ROM_LIST: RomProject[] = [
  {
    id: "antigravitus",
    romName: "ANTIGRAVITUS.ROM",
    title: "Antigravitus",
    subtitle: "Oráculo & Orquestrador de Agentes Autônomos",
    genre: "AI / Automation Engine",
    year: "2024",
    system: "NEXT-GEN VERCEL EDGE",
    developer: "Peter (@javaijafoi)",
    description:
      "Plataforma inteligente para orquestração e execução de comandos com agentes de inteligência artificial. Conecta prompts avançados a fluxos de trabalho autônomos na nuvem.",
    specs: [
      { label: "Core Tech", value: "Next.js / TypeScript" },
      { label: "AI Engine", value: "Autonomous Agents" },
      { label: "Hosting", value: "Vercel Edge Network" },
      { label: "License", value: "Open Source" },
    ],
    vercelUrl: "https://antigravitus.vercel.app",
    githubUrl: "https://github.com/javaijafoi/antigravitus",
    fileSize: "16.4 MB",
    status: "ONLINE",
    boxColor: "from-indigo-600 to-purple-800",
    accentColor: "#818cf8",
    icon: "⚡",
    previewArt: `
  ▲  [ANTIGRAVITUS-CORE]
 / \\  AI AGENT RUNTIME
/___\\ STATUS: OPTIMAL
 [⚡] ZERO-G AUTOMATION
    `,
  },
  {
    id: "picotron-arena",
    romName: "PICOTRON_ARENA.ROM",
    title: "Picotron Arena",
    subtitle: "Arena Arcade no Micro-Computador Retrô",
    genre: "Arcade / GameDev",
    year: "2024",
    system: "PICOTRON 16-BIT CONSOLE",
    developer: "Peter (@javaijafoi)",
    description:
      "Experiência arcade e laboratório de jogos desenvolvidos para o ecossistema do micro-computador Picotron. Combina estética pixel art vintage com game loops otimizados no navegador.",
    specs: [
      { label: "Engine", value: "Picotron / Pico-8" },
      { label: "Language", value: "Lua / JavaScript" },
      { label: "Graphics", value: "16-Color Palette / 60 FPS" },
      { label: "Audio", value: "Chiptune Synthesizer" },
    ],
    vercelUrl: "https://picotron-arena.vercel.app",
    githubUrl: "https://github.com/javaijafoi/picotron-arcade",
    fileSize: "4.2 MB",
    status: "ONLINE",
    boxColor: "from-emerald-600 to-teal-800",
    accentColor: "#34d399",
    icon: "🕹️",
    previewArt: `
+-----------------------+
|  [>] PICOTRON ARCADE  |
|  * * SCORE: 999990 *  |
|      ( o . o )        |
|  INSERT COIN TO PLAY  |
+-----------------------+
    `,
  },
  {
    id: "jogo-davi",
    romName: "JOGO_DAVI.ROM",
    title: "Jogo do Davi",
    subtitle: "Aventura Interativa & Desafios Lúdicos",
    genre: "Kids / Educational Adventure",
    year: "2024",
    system: "HTML5 CANVAS V2",
    developer: "Peter (@javaijafoi)",
    description:
      "Jogo interativo repleto de animações, dinâmicas de raciocínio e fases customizadas, criado para encantar e desafiar jovens jogadores através do navegador.",
    specs: [
      { label: "Frontend", value: "React / HTML5 Canvas" },
      { label: "Target", value: "Mobile & Desktop Web" },
      { label: "Audio", value: "Efeitos Sonoros Lúdicos" },
      { label: "Build", value: "Vercel Optimized" },
    ],
    vercelUrl: "https://jogo-davi.vercel.app",
    githubUrl: "https://github.com/javaijafoi/Jogo-davi",
    fileSize: "8.1 MB",
    status: "ONLINE",
    boxColor: "from-amber-600 to-orange-800",
    accentColor: "#fbbf24",
    icon: "🌟",
    previewArt: `
  ★ JOGO DO DAVI ★
 [====================]
   \\(^_^) /  CAMPIONE!
  [ FASE 1: AVENTURA ]
    `,
  },
  {
    id: "matusalem",
    romName: "MATUSALEM.ROM",
    title: "Matusalém",
    subtitle: "Oráculo Algorítmico de Longevidade & Tempo",
    genre: "Utility / Time Calculator",
    year: "2024",
    system: "WEB UTILITY RUNTIME",
    developer: "Peter (@javaijafoi)",
    description:
      "Calculadora temporal algorítmica desenhada para estimar ciclos de longevidade, passagens de era e métricas cronológicas com alta precisão.",
    specs: [
      { label: "Type", value: "Mathematical Tool" },
      { label: "Core", value: "JavaScript / Algoritmos" },
      { label: "Deployment", value: "Vercel Serverless" },
      { label: "Speed", value: "Instant Execution" },
    ],
    vercelUrl: "https://matusalem-six.vercel.app",
    fileSize: "2.8 MB",
    status: "ONLINE",
    boxColor: "from-blue-600 to-cyan-800",
    accentColor: "#38bdf8",
    icon: "⏳",
    previewArt: `
   .---.     MATUSALEM
  /     \\    CHRONOS ENGINE
 | TIME  |   YEARS: 969
  \\     /    [=== 100% ===]
   '---'
    `,
  },
];
