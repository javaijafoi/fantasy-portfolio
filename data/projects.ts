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
    tag: "TRACK 01 // ROLEPLAY LOG",
    title: "Antigravitus",
    tagline: "Um diário de aventuras num RPG de texto, jogado por agentes de IA",
    description:
      "Um herói vive no Devil's Bob MUD, um RPG de texto online que ainda roda desde os anos 90. Agentes de IA jogam com ele em rotinas supervisionadas e transformam cada sessão em crônica, com ficha, mapa e diário publicados num site. Nada é inventado: cada capítulo sai do que o jogo realmente mostrou.",
    techStack: ["Python", "Agentes de IA", "HTML/CSS/JS", "MUD"],
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
    tag: "TRACK 02 // ARCADE",
    title: "Picotron Arena",
    tagline: "Dez modos de arcade caóticos dentro de um computador de fantasia",
    description:
      "Uma estação de trabalho retrô inspirada no Picotron, num único arquivo HTML. São dez cartuchos de ação, do Liquidificador Cósmico ao Dominó de Pólvora, e um modo que junta todos ao mesmo tempo. Funciona no PC e no celular, com tela cheia e botões de toque, e guarda o progresso no próprio navegador.",
    techStack: ["JavaScript", "Canvas", "HTML único", "localStorage"],
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
    tag: "TRACK 03 // ALFABETIZAÇÃO",
    title: "Jogo do Davi",
    tagline: "Um jogo para crianças aprenderem a ler e a contar",
    description:
      "Atividades curtas de alfabetização pelo método fônico, das vogais às primeiras palavras, mais uma trilha de números. Uma tarefa por tela, nenhuma punição pelo erro e uma dica quando a criança empaca. O que ela erra volta com mais frequência nas sessões seguintes, para fixar no ritmo de cada um.",
    techStack: ["React", "TypeScript", "Vite", "Repetição espaçada"],
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
    tag: "TRACK 04 // NOIR PAULISTANO",
    title: "Matusalém",
    tagline: "Uma história interativa de mistério no Bixiga",
    description:
      "Um bilhete chama você ao porão de um restaurante no Bixiga, às onze da noite. A partir daí, cada escolha muda a investigação. É ficção interativa em texto, com relógio correndo até o sol nascer, fome, sinal de celular e um caderno de pistas. Os capítulos 1 e 2 de 4 já estão jogáveis.",
    techStack: ["ink", "inkjs", "JavaScript"],
    gradient: "from-fuchsia-500 via-purple-600 to-slate-900",
    accentColor: "#d946ef",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    vercelUrl: "https://matusalem-six.vercel.app",
    icon: "⏳",
    rating: "STORY MODE",
  },
];
