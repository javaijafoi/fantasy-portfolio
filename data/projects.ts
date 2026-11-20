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
    id: "pico-multitool",
    tag: "TRACK 01 // TOOLS",
    title: "Pico Multitool",
    tagline: "47 ferramentas úteis que rodam no seu aparelho, em pixel",
    description:
      "Remover fundo de foto com IA, comprimir e cortar vídeo, cortar áudio, vídeo para GIF, juntar e dividir PDF, comprimir imagem, gerar CPF e CNPJ válidos, QR Code e calculadoras. Tudo roda no navegador, sem upload e sem cadastro, e dá para pedir a próxima ferramenta num formulário.",
    techStack: ["JavaScript", "ffmpeg.wasm", "pdf-lib", "PWA"],
    gradient: "from-yellow-300 via-pink-500 to-indigo-900",
    accentColor: "#ffec27",
    badgeColor: "bg-yellow-500/20 text-yellow-200 border-yellow-500/40",
    vercelUrl: "https://pico-tools-javaijafoi.vercel.app",
    githubUrl: "https://github.com/javaijafoi/pico-tools",
    icon: "🧰",
    rating: "47 FERRAMENTAS",
  },
  {
    id: "rolador",
    tag: "TRACK 02 // TABLETOP",
    title: "Rolador",
    tagline: "Dados para qualquer RPG de mesa, com cara de PICO-8",
    description:
      "Um rolador com cartuchos para doze sistemas: D&D e Tormenta, Fate, Vampiro V5, Storyteller, Cthulhu, Shadowrun, Savage Worlds, Blades, Daggerheart, GURPS e mais. Cada um aplica as regras certas, como vantagem, dados de Fome e explosão, e a notação livre aceita 4d6kh3 ou 8d10>=7. O histórico fica só no seu navegador.",
    techStack: ["React", "TypeScript", "Vite", "WebAudio"],
    gradient: "from-fuchsia-500 via-red-600 to-indigo-900",
    accentColor: "#ff004d",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/40",
    vercelUrl: "https://rolador-javaijafoi.vercel.app",
    githubUrl: "https://github.com/javaijafoi/rolador",
    icon: "🎲",
    rating: "ROLL INITIATIVE",
  },
  {
    id: "matusalem",
    tag: "TRACK 03 // NOIR PAULISTANO",
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
  {
    id: "pico-poetry",
    tag: "TRACK 04 // POETRY",
    title: "Pico Poetry",
    tagline: "Petiscos de poesia em pixel, prontos para compartilhar",
    description:
      "98 poemas meus num site em estilo PICO-8. Ele abre numa poesia sorteada, tem índice com busca e transforma qualquer poema numa imagem pixelada com o endereço do site embaixo. Dá para trocar as cores do cartão antes de enviar. Sem cadastro e sem rastreamento.",
    techStack: ["HTML", "CSS", "JavaScript", "Canvas"],
    gradient: "from-pink-400 via-fuchsia-500 to-indigo-900",
    accentColor: "#ff77a8",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    vercelUrl: "https://pico-poetry.vercel.app",
    githubUrl: "https://github.com/javaijafoi/pico-poetry",
    icon: "🍬",
    rating: "SORTEIE UMA",
  },
  {
    id: "arena-de-arton",
    tag: "TRACK 05 // TÁTICO",
    title: "Arena de Arton",
    tagline: "Simulador de combate tático por turnos de Tormenta 20",
    description:
      "Monte um grupo de até quatro heróis e suba uma escada de dez batalhas, do 1º ao 14º nível, numa grade de 16 por 12 quadrados. Tem magias até o 4º círculo, manobras, voo, flanco e inimigos controlados por IA, ou você joga com os dois lados. Roda no navegador, sem cadastro. Homenagem de fã, grátis e sem vínculo oficial com a Jambô.",
    techStack: ["JavaScript", "HTML/CSS", "Motor de regras", "IA de combate"],
    gradient: "from-amber-400 via-red-600 to-indigo-900",
    accentColor: "#f5c542",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    vercelUrl: "https://arena-de-arton.vercel.app",
    githubUrl: "https://github.com/javaijafoi/arena-de-arton",
    icon: "⚔️",
    rating: "ROLL INITIATIVE",
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
  },
  {
    id: "era-vargas",
    tag: "TRACK 07 // AULA EM 3D",
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
  },
  {
    id: "picotron-arena",
    tag: "TRACK 08 // ARCADE",
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
    tag: "TRACK 09 // ALFABETIZAÇÃO",
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
    id: "antigravitus",
    tag: "TRACK 10 // ROLEPLAY LOG",
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
    id: "ihunt-chronicle",
    tag: "TRACK 11 // MESA VIRTUAL",
    title: "#iHunt Chronicle",
    tagline: "Uma mesa virtual completa para o RPG #iHunt, feita por fã",
    description:
      "Uma mesa online para jogar #iHunt (sistema Fate) em grupo: o mestre cria a crônica e os jogadores entram por código de convite. Cenas com tokens e NPCs, chat e dados em tempo real, criador de caçadores e de monstros, codex de regras e ferramentas de segurança para a mesa. Funciona no PC e no celular. Projeto de fã, sem vínculo oficial.",
    techStack: ["React", "TypeScript", "Firebase", "Tempo real"],
    gradient: "from-red-600 via-rose-800 to-zinc-950",
    accentColor: "#ef4444",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/40",
    vercelUrl: "https://ihunt-chronicle.vercel.app",
    icon: "🩸",
    rating: "LIVE TABLE",
  },
];
