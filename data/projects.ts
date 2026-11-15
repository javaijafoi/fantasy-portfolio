export interface ProjectCard {
  id: string;
  tag: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  gradient: string;
  accentColor: string;
  badgeColor: string;
  vercelUrl: string;
  githubUrl?: string;
  icon: string;
  rating: string;
}

export const CALIFORNIA_PROJECTS: ProjectCard[] = [
  {
    id: "antigravitus",
    tag: "TRACK 01 // AI OVERDRIVE",
    title: "Antigravitus",
    tagline: "Agentes Autônomos & Orquestração em Gravidade Zero",
    description:
      "Plataforma inteligente que conecta comandos e prompts a agentes de inteligência artificial autônomos. Construído para rodar em alta performance na Edge com respostas ultrarrápidas.",
    techStack: ["Next.js", "AI Agents", "TypeScript", "Vercel Edge"],
    gradient: "from-pink-500 via-purple-600 to-indigo-800",
    accentColor: "#ff2a85",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    vercelUrl: "https://antigravitus.vercel.app",
    githubUrl: "https://github.com/javaijafoi/antigravitus",
    icon: "⚡",
    rating: "AI POWERED",
  },
  {
    id: "picotron-arena",
    tag: "TRACK 02 // 16-BIT ARCADE",
    title: "Picotron Arena",
    tagline: "Arena de Jogos Retrô no Micro-Computador Vintage",
    description:
      "Laboratório de jogos e experimentação lúdica no ecossistema Picotron. Traz a essência das máquinas de fliperama dos anos 80 direto para o navegador com 60 FPS e sons chiptune.",
    techStack: ["Picotron", "Pico-8", "Lua / JavaScript", "GameDev"],
    gradient: "from-cyan-400 via-blue-600 to-indigo-900",
    accentColor: "#00f0ff",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    vercelUrl: "https://picotron-arena.vercel.app",
    githubUrl: "https://github.com/javaijafoi/picotron-arcade",
    icon: "🕹️",
    rating: "ARCADE HIT",
  },
  {
    id: "jogo-davi",
    tag: "TRACK 03 // SUNNY ADVENTURE",
    title: "Jogo do Davi",
    tagline: "Aventura Interativa, Cores Vibrantes & Gamificação",
    description:
      "Uma jornada colorida e animada repleta de desafios de lógica e reflexos. Desenvolvido com HTML5 Canvas e animações fluidas para jovens aventureiros.",
    techStack: ["React", "HTML5 Canvas", "Tailwind CSS", "Interactive UI"],
    gradient: "from-amber-400 via-orange-500 to-pink-600",
    accentColor: "#ffde59",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    vercelUrl: "https://jogo-davi.vercel.app",
    githubUrl: "https://github.com/javaijafoi/Jogo-davi",
    icon: "🌴",
    rating: "ALL AGES",
  },
  {
    id: "matusalem",
    tag: "TRACK 04 // CHRONOS WARP",
    title: "Matusalém",
    tagline: "Calculadora de Longevidade & Viagem no Tempo",
    description:
      "Ferramenta matemática e algorítmica para cálculos cronológicos e estimativas de longevidade temporal. Execução instantânea e sem engasgos.",
    techStack: ["JavaScript", "Time Algorithms", "Serverless", "Math Engine"],
    gradient: "from-fuchsia-500 via-purple-600 to-slate-900",
    accentColor: "#d946ef",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    vercelUrl: "https://matusalem-six.vercel.app",
    icon: "⏳",
    rating: "CHRONO TECH",
  },
];
