export interface EasyModeConfig {
  label: string;
  perks: string[];
  tip: string;
  simplifiedDesc: string;
}

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
  easyMode: EasyModeConfig;
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
    easyMode: {
      label: "⭐ MODO FÁCIL: Leitura de Crônicas em 1-Toque",
      perks: [
        "Capítulos ilustrados e fáceis de ler",
        "Acompanhe o herói sem precisar jogar comandos difíceis de terminal",
        "Mapas visuais automáticos das aventuras",
      ],
      tip: "💡 Dica Fácil: Abra a página e clique no mapa para ver onde o herói está explorando agora!",
      simplifiedDesc: "Histórias e quadrinhos de um herói de videogame jogado por robôs inteligentes!",
    },
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
    easyMode: {
      label: "⭐ MODO FÁCIL: Controles Amigáveis & Vidas Livres",
      perks: [
        "Controles super simples na tela ou no teclado",
        "Velocidade reduzida para desviar com calma",
        "Sons divertidos estilo videogame antigo",
      ],
      tip: "💡 Dica Fácil: Aperte Espaço ou toque na tela para começar e divirta-se nos minigames!",
      simplifiedDesc: "Fliperama retrô cheio de minigames divertidos de navezinhas e desafios coloridos!",
    },
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
    easyMode: {
      label: "⭐ MODO FÁCIL: Aventura Sem Erro & Dicas Visuais",
      perks: [
        "Dicas que mostram a resposta quando tiver dúvida",
        "Nenhum ponto perdido ao errar: tente de novo à vontade",
        "Letras grandes e números falados",
      ],
      tip: "💡 Dica Fácil: Clique nas letras coloridas para ouvir o som e acertar a palavra!",
      simplifiedDesc: "Jogo super gostoso para aprender letrinhas, vogais e números se divertindo!",
    },
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
    easyMode: {
      label: "⭐ MODO FÁCIL: Detetive Guiado & Pistas Claras",
      perks: [
        "Pistas marcadas em destaque para não se perder",
        "Escolhas mais fáceis para desvendar o segredo",
        "Sem tempo limite: investigue no seu próprio ritmo",
      ],
      tip: "💡 Dica Fácil: Leia as opções com calma e escolha a pista que achar mais curiosa!",
      simplifiedDesc: "Um livrinho de mistério interativo onde você é o detetive e escolhe o que acontece!",
    },
  },
  {
    id: "era-vargas",
    tag: "TRACK 05 // AULA EM 3D",
    title: "Era Vargas: O Equilibrista",
    tagline: "Um jogo 3D de decisões sobre o Brasil de 1930 a 1945",
    description:
      "Doze decisões da Era Vargas num palco 3D do Palácio do Catete. Cada escolha mexe com Exército, Povo, Elite e Controle; se algum pilar zerar ou estourar, vem o golpe. Cenário low poly feito todo em código, com narração gerada por voz sintética. Homenagem independente às aulas do Se Liga, sem vínculo oficial.",
    techStack: ["React", "Three.js", "React Three Fiber", "TTS"],
    gradient: "from-yellow-400 via-orange-500 to-purple-800",
    accentColor: "#ffd000",
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    vercelUrl: "https://era-vargas-seliga.vercel.app",
    githubUrl: "https://github.com/javaijafoi/era-vargas-seliga",
    icon: "🎭",
    rating: "HISTORY MODE",
    easyMode: {
      label: "⭐ MODO FÁCIL: Presidente Tranquilo (Equilíbrio Amigável)",
      perks: [
        "Pilares mais resistentes que não caem fácil",
        "Dicas que explicam o que o povo e o exército querem",
        "Visão 3D divertida do palácio",
      ],
      tip: "💡 Dica Fácil: Tente manter as barras no meio para governar sem levar golpe!",
      simplifiedDesc: "Um jogo 3D onde você toma decisões no palácio do presidente e aprende história!",
    },
  },
  {
    id: "pinta-kara",
    tag: "TRACK 06 // AR SKETCH",
    title: "Pinta-Kara",
    tagline: "Desenhe no ar com as mãos, usando só a webcam",
    description:
      "A câmera acompanha as duas mãos em tempo real: junte polegar e indicador para desenhar e aperte os botões de cor sem tocar no mouse. A visão computacional roda inteira no navegador, então nenhuma imagem da câmera sai do seu computador.",
    techStack: ["JavaScript", "MediaPipe", "Canvas", "Vite"],
    gradient: "from-emerald-400 via-teal-600 to-slate-900",
    accentColor: "#00ff88",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    vercelUrl: "https://pinta-kara.vercel.app",
    githubUrl: "https://github.com/javaijafoi/pinta-kara",
    icon: "✋",
    rating: "HANDS ON",
    easyMode: {
      label: "⭐ MODO FÁCIL: Pincel Mágico com as Mãos",
      perks: [
        "Detecção de mãos super rápida e sensível",
        "Cores brilhantes e traços automáticos",
        "Desenhe no ar como se fosse mágica de verdade",
      ],
      tip: "💡 Dica Fácil: Mostre a mão para a webcam e junte os dedinhos para pintar no ar!",
      simplifiedDesc: "Pinte e desenhe no ar usando as mãos na frente da câmera como se fosse mágica!",
    },
  },
  {
    id: "ihunt-chronicle",
    tag: "TRACK 07 // EM PAUSA",
    title: "#iHunt Chronicle",
    tagline: "Uma mesa virtual para o RPG #iHunt, feita por fã",
    description:
      "Mesa virtual para jogar #iHunt (sistema Fate) online: campanhas com código de convite, cenas com tokens e NPCs em tempo real, criador de caçadores e um gerador público de fichas de monstros. Está no ar e funcionando, mas em pausa por enquanto.",
    techStack: ["React", "TypeScript", "Firebase", "Fate"],
    gradient: "from-red-600 via-rose-800 to-zinc-950",
    accentColor: "#ef4444",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/40",
    vercelUrl: "https://ihunt-chronicle.vercel.app",
    githubUrl: "https://github.com/javaijafoi/ihunt-chronicle",
    icon: "🩸",
    rating: "ON HOLD",
    easyMode: {
      label: "⭐ MODO FÁCIL: Gerador Rápido de Monstros",
      perks: [
        "Gere monstros com 1 clique para suas histórias",
        "Tokens e fichas pré-prontas",
        "Sem regras complicadas para consultar",
      ],
      tip: "💡 Dica Fácil: Clique no gerador de fichas para criar criaturas fantásticas na hora!",
      simplifiedDesc: "Mesa de RPG e criador de monstros legais para inventar histórias de aventura!",
    },
  },
  {
    id: "rolador",
    tag: "TRACK 08 // TABLETOP",
    title: "Rolador",
    tagline: "Dados para qualquer RPG de mesa, com cara de PICO-8",
    description:
      "Um rolador com cartuchos para doze sistemas: D&D e Tormenta, Fate, Vampiro V5, Storyteller, Cthulhu, Shadowrun, Savage Worlds, Blades, Daggerheart, GURPS e mais. Cada um aplica as regras certas, como vantagem, dados de Fome e explosão, e a notação livre aceita 4d6kh3 ou 8d10>=7. O histórico fica só no seu navegador.",
    techStack: ["React", "TypeScript", "Vite", "WebAudio"],
    gradient: "from-fuchsia-500 via-red-600 to-indigo-900",
    accentColor: "#ff004d",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/40",
    vercelUrl: "https://rolador-nine.vercel.app",
    githubUrl: "https://github.com/javaijafoi/rolador",
    icon: "🎲",
    rating: "ROLL INITIATIVE",
    easyMode: {
      label: "⭐ MODO FÁCIL: Rolador de Dados em 1 Toque",
      perks: [
        "Aperte o botão do dado e ele rola com barulhinho 8-bit",
        "Soma o resultado sozinho na tela",
        "Sem contas difíceis de cabeça",
      ],
      tip: "💡 Dica Fácil: Clique em D20 ou D6 e veja o número da sorte aparecer!",
      simplifiedDesc: "Dados mágicos de videogame que você joga apertando a tela com barulhos retrô!",
    },
  },
];
