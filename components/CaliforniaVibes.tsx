"use client";

import React, { useState, useEffect } from "react";
import { CALIFORNIA_PROJECTS, ProjectCard } from "@/data/projects";
import { EXTRA_PROJECTS, GITHUB_URL } from "@/lib/site";
import { sound } from "@/lib/sound";
import { GithubIcon } from "./Icons";
import {
  Volume2,
  VolumeX,
  ExternalLink,
  Play,
  Shuffle,
  Terminal,
  Sparkles,
  Disc,
  Monitor,
  FolderOpen,
  ArrowUpRight,
  Dices,
} from "lucide-react";

type OSThemeId = "picotron" | "arcana" | "sunset" | "mainframe" | "win95";

interface OSThemeMeta {
  id: OSThemeId;
  shortName: string;
  fullName: string;
  badge: string;
  icon: string;
  accent: string;
}

const OS_THEMES: OSThemeMeta[] = [
  {
    id: "picotron",
    shortName: "1. JAVAI-64",
    fullName: "JAVAI-64 // Picotron Fantasy Workstation",
    badge: "PICO-8 / 16-COLOR",
    icon: "🍓",
    accent: "bg-[#ff004d] text-[#fff1e8] border-black",
  },
  {
    id: "arcana",
    shortName: "2. ARCANA OS",
    fullName: "ARCANA OS // Codex & Grimoire Desktop",
    badge: "RPG / GRIMOIRE",
    icon: "⚜️",
    accent: "bg-[#8c6728] text-[#fff5df] border-[#f5c542]",
  },
  {
    id: "sunset",
    shortName: "3. SUNSET '88",
    fullName: "SUNSET-OS '88 // Outrun Amiga Workbench",
    badge: "SYNTHWAVE DECK",
    icon: "🌴",
    accent: "bg-gradient-to-r from-[#ff2a85] to-[#00f0ff] text-black border-white",
  },
  {
    id: "mainframe",
    shortName: "4. TEMPLE-CRT",
    fullName: "TEMPLE-CYBER // CRT Phosphor Mainframe",
    badge: "BIOS / TERMINAL",
    icon: "📟",
    accent: "bg-[#ffb000] text-black border-[#ffb000]",
  },
  {
    id: "win95",
    shortName: "5. WIN-95",
    fullName: "WIN-95 FANTASY // Pixel Guild Explorer",
    badge: "95 WORKSTATION",
    icon: "🪟",
    accent: "bg-[#008080] text-white border-white",
  },
];

const FILE_EXTENSIONS: Record<string, string> = {
  "pico-multitool": "multitool.p8",
  rolador: "rolador.p8",
  matusalem: "matusalem.ink",
  "pico-poetry": "poesia.p8",
  "arena-de-arton": "arton_t20.exe",
  "pinta-kara": "pintakara.wasm",
  "era-vargas": "equilibrista.3d",
  "picotron-arena": "picotron.pod",
  "jogo-davi": "jogodavi.app",
  antigravitus: "antigravitus.py",
  "ihunt-chronicle": "ihunt_vtt.app",
};

