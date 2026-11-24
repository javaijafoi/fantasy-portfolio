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
    tag: "01 // FERRAMENTAS",
    title: "Pico Multitool",
    tagline: "50 ferramentas que rodam no navegador, sem upload e sem cadastro",
    description:
      "Remover fundo de foto com IA, comprimir e cortar vídeo, OCR de imagem e PDF, recorte para redes sociais, juntar e dividir PDF, comprimir imagem, gerar CPF e CNPJ válidos, QR Code e calculadoras. Tudo roda no navegador, sem upload e sem cadastro, e dá para pedir a próxima ferramenta num formulário.",
    techStack: ["JavaScript", "ffmpeg.wasm", "pdf-lib", "PWA"],
    gradient: "from-yellow-300 via-pink-500 to-indigo-900",
    accentColor: "#ffec27",
    badgeColor: "bg-yellow-500/20 text-yellow-200 border-yellow-500/40",
    vercelUrl: "https://multitool.javaijafoi.dev",
    githubUrl: "https://github.com/javaijafoi/pico-tools",
    icon: "🧰",
    rating: "50 FERRAMENTAS",
  },
  {
    id: "rolador",
    tag: "02 // RPG DE MESA",
    title: "Rolador",
    tagline: "Rolador de dados para doze sistemas de RPG de mesa",
    description:
      "Um rolador para doze sistemas: D&D e Tormenta, Fate, Vampiro V5, Storyteller, Cthulhu, Shadowrun, Savage Worlds, Blades, Daggerheart, GURPS e mais. Cada um aplica as regras certas, como vantagem, dados de Fome e explosão, e a notação livre aceita 4d6kh3 ou 8d10>=7. O histórico fica só no seu navegador.",
    techStack: ["React", "TypeScript", "Vite", "WebAudio"],
    gradient: "from-fuchsia-500 via-red-600 to-indigo-900",
    accentColor: "#ff004d",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/40",
    vercelUrl: "https://rolador.javaijafoi.dev",
    githubUrl: "https://github.com/javaijafoi/rolador",
    icon: "🎲",
    rating: "12 SISTEMAS",
  },
  {
    id: "matusalem",
    tag: "03 // FICÇÃO INTERATIVA",
    title: "Matusalém",
    tagline: "Uma história interativa de mistério no Bixiga",
    description:
      "Um bilhete chama você ao porão de um restaurante no Bixiga, às onze da noite. A partir daí, cada escolha muda a investigação. É ficção interativa em texto, com relógio correndo até o sol nascer, fome, sinal de celular e um caderno de pistas. Os capítulos 1 e 2 de 4 já estão jogáveis.",
    techStack: ["ink", "inkjs", "JavaScript"],
    gradient: "from-fuchsia-500 via-purple-600 to-slate-900",
    accentColor: "#d946ef",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    vercelUrl: "https://matusalem.javaijafoi.dev",
    icon: "⏳",
    rating: "NOIR NO BIXIGA",
  },
  {
    id: "pico-poetry",
    tag: "04 // POESIA",
    title: "Pico Poetry",
    tagline: "98 poemas autorais, com cartões para compartilhar",
    description:
      "98 poemas autorais num site em estilo PICO-8. Abre num poema sorteado, tem índice com busca e transforma qualquer poema numa imagem pixelada com o endereço do site embaixo. Dá para trocar as cores do cartão antes de enviar. Sem cadastro e sem rastreamento.",
    techStack: ["HTML", "CSS", "JavaScript", "Canvas"],
    gradient: "from-pink-400 via-fuchsia-500 to-indigo-900",
    accentColor: "#ff77a8",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    vercelUrl: "https://poesia.javaijafoi.dev",
    githubUrl: "https://github.com/javaijafoi/pico-poetry",
    icon: "🍬",
    rating: "98 POEMAS",
  },
  {
    id: "arena-de-arton",
    tag: "05 // RPG TÁTICO",
    title: "Arena de Arton",
    tagline: "Simulador de combate tático por turnos de Tormenta 20",
    description:
      "Monte um grupo de até quatro heróis e suba uma escada de dez batalhas, do 1º ao 14º nível, numa grade de 16 por 12 quadrados. Tem magias até o 4º círculo, manobras, voo, flanco e inimigos controlados por IA, ou você joga com os dois lados. Roda no navegador, sem cadastro. Homenagem de fã, grátis e sem vínculo oficial com a Jambô.",
    techStack: ["JavaScript", "HTML/CSS", "Motor de regras", "IA de combate"],
    gradient: "from-amber-400 via-red-600 to-indigo-900",
    accentColor: "#f5c542",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    vercelUrl: "https://arena.javaijafoi.dev",
    githubUrl: "https://github.com/javaijafoi/arena-de-arton",
    icon: "⚔️",
    rating: "TÁTICO POR TURNOS",
  },
  {
    id: "pinta-kara",
    tag: "06 // VISÃO COMPUTACIONAL",
    title: "Pinta-Kara",
    tagline: "Desenhe no ar com as mãos, usando só a webcam",
    description:
      "A câmera acompanha as duas mãos em tempo real: junte polegar e indicador para desenhar e aperte os botões de cor sem tocar no mouse. A visão computacional roda inteira no navegador, então nenhuma imagem da câmera sai do seu computador.",
    techStack: ["JavaScript", "MediaPipe", "Canvas", "Vite"],
    gradient: "from-emerald-400 via-teal-600 to-slate-900",
    accentColor: "#00ff88",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    vercelUrl: "https://pintakara.javaijafoi.dev",
    githubUrl: "https://github.com/javaijafoi/pinta-kara",
    icon: "✋",
    rating: "SÓ COM A WEBCAM",
  },
  {
    id: "era-vargas",
    tag: "07 // EDUCAÇÃO",
    title: "Era Vargas: O Equilibrista",
    tagline: "Um jogo 3D de decisões sobre o Brasil de 1930 a 1945",
    description:
      "Doze decisões da Era Vargas num palco 3D do Palácio do Catete. Cada escolha mexe com Exército, Povo, Elite e Controle; se algum pilar zerar ou estourar, vem o golpe. Cenário low poly feito todo em código, com narração gerada por voz sintética. Homenagem independente às aulas do Se Liga, sem vínculo oficial.",
    techStack: ["React", "Three.js", "React Three Fiber", "TTS"],
    gradient: "from-yellow-400 via-orange-500 to-purple-800",
    accentColor: "#ffd000",
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    vercelUrl: "https://equilibrista.javaijafoi.dev",
    githubUrl: "https://github.com/javaijafoi/era-vargas-seliga",
    icon: "🎭",
    rating: "JOGO 3D",
  },
  {
    id: "picotron-arena",
    tag: "08 // ARCADE",
    title: "Picotron Arena",
    tagline: "Dez modos de arcade dentro de um computador de fantasia",
    description:
      "Uma estação de trabalho retrô inspirada no Picotron, num único arquivo HTML. São dez cartuchos de ação, do Liquidificador Cósmico ao Dominó de Pólvora, e um modo que junta todos ao mesmo tempo. Funciona no PC e no celular, com tela cheia e botões de toque, e guarda o progresso no próprio navegador.",
    techStack: ["JavaScript", "Canvas", "HTML único", "localStorage"],
    gradient: "from-cyan-400 via-blue-600 to-indigo-900",
    accentColor: "#00f0ff",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    vercelUrl: "https://picotron.javaijafoi.dev",
    githubUrl: "https://github.com/javaijafoi/picotron-arcade",
    icon: "🕹️",
    rating: "10 MODOS DE JOGO",
  },
  {
    id: "jogo-davi",
    tag: "09 // ALFABETIZAÇÃO",
    title: "Jogo do Davi",
    tagline: "Alfabetização pelo método fônico, em atividades curtas",
    description:
      "Atividades curtas de alfabetização pelo método fônico, das vogais às primeiras palavras, mais uma trilha de números. Uma tarefa por tela, nenhuma punição pelo erro e uma dica quando a criança empaca. O que ela erra volta com mais frequência nas sessões seguintes, para fixar no ritmo de cada um.",
    techStack: ["React", "TypeScript", "Vite", "Repetição espaçada"],
    gradient: "from-amber-400 via-orange-500 to-pink-600",
    accentColor: "#ffde59",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    vercelUrl: "https://jogodavi.javaijafoi.dev",
    githubUrl: "https://github.com/javaijafoi/Jogo-davi",
    icon: "🌴",
    rating: "ALFABETIZAÇÃO",
  },
  {
    id: "antigravitus",
    tag: "10 // IA E RPG DE TEXTO",
    title: "Antigravitus",
    tagline: "Crônicas de um RPG de texto jogado por agentes de IA",
    description:
      "Um herói vive no Devil's Bob MUD, um RPG de texto online que ainda roda desde os anos 90. Agentes de IA jogam com ele em rotinas supervisionadas e transformam cada sessão em crônica, com ficha, mapa e diário publicados num site. Nada é inventado: cada capítulo sai do que o jogo realmente mostrou.",
    techStack: ["Python", "Agentes de IA", "HTML/CSS/JS", "MUD"],
    gradient: "from-pink-500 via-purple-600 to-indigo-800",
    accentColor: "#ff2a85",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    vercelUrl: "https://antigravitus.javaijafoi.dev",
    githubUrl: "https://github.com/javaijafoi/antigravitus",
    icon: "⚡",
    rating: "AGENTES DE IA",
  },
  {
    id: "ihunt-chronicle",
    tag: "11 // MESA VIRTUAL",
    title: "#iHunt Chronicle",
    tagline: "Uma mesa virtual completa para o RPG #iHunt, feita por fã",
    description:
      "Uma mesa online para jogar #iHunt (sistema Fate) em grupo: o mestre cria a crônica e os jogadores entram por código de convite. Cenas com tokens e NPCs, chat e dados em tempo real, criador de caçadores e de monstros, codex de regras e ferramentas de segurança para a mesa. Funciona no PC e no celular. Projeto de fã, sem vínculo oficial.",
    techStack: ["React", "TypeScript", "Firebase", "Tempo real"],
    gradient: "from-red-600 via-rose-800 to-zinc-950",
    accentColor: "#ef4444",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/40",
    vercelUrl: "https://ihunt.javaijafoi.dev",
    icon: "🩸",
    rating: "TEMPO REAL",
  },
];
