import { ProjectCard } from "@/data/projects";

export type OSThemeId = "picotron" | "arcana" | "sunset" | "mainframe" | "win95";

export type CrtPhosphorColor = "#ffb000" | "#00ff66" | "#00f0ff" | "#ff2a85";

export interface OSThemeMeta {
  id: OSThemeId;
  shortName: string;
  desktopLabel: string;
  fullName: string;
  tagline: string;
  mobileBadge: string;
  icon: string;
  accentClasses: string;
  previewSwatch: string;
}

export const OS_THEMES: OSThemeMeta[] = [
  {
    id: "picotron",
    shortName: "JAVAI-64",
    desktopLabel: "1. JAVAI-64",
    fullName: "JAVAI-64 // Picotron Fantasy Workstation",
    tagline: "Paleta 16 cores, cartuchos .p8 e terminal JAVAI-SH",
    mobileBadge: "PIXEL 16-CORES",
    icon: "🍓",
    accentClasses: "bg-[#ff004d] text-[#fff1e8] border-black",
    previewSwatch: "bg-[#1d2b53] border-[#ffec27] text-[#fff1e8]",
  },
  {
    id: "arcana",
    shortName: "ARCANA",
    desktopLabel: "2. ARCANA",
    fullName: "ARCANA OS // Codex & Grimoire Desktop",
    tagline: "Grimório aberto, runas e rolador 1d20 vivo",
    mobileBadge: "GRIMÓRIO RPG",
    icon: "⚜️",
    accentClasses: "bg-[#8c6728] text-[#fff5df] border-[#f5c542]",
    previewSwatch: "bg-[#17110b] border-[#d4a94e] text-[#f5c542]",
  },
  {
    id: "sunset",
    shortName: "SUNSET '88",
    desktopLabel: "3. SUNSET '88",
    fullName: "SUNSET-OS '88 // Outrun Cassette Deck",
    tagline: "Walkman estéreo, fitas K7 e estética synthwave",
    mobileBadge: "CASSETTE DECK",
    icon: "🌴",
    accentClasses: "bg-gradient-to-r from-[#ff2a85] to-[#00f0ff] text-black border-white",
    previewSwatch: "bg-[#1d0936] border-[#ff2a85] text-[#00f0ff]",
  },
  {
    id: "mainframe",
    shortName: "CRT",
    desktopLabel: "4. CRT",
    fullName: "TEMPLE-CRT // DOS Phosphor Mainframe",
    tagline: "Fósforo monocromático, teclas F1–F4 e console DOS",
    mobileBadge: "DOS PHOSPHOR",
    icon: "📟",
    accentClasses: "bg-[#ffb000] text-black border-[#ffb000]",
    previewSwatch: "bg-[#060706] border-[#ffb000] text-[#ffb000]",
  },
  {
    id: "win95",
    shortName: "WIN-95",
    desktopLabel: "5. WIN-95",
    fullName: "WIN-95 FANTASY // Pixel Guild Workstation",
    tagline: "Área de trabalho .exe, janelas 3D e Menu Iniciar",
    mobileBadge: "DESKTOP 95",
    icon: "🪟",
    accentClasses: "bg-[#008080] text-white border-white",
    previewSwatch: "bg-[#008080] border-[#c0c0c0] text-white",
  },
];

export const FILE_EXTENSIONS: Record<string, string> = {
  "pico-multitool": "multitool.p8",
  rolador: "rolador.p8",
  matusalem: "matusalem.ink",
  "pico-poetry": "poesia.p8",
  "arena-de-arton": "arton_t20.exe",
  "pinta-kara": "pintakara.wasm",
  "era-vargas": "vargas.3d",
  "picotron-arena": "picotron.pod",
  "jogo-davi": "jogodavi.app",
  antigravitus: "antigrav.py",
  "ihunt-chronicle": "ihunt_vtt.app",
};

export const ASCII_TAGS: Record<string, string> = {
  "pico-multitool": "TOOL",
  rolador: "DICE",
  matusalem: "NOIR",
  "pico-poetry": "POEM",
  "arena-de-arton": "T20 ",
  "pinta-kara": "HAND",
  "era-vargas": "3D  ",
  "picotron-arena": "PICO",
  "jogo-davi": "KIDS",
  antigravitus: "MUD ",
  "ihunt-chronicle": "VTT ",
};

export interface OSProps {
  selectedProject: ProjectCard;
  selectedId: string;
  onSelectProject: (id: string, idx: number, openModalOnMobile?: boolean) => void;
  onLaunch: (url: string) => void;
  soundOn: boolean;
  onToggleSound: () => void;
  onRandomizeOS: () => void;
  onSwitchOS: (id: OSThemeId) => void;
  clockText: string;
  crtColor: CrtPhosphorColor;
  onChangeCrtColor: (color: CrtPhosphorColor) => void;
  d20Roll: number;
  onRollD20: () => void;
  termInput: string;
  onChangeTermInput: (val: string) => void;
  termOutput: string;
  onSubmitTerminal: (e: React.FormEvent) => void;
}