export default function CaliforniaVibes() {
  const [activeOS, setActiveOS] = useState<OSThemeId>("picotron");
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(CALIFORNIA_PROJECTS[0].id);
  const [soundOn, setSoundOn] = useState(true);
  const [crtColor, setCrtColor] = useState<"#ffb000" | "#00ff66" | "#00f0ff" | "#ff2a85">("#ffb000");
  const [d20Roll, setD20Roll] = useState<number>(20);
  const [clockText, setClockText] = useState<string>("12:00");
  const [termInput, setTermInput] = useState<string>("");
  const [termOutput, setTermOutput] = useState<string>(
    'READY. Digite "help", "list", "random" ou clique em um cartucho.'
  );

  // Randomize OS on initial client mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * OS_THEMES.length);
    setActiveOS(OS_THEMES[randomIndex].id);
    setMounted(true);

    const updateClock = () => {
      const now = new Date();
      setClockText(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  const selectedProject: ProjectCard =
    CALIFORNIA_PROJECTS.find((p) => p.id === selectedId) || CALIFORNIA_PROJECTS[0];

  const selectedExt = FILE_EXTENSIONS[selectedProject.id] || `${selectedProject.id}.app`;

  const handleSelectProject = (id: string, idx: number) => {
    const freqs = [329.63, 392.0, 440.0, 523.25, 587.33];
    sound.playSynthNote(freqs[idx % freqs.length]);
    setSelectedId(id);
    const proj = CALIFORNIA_PROJECTS.find((p) => p.id === id);
    if (proj) {
      setTermOutput(`LOADED "${FILE_EXTENSIONS[id] || id}" — ${proj.tagline}`);
    }
  };

  const handleLaunch = (url: string) => {
    sound.playLaunchChord();
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 180);
  };

  const switchOS = (id: OSThemeId) => {
    sound.playSynthNote(493.88);
    setActiveOS(id);
  };

  const randomizeOS = () => {
    sound.playLaunchChord();
    const others = OS_THEMES.filter((t) => t.id !== activeOS);
    const pick = others[Math.floor(Math.random() * others.length)];
    setActiveOS(pick.id);
    // Also roll a random project or d20 for fun
    setD20Roll(Math.floor(Math.random() * 20) + 1);
  };

  const rollD20 = () => {
    sound.playSynthNote(587.33);
    const roll = Math.floor(Math.random() * 20) + 1;
    setD20Roll(roll);
    // Pick a random project on roll
    const randomProj =
      CALIFORNIA_PROJECTS[Math.floor(Math.random() * CALIFORNIA_PROJECTS.length)];
    setSelectedId(randomProj.id);
  };

  const toggleSound = () => {
    const newState = sound.toggleMute();
    setSoundOn(newState);
  };

  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = termInput.trim().toLowerCase();
    setTermInput("");
    sound.playSynthNote(440);

    if (!cmd) return;
    if (cmd === "help") {
      setTermOutput(
        "COMANDOS: list | run | github | random | arcana | sunset | crt | win95 | pico"
      );
    } else if (cmd === "list" || cmd === "ls") {
      setTermOutput(
        CALIFORNIA_PROJECTS.map((p) => FILE_EXTENSIONS[p.id] || p.id).join("  ")
      );
    } else if (cmd === "run" || cmd === "play") {
      setTermOutput(`EXECUTANDO ${selectedProject.vercelUrl}...`);
      handleLaunch(selectedProject.vercelUrl);
    } else if (cmd === "github" || cmd === "git") {
      handleLaunch(selectedProject.githubUrl || GITHUB_URL);
    } else if (cmd === "random") {
      randomizeOS();
    } else if (cmd.includes("pico")) {
      setActiveOS("picotron");
    } else if (cmd.includes("arcana") || cmd.includes("rpg")) {
      setActiveOS("arcana");
    } else if (cmd.includes("sunset") || cmd.includes("88")) {
      setActiveOS("sunset");
    } else if (cmd.includes("crt") || cmd.includes("temple")) {
      setActiveOS("mainframe");
    } else if (cmd.includes("win") || cmd.includes("95")) {
      setActiveOS("win95");
    } else {
      const found = CALIFORNIA_PROJECTS.find(
        (p) =>
          p.id.includes(cmd) ||
          p.title.toLowerCase().includes(cmd)
      );
      if (found) {
        setSelectedId(found.id);
        setTermOutput(`SELECIONADO: ${found.title} — digite "run" para abrir.`);
      } else {
        setTermOutput(`?SYNTAX ERROR: "${cmd}". Digite "help".`);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#090612] text-slate-100 relative overflow-x-hidden">
      {/* UNIVERSAL FANTASY OS SWITCHER BAR (Top Hardware KVM Switch) */}
      <div className="sticky top-0 z-50 bg-[#0b0816]/95 backdrop-blur-md border-b border-white/15 px-3 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: OS Label & Random Boot Indicator */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-xs font-mono font-bold text-yellow-300">
              <Monitor className="w-3.5 h-3.5 text-pink-400" />
              <span>FANTASY-OS KVM</span>
            </span>
            <button
              onClick={randomizeOS}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-mono font-bold shadow-sm transition-all cursor-pointer active:scale-95"
              title="Sortear outro Fantasy OS"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>RANDOM OS</span>
            </button>
          </div>

          {/* Center: 5 OS Selector Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {OS_THEMES.map((theme) => {
              const isActive = mounted && activeOS === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => switchOS(theme.id)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isActive
                      ? `${theme.accent} scale-105 shadow-[0_0_15px_rgba(255,255,255,0.2)]`
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
                  }`}
                >
                  <span>{theme.icon}</span>
                  <span>{theme.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Sound & Direct Links */}
          <div className="flex items-center gap-2">
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-cyan-300 transition-colors"
              title="Documentação estruturada para IAs e LLMs"
            >
              /llms.txt
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playSynthNote(440)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden sm:inline">@javaijafoi</span>
            </a>
            <button
              onClick={toggleSound}
              className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 cursor-pointer"
              title={soundOn ? "Mutar Synth Audio" : "Ativar Synth Audio"}
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-yellow-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-red-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* OS 1: JAVAI-64 // PICOTRON WORKSTATION (PICO-8 / 16-COLOR FANTASY OS) */}
      {/* ===================================================================== */}
      {activeOS === "picotron" && (
        <div
          className="flex-1 flex flex-col justify-between bg-[#1d2b53] text-[#fff1e8] font-mono relative select-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(41, 173, 255, 0.18) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          <div className="os-scanlines absolute inset-0 pointer-events-none z-20" />

          {/* Picotron Top Menu Bar */}
          <header className="relative z-10 bg-[#ff004d] text-[#fff1e8] border-b-4 border-black px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
            <div className="flex items-center gap-3">
              <span className="bg-black text-[#ffec27] px-2 py-0.5 border border-[#ffec27]">
                🍓 JAVAI-64 WORKSTATION v0.8
              </span>
              <span className="hidden sm:inline text-[#fff1e8]">
                PETER // @JAVAIJAFOI
              </span>
              <span className="hidden md:inline bg-[#7e2553] px-2 py-0.5 border border-black">
                DRIVE://CARTS ({CALIFORNIA_PROJECTS.length})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#ffec27]">CPU: 60FPS</span>
              <span className="hidden sm:inline">MEM: 64KB</span>
              <span className="bg-black text-[#00e436] px-2 py-0.5">{clockText}</span>
            </div>
          </header>

          {/* Main Picotron Desktop */}
          <main className="relative z-10 max-w-7xl w-full mx-auto p-4 md:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Window: Cartridge Explorer (All 11 Projects + Extras) */}
            <div className="lg:col-span-7 bg-[#000000]/80 border-4 border-black pico-shadow flex flex-col">
              <div className="bg-[#7e2553] text-[#fff1e8] px-3 py-1.5 border-b-4 border-black flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <Disc className="w-4 h-4 text-[#ffec27]" />
                  <span>CARTRIDGE_EXPLORER.POD // 11 PROJETOS NO AR</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#ffec27] border border-black inline-block" />
                  <span className="w-3 h-3 bg-[#00e436] border border-black inline-block" />
                  <span className="w-3 h-3 bg-[#ff004d] border border-black inline-block" />
                </div>
              </div>

              <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {CALIFORNIA_PROJECTS.map((proj, idx) => {
                  const isSelected = proj.id === selectedId;
                  const ext = FILE_EXTENSIONS[proj.id] || `${proj.id}.p8`;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => handleSelectProject(proj.id, idx)}
                      className={`cursor-pointer p-3 border-2 transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#7e2553] border-[#ffec27] -translate-y-1 pico-shadow"
                          : "bg-[#1d2b53] border-black hover:border-[#29adff] pico-shadow-sm"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="text-xl">{proj.icon}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-black text-[#00e436] border border-[#00e436]/40">
                            {ext}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-[#fff1e8] leading-snug">
                          {proj.title}
                        </h3>
                        <p className="text-[11px] text-[#29adff] mt-1 line-clamp-2">
                          {proj.tagline}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-black/60 flex items-center justify-between">
                        <span className="text-[10px] text-[#ffec27] font-bold">
                          #{String(idx + 1).padStart(2, "0")}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLaunch(proj.vercelUrl);
                          }}
                          className="px-2 py-0.5 bg-[#00e436] hover:bg-[#ffec27] text-black font-bold text-[10px] border border-black cursor-pointer"
                        >
                          ▶ BOOT
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Extra Repos Strip inside Explorer */}
              <div className="bg-[#121a33] border-t-2 border-black px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[#ff77a8] font-bold">EXTRA_CARTS://</span>
                <div className="flex flex-wrap gap-2">
                  {EXTRA_PROJECTS.map((ep) => (
                    <a
                      key={ep.name}
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 bg-black text-[#29adff] hover:text-[#ffec27] border border-[#29adff]/50 text-xs"
                    >
                      💾 {ep.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Cartridge Inspector + Interactive Terminal */}
            <div className="lg:col-span-5 space-y-5">
              {/* Cartridge Inspector Window */}
              <div className="bg-[#c2c3c7] text-black border-4 border-black pico-shadow">
                <div className="bg-[#ff004d] text-[#fff1e8] px-3 py-1.5 border-b-4 border-black flex items-center justify-between text-xs font-bold">
                  <span>INSPECTOR // {selectedExt.toUpperCase()}</span>
                  <span className="bg-black text-[#ffec27] px-1.5">READY</span>
                </div>

                <div className="p-3">
                  <div className="bg-[#1d2b53] text-[#fff1e8] border-4 border-black p-4 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="inline-block bg-[#29adff] text-black font-bold text-[10px] px-2 py-0.5 border border-black">
                          {selectedProject.tag}
                        </span>
                        <h1 className="text-2xl font-bold text-[#ffec27] mt-2 flex items-center gap-2">
                          <span>{selectedProject.icon}</span>
                          <span>{selectedProject.title}</span>
                        </h1>
                      </div>
                      <span className="bg-black text-[#00e436] text-[10px] font-bold px-2 py-1 border border-[#00e436]">
                        {selectedProject.rating}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-[#ff77a8]">
                      {selectedProject.tagline}
                    </p>

                    <p className="text-xs text-[#fff1e8]/90 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] bg-black text-[#29adff] px-2 py-0.5 border border-[#29adff]/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => handleLaunch(selectedProject.vercelUrl)}
                        className="flex-1 py-2.5 px-4 bg-[#00e436] hover:bg-[#ffec27] text-black font-bold text-xs border-2 border-black pico-shadow cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>RUN CARTRIDGE (ABRIR APP)</span>
                      </button>
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 bg-[#ff004d] hover:bg-[#ff77a8] text-white font-bold text-xs border-2 border-black pico-shadow flex items-center gap-1"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>CODE</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive PICO-8 Command Prompt */}
              <div className="bg-black text-[#00e436] border-4 border-[#5f574f] pico-shadow p-3 text-xs space-y-2">
                <div className="flex items-center justify-between text-[#ffec27] border-b border-[#5f574f] pb-1">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>JAVAI-SH // INTERACTIVE SHELL</span>
                  </span>
                  <span className="text-[10px] text-[#c2c3c7]">TRY: help, list, run, random</span>
                </div>
                <div className="text-[#fff1e8] font-mono text-xs py-1">
                  &gt; {termOutput}
                </div>
                <form onSubmit={handleTerminalCommand} className="flex items-center gap-2">
                  <span className="text-[#ff004d] font-bold">JAVAI-64&gt;</span>
                  <input
                    type="text"
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    placeholder='Digite "help" ou "run"...'
                    className="flex-1 bg-transparent text-[#00e436] focus:outline-none font-mono text-xs"
                  />
                  <button
                    type="submit"
                    className="px-2 py-0.5 bg-[#1d2b53] text-[#ffec27] border border-[#29adff] text-[10px] font-bold cursor-pointer"
                  >
                    EXEC
                  </button>
                </form>
              </div>
            </div>
          </main>

          {/* Picotron Bottom Status Bar */}
          <footer className="relative z-10 bg-black text-[#c2c3c7] border-t-4 border-[#5f574f] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
            <span>🍓 JAVAI-64 FANTASY OS • PETER (@javaijafoi) • SÃO PAULO, BR</span>
            <div className="flex items-center gap-4">
              <a href="/llms.txt" className="text-[#ffec27] hover:underline">
                README_LLMS.TXT
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#29adff] hover:underline"
              >
                GITHUB://JAVAIJAFOI
              </a>
            </div>
          </footer>
        </div>
      )}

      {/* ===================================================================== */}
      {/* OS 2: ARCANA OS // GRIMOIRE & TABLETOP RPG DESKTOP                    */}
      {/* ===================================================================== */}
      {activeOS === "arcana" && (
        <div
          className="flex-1 flex flex-col justify-between bg-[#100b08] text-[#e8d8b9] font-serif relative"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 20%, rgba(140, 103, 40, 0.25) 0%, rgba(16, 11, 8, 0.95) 70%)",
          }}
        >
          {/* Ornate RPG Top HUD */}
          <header className="bg-[#18110c] border-b-2 border-[#b48a3e] px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚜️</span>
              <div>
                <span className="font-bold text-sm md:text-base text-[#f5c542] tracking-wider block">
                  ARCANA OS // GRIMÓRIO DE JAVAI
                </span>
                <span className="text-[11px] text-[#b5a282]">
                  Peter (@javaijafoi) — Nível 99 Technomancer • Guilda de São Paulo
                </span>
              </div>
            </div>

            {/* RPG Stats & Live D20 Roller */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="px-2.5 py-1 bg-[#261710] border border-red-800/60 text-red-300 rounded">
                ♥ HP 120/120
              </span>
              <span className="px-2.5 py-1 bg-[#111e29] border border-sky-700/60 text-sky-300 rounded">
                ✦ MANA {CALIFORNIA_PROJECTS.length}/{CALIFORNIA_PROJECTS.length}
              </span>
              <button
                onClick={rollD20}
                className="px-3 py-1 bg-[#2c1f14] hover:bg-[#3f2c1c] border-2 border-[#f5c542] text-[#f5c542] font-bold rounded flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95"
                title="Rolar 1d20 e sortear um Tomo"
              >
                <Dices className="w-4 h-4" />
                <span>
                  1d20: {d20Roll} {d20Roll === 20 ? "(CRÍTICO!)" : ""}
                </span>
              </button>
            </div>
          </header>

          {/* Main Grimoire Workspace */}
          <main className="max-w-7xl w-full mx-auto p-4 md:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Tomes Inventory Grid */}
            <div className="lg:col-span-7 bg-[#17110b]/95 border-2 border-[#8c6728] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between border-b border-[#8c6728]/60 pb-2.5 mb-4">
                <span className="text-sm font-bold text-[#f5c542] uppercase tracking-widest">
                  📜 Inventário de Tomos & Artefatos ({CALIFORNIA_PROJECTS.length})
                </span>
                <span className="text-xs font-mono text-[#b5a282]">
                  Selecione um artefato para inspecionar
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CALIFORNIA_PROJECTS.map((proj, idx) => {
                  const isSelected = proj.id === selectedId;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => handleSelectProject(proj.id, idx)}
                      className={`cursor-pointer p-3.5 border-2 transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#312113] border-[#f5c542] shadow-[0_0_20px_rgba(245,197,66,0.25)]"
                          : "bg-[#120d09] border-[#4a3720] hover:border-[#8c6728]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono uppercase tracking-wider text-[#f5c542]">
                            Tomo #{idx + 1} • {proj.rating}
                          </span>
                          <span className="text-xl">{proj.icon}</span>
                        </div>
                        <h3 className="text-base font-bold text-[#fff3d1] mt-1">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-[#c8b28b] italic mt-1 line-clamp-2">
                          &ldquo;{proj.tagline}&rdquo;
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#4a3720]/60 flex items-center justify-between text-xs">
                        <span className="font-mono text-[10px] text-[#9e8c70]">
                          {proj.techStack.slice(0, 2).join(" • ")}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLaunch(proj.vercelUrl);
                          }}
                          className="px-2.5 py-0.5 bg-[#8c6728] hover:bg-[#b88938] text-[#100b08] font-bold text-xs border border-[#f5c542] cursor-pointer"
                        >
                          ⚔ Conjurar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Spell Scroll Details */}
            <div className="lg:col-span-5 bg-[#21170f] border-2 border-[#d4a94e] p-6 shadow-[inset_0_0_35px_rgba(0,0,0,0.85)] space-y-5 lg:sticky lg:top-16">
              <div className="flex items-center justify-between border-b-2 border-[#8c6728] pb-3">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#f5c542]">
                    ARTEFATO EQUIPADO // {selectedProject.tag}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#fff6e0] mt-1">
                    {selectedProject.icon} {selectedProject.title}
                  </h1>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-[#f5c542] bg-[#120d09] flex items-center justify-center text-2xl shrink-0">
                  {selectedProject.icon}
                </div>
              </div>

              <blockquote className="text-sm text-[#f5c542] italic border-l-2 border-[#f5c542] pl-3">
                &ldquo;{selectedProject.tagline}&rdquo;
              </blockquote>

              <p className="text-sm text-[#e5d5b5] leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-[#8c6728]/60">
                <span className="text-xs uppercase tracking-wider text-[#b5a282] block">
                  Runas de Conjuração (Tech Stack):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-mono px-2.5 py-1 bg-[#120d09] border border-[#8c6728] text-[#f5c542]"
                    >
                      ✦ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  onClick={() => handleLaunch(selectedProject.vercelUrl)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-[#8c6728] via-[#cfa046] to-[#8c6728] hover:brightness-110 text-[#110d0a] font-bold text-xs uppercase tracking-widest border border-[#fff3d1] cursor-pointer shadow-lg"
                >
                  ⚔ CONJURAR PORTAL (ABRIR DEMO)
                </button>
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-[#120d09] hover:bg-[#1b140e] text-[#f5c542] border border-[#8c6728] text-xs font-bold uppercase tracking-wider"
                  >
                    Códice GitHub
                  </a>
                )}
              </div>

              {/* Extra Relics */}
              <div className="pt-3 border-t border-[#8c6728]/40 text-xs text-[#b5a282] flex flex-wrap items-center justify-between gap-2">
                <span>Relíquias Extras:</span>
                <div className="flex gap-3">
                  {EXTRA_PROJECTS.map((ep) => (
                    <a
                      key={ep.name}
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#f5c542] hover:underline"
                    >
                      ⚜ {ep.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </main>

          <footer className="bg-[#140e0a] border-t border-[#8c6728] px-6 py-3 text-xs text-[#a89576] flex flex-wrap items-center justify-between gap-2">
            <span>⚜ ARCANA OS • CRÔNICAS DE PETER (@javaijafoi) • SÃO PAULO</span>
            <div className="flex gap-4">
              <a href="/llms.txt" className="text-[#f5c542] hover:underline">
                Pergaminho dos Oráculos (/llms.txt)
              </a>
              <a href={GITHUB_URL} className="text-[#e8d8b9] hover:underline">
                Biblioteca no GitHub
              </a>
            </div>
          </footer>
        </div>
      )}

      {/* ===================================================================== */}
      {/* OS 3: SUNSET-OS '88 // OUTRUN AMIGA WORKBENCH & CASSETTE DECK         */}
      {/* ===================================================================== */}
      {activeOS === "sunset" && (
        <div className="flex-1 flex flex-col justify-between california-bg synth-horizon text-slate-100 relative overflow-hidden">
          {/* 80s California Sun Wallpaper */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-65">
            <div className="w-72 h-72 rounded-full bg-gradient-to-t from-pink-500 via-orange-500 to-yellow-300 shadow-[0_0_80px_rgba(255,42,133,0.5)] flex flex-col justify-end overflow-hidden">
              <div className="w-full h-3 bg-[#170936] mb-2" />
              <div className="w-full h-2.5 bg-[#170936] mb-2" />
              <div className="w-full h-2 bg-[#170936] mb-2" />
              <div className="w-full h-1.5 bg-[#170936] mb-2" />
            </div>
          </div>

          {/* Amiga Workbench Neon Top Bar */}
          <header className="relative z-10 bg-[#140726]/90 backdrop-blur-md border-b border-pink-500/40 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-retro font-bold tracking-wider">
                🌴 SUNSET-OS &apos;88 WORKBENCH
              </span>
              <span className="text-pink-300 font-mono">
                PETER // @javaijafoi • CALIFORNIA ARCADE DECK
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-cyan-300">
              <span>FM STEREO 88.5 MHz</span>
              <span>•</span>
              <span className="text-yellow-300">{clockText}</span>
            </div>
          </header>

          {/* Workbench Windows Area */}
          <main className="relative z-10 max-w-7xl w-full mx-auto p-4 md:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Cassette Tape Rack Window */}
            <div className="lg:col-span-7 glass-card rounded-2xl border border-cyan-400/40 overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.18)]">
              <div className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-retro px-4 py-2 text-xs flex items-center justify-between">
                <span>📼 CASSETTE_DECK.DRV // SELECIONE UMA FITA ({CALIFORNIA_PROJECTS.length})</span>
                <span className="font-mono font-bold">[ _ ][ □ ][ X ]</span>
              </div>

              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CALIFORNIA_PROJECTS.map((proj, idx) => {
                  const isSelected = proj.id === selectedId;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => handleSelectProject(proj.id, idx)}
                      className={`cursor-pointer rounded-xl p-3.5 border transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-pink-500/25 border-pink-400 shadow-[0_0_20px_rgba(255,42,133,0.45)] scale-[1.01]"
                          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-400/50"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-mono text-[10px] text-cyan-300">
                            {proj.tag}
                          </span>
                          <span className="text-xl">{proj.icon}</span>
                        </div>
                        <h3 className="font-retro text-lg text-white">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-pink-200/90 mt-1 line-clamp-2">
                          {proj.tagline}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[10px] font-retro px-2 py-0.5 rounded-full border border-white/20 text-yellow-300">
                          {proj.rating}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLaunch(proj.vercelUrl);
                          }}
                          className="px-3 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-retro text-[11px] cursor-pointer hover:brightness-110"
                        >
                          ▶ PLAY
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Hi-Fi Player Window */}
            <div className="lg:col-span-5 glass-card rounded-2xl border-2 border-pink-500 overflow-hidden shadow-[0_0_35px_rgba(255,42,133,0.3)] lg:sticky lg:top-16">
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-black font-retro px-4 py-2 text-xs flex items-center justify-between">
                <span>NOW PLAYING // {selectedProject.title.toUpperCase()}</span>
                <span className="font-mono font-bold">HI-FI STEREO</span>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-300">
                    {selectedProject.tag}
                  </span>
                  <span className="text-3xl">{selectedProject.icon}</span>
                </div>

                <h1 className="font-retro text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-yellow-200 to-cyan-300">
                  {selectedProject.title}
                </h1>

                <p className="text-sm font-medium text-cyan-300">
                  {selectedProject.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-pink-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-3">
                  <button
                    onClick={() => handleLaunch(selectedProject.vercelUrl)}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-retro text-xs tracking-wider shadow-[0_0_20px_rgba(255,42,133,0.5)] cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>ABRIR DEMO NA VERCEL</span>
                  </button>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium flex items-center gap-1.5"
                    >
                      <GithubIcon className="w-4 h-4 text-pink-400" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 bg-[#0d041c]/90 border-t border-white/15 px-6 py-3 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
            <span>🌴 SUNSET-OS &apos;88 • PETER (@javaijafoi) • SÃO PAULO, BRASIL</span>
            <div className="flex gap-4">
              <a href="/llms.txt" className="hover:text-yellow-300">
                /llms.txt
              </a>
              <a href={GITHUB_URL} className="hover:text-pink-400">
                GitHub (@javaijafoi)
              </a>
            </div>
          </footer>
        </div>
      )}

      {/* ===================================================================== */}
      {/* OS 4: TEMPLE-CYBER // CRT PHOSPHOR MAINFRAME                          */}
      {/* ===================================================================== */}
      {activeOS === "mainframe" && (
        <div
          className="flex-1 flex flex-col justify-between bg-[#060706] font-mono p-3 md:p-5 relative"
          style={{
            color: crtColor,
            textShadow: `0 0 8px ${crtColor}55`,
          }}
        >
          <div className="os-scanlines absolute inset-0 pointer-events-none z-20" />

          {/* BIOS Top Bar */}
          <header className="relative z-10 border-2 border-current px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="font-bold">
              ╔══ JAVAI MAINFRAME BIOS v4.20 // NODE: SAO_PAULO_BR ══╗
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span>PHOSPHOR_MODE:</span>
              <button
                onClick={() => setCrtColor("#ffb000")}
                className="px-2 py-0.5 border border-current text-xs font-bold cursor-pointer"
                style={{ color: "#ffb000" }}
              >
                [AMBER]
              </button>
              <button
                onClick={() => setCrtColor("#00ff66")}
                className="px-2 py-0.5 border border-current text-xs font-bold cursor-pointer"
                style={{ color: "#00ff66" }}
              >
                [MATRIX]
              </button>
              <button
                onClick={() => setCrtColor("#00f0ff")}
                className="px-2 py-0.5 border border-current text-xs font-bold cursor-pointer"
                style={{ color: "#00f0ff" }}
              >
                [CYAN]
              </button>
              <button
                onClick={() => setCrtColor("#ff2a85")}
                className="px-2 py-0.5 border border-current text-xs font-bold cursor-pointer"
                style={{ color: "#ff2a85" }}
              >
                [CYBER]
              </button>
            </div>
          </header>

          {/* Tiling Window Panes */}
          <main className="relative z-10 max-w-7xl w-full mx-auto my-4 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Directory Tree Pane */}
            <div className="lg:col-span-5 border-2 border-current p-3 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold border-b border-current pb-1.5 mb-2 flex justify-between">
                  <span>DIR C:\JAVAI\BIN\*.*</span>
                  <span>{CALIFORNIA_PROJECTS.length} FILES</span>
                </div>
                <div className="space-y-1">
                  {CALIFORNIA_PROJECTS.map((proj, idx) => {
                    const isSelected = proj.id === selectedId;
                    const ext = FILE_EXTENSIONS[proj.id] || `${proj.id}.bin`;
                    return (
                      <div
                        key={proj.id}
                        onClick={() => handleSelectProject(proj.id, idx)}
                        className="cursor-pointer px-2 py-1.5 text-xs flex items-center justify-between transition-colors border border-transparent hover:border-current"
                        style={
                          isSelected
                            ? {
                                backgroundColor: crtColor,
                                color: "#050505",
                                textShadow: "none",
                                fontWeight: 700,
                              }
                            : undefined
                        }
                      >
                        <span>
                          {isSelected ? "==>" : "   "} {ext.padEnd(16, " ")} — {proj.title}
                        </span>
                        <span>[EXEC]</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-current text-xs space-y-1">
                <div>SUBDIRECTORIES (EXTRA_REPOS):</div>
                <div className="flex flex-wrap gap-3">
                  {EXTRA_PROJECTS.map((ep) => (
                    <a
                      key={ep.name}
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-80"
                    >
                      &gt; {ep.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Mainframe Inspector & Command Shell */}
            <div className="lg:col-span-7 flex flex-col justify-between border-2 border-current p-4 space-y-4">
              <div className="space-y-3">
                <div className="border-b border-current pb-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span>MODULE_ID: {selectedExt.toUpperCase()}</span>
                  <span>STATUS: ONLINE // 200 OK</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold">
                  [[ {selectedProject.icon} {selectedProject.title.toUpperCase()} ]]
                </h1>

                <div className="text-xs font-bold opacity-90">
                  &gt;&gt; {selectedProject.tag} // {selectedProject.tagline}
                </div>

                <p className="text-xs sm:text-sm leading-relaxed opacity-90 border-l-2 border-current pl-3 py-1">
                  {selectedProject.description}
                </p>

                <div className="pt-2 text-xs">
                  <div className="mb-1.5 font-bold">LINKED_LIBRARIES:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((s) => (
                      <span key={s} className="px-2 py-0.5 border border-current">
                        [{s}]
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-current">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleLaunch(selectedProject.vercelUrl)}
                    className="flex-1 py-2.5 px-4 font-bold text-xs cursor-pointer border-2 border-current hover:opacity-90"
                    style={{
                      backgroundColor: crtColor,
                      color: "#050505",
                      textShadow: "none",
                    }}
                  >
                    [ENTER] EXECUTE REMOTE HOST ({selectedProject.vercelUrl})
                  </button>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 border-2 border-current text-xs font-bold hover:underline"
                    >
                      [G] SOURCE_REPO
                    </a>
                  )}
                </div>

                {/* Live Terminal Prompt */}
                <form
                  onSubmit={handleTerminalCommand}
                  className="border border-current p-2 text-xs flex items-center gap-2"
                >
                  <span>ROOT@JAVAI:~#</span>
                  <input
                    type="text"
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    placeholder='Digite "help", "list", "run" ou "random"...'
                    className="flex-1 bg-transparent focus:outline-none text-current"
                  />
                  <button type="submit" className="px-2 border border-current cursor-pointer">
                    SEND
                  </button>
                </form>
                <div className="text-xs opacity-80">STDOUT: {termOutput}</div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 border-2 border-current px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
            <span>F1:HELP | F2:/LLMS.TXT | F5:RANDOM_OS | OPERATOR: PETER (@javaijafoi)</span>
            <span>640K BASE MEMORY OK █</span>
          </footer>
        </div>
      )}

      {/* ===================================================================== */}
      {/* OS 5: WIN-95 FANTASY // PIXEL GUILD WORKSTATION                       */}
      {/* ===================================================================== */}
      {activeOS === "win95" && (
        <div className="flex-1 flex flex-col justify-between bg-[#008080] text-black font-sans select-none">
          {/* Desktop Workspace */}
          <main className="max-w-7xl w-full mx-auto p-4 md:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Desktop Shortcut Icons Grid */}
            <div className="lg:col-span-5 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-3 content-start">
              {CALIFORNIA_PROJECTS.map((proj, idx) => {
                const isSelected = proj.id === selectedId;
                return (
                  <div
                    key={proj.id}
                    onClick={() => handleSelectProject(proj.id, idx)}
                    onDoubleClick={() => handleLaunch(proj.vercelUrl)}
                    className={`cursor-pointer p-2.5 flex flex-col items-center text-center rounded transition-colors ${
                      isSelected
                        ? "bg-[#000080]/80 text-white outline-1 outline-dotted outline-yellow-300"
                        : "text-white hover:bg-white/15"
                    }`}
                  >
                    <div className="w-11 h-11 bg-[#c0c0c0] text-black win95-bevel flex items-center justify-center text-2xl mb-1.5">
                      {proj.icon}
                    </div>
                    <span className="text-xs font-medium leading-tight line-clamp-2 drop-shadow">
                      {proj.title}.exe
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Classic Win95 Program Window */}
            <div className="lg:col-span-7 bg-[#c0c0c0] p-1.5 win95-bevel space-y-1.5">
              {/* Blue Gradient Title Bar */}
              <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2.5 py-1.5 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2 truncate">
                  <span>{selectedProject.icon}</span>
                  <span className="truncate">
                    C:\Javai\Projetos\{selectedProject.title}.exe — Propriedades
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={randomizeOS}
                    className="bg-[#c0c0c0] text-black px-1.5 py-0.5 text-[11px] win95-bevel cursor-pointer"
                    title="Sortear outro OS"
                  >
                    ?
                  </button>
                  <span className="bg-[#c0c0c0] text-black px-1.5 py-0.5 text-[11px] win95-bevel">
                    _
                  </span>
                  <span className="bg-[#c0c0c0] text-black px-1.5 py-0.5 text-[11px] win95-bevel">
                    □
                  </span>
                  <span className="bg-[#c0c0c0] text-black px-1.5 py-0.5 text-[11px] win95-bevel">
                    X
                  </span>
                </div>
              </div>

              {/* Menu Strip */}
              <div className="px-2 py-1 text-xs flex flex-wrap items-center gap-4 border-b border-gray-400 text-gray-900">
                <span>
                  <u>A</u>rquivo
                </span>
                <span>
                  <u>E</u>xecutar
                </span>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <u>G</u>itHub (@javaijafoi)
                </a>
                <a href="/llms.txt" target="_blank" className="hover:underline">
                  <u>A</u>juda (llms.txt)
                </a>
              </div>

              {/* Inner Recessed White Pane */}
              <div className="bg-white p-5 win95-inset space-y-4">
                <div className="flex items-start justify-between gap-3 border-b border-gray-300 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#c0c0c0] win95-bevel flex items-center justify-center text-2xl shrink-0">
                      {selectedProject.icon}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-gray-600 block">
                        {selectedProject.tag}
                      </span>
                      <h1 className="text-xl md:text-2xl font-bold text-[#000080]">
                        {selectedProject.title}
                      </h1>
                    </div>
                  </div>
                  <span className="bg-[#ffffcc] border border-black px-2 py-0.5 text-xs font-mono">
                    {selectedProject.rating}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-gray-800">
                  {selectedProject.tagline}
                </p>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="pt-2 border-t border-gray-200">
                  <span className="text-xs font-bold text-gray-700 block mb-1.5">
                    Componentes do Sistema (Tech Stack):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-[#c0c0c0] text-black px-2.5 py-0.5 win95-bevel"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Extra Projects Groupbox */}
              <div className="p-2.5 border border-gray-500 text-xs flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold flex items-center gap-1.5">
                  <FolderOpen className="w-4 h-4 text-[#000080]" />
                  <span>C:\Javai\Outros_Repositorios:</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {EXTRA_PROJECTS.map((ep) => (
                    <a
                      key={ep.name}
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 bg-[#c0c0c0] win95-bevel font-medium hover:bg-gray-300"
                    >
                      📁 {ep.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Dialog Action Buttons */}
              <div className="px-2 py-2 flex flex-wrap justify-end gap-2">
                <button
                  onClick={() => handleLaunch(selectedProject.vercelUrl)}
                  className="px-5 py-2 bg-[#c0c0c0] hover:bg-[#d4d4d4] text-black font-bold text-xs win95-bevel cursor-pointer active:translate-y-px flex items-center gap-1.5"
                >
                  <span>▶ Executar Aplicativo (Vercel)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#c0c0c0] hover:bg-[#d4d4d4] text-black text-xs font-medium win95-bevel flex items-center gap-1.5"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Código no GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </main>

          {/* Classic Win95 Bottom Taskbar */}
          <footer className="bg-[#c0c0c0] p-1.5 win95-bevel flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={randomizeOS}
                className="px-3 py-1 bg-[#c0c0c0] font-bold text-xs win95-bevel flex items-center gap-1.5 cursor-pointer active:translate-y-px"
              >
                <span>🪟</span>
                <span>Iniciar (Random OS)</span>
              </button>
              <div className="px-3 py-1 bg-[#dfdfdf] font-bold text-xs win95-inset flex items-center gap-1.5">
                <span>{selectedProject.icon}</span>
                <span>{selectedProject.title}.exe</span>
              </div>
              <span className="hidden md:inline text-gray-700 pl-2">
                Peter (@javaijafoi) • São Paulo, Brasil
              </span>
            </div>

            <div className="px-3 py-1 win95-inset font-mono text-xs flex items-center gap-2">
              <span>{soundOn ? "🔊" : "🔇"}</span>
              <span>{clockText}</span>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
