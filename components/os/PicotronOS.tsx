"use client";

import React, { useState } from "react";
import { CALIFORNIA_PROJECTS } from "@/data/projects";
import { EXTRA_PROJECTS, GITHUB_URL } from "@/lib/site";
import { OSProps, FILE_EXTENSIONS } from "@/lib/os-config";
import { GithubIcon } from "@/components/Icons";
import { Disc, Play, Terminal, FolderKanban } from "lucide-react";

export default function PicotronOS({
  selectedProject,
  selectedId,
  onSelectProject,
  onLaunch,
  clockText,
  termInput,
  onChangeTermInput,
  termOutput,
  onSubmitTerminal,
}: OSProps) {
  const [windowState, setWindowState] = useState<"normal" | "expanded" | "minimized" | "closed">(
    "normal"
  );

  const selectedExt = FILE_EXTENSIONS[selectedProject.id] || `${selectedProject.id}.p8`;

  const handleCartSelect = (id: string, idx: number) => {
    if (windowState === "minimized" || windowState === "closed") {
      setWindowState("normal");
    }
    onSelectProject(id, idx, true);
  };

  return (
    <div
      className="flex-1 flex flex-col justify-between bg-[#1d2b53] text-[#fff1e8] font-mono-code relative select-none"
      style={{
        backgroundImage:
          "radial-gradient(rgba(41, 173, 255, 0.2) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      {/* Picotron Top Menu Bar */}
      <header className="relative z-10 bg-[#ff004d] text-[#fff1e8] border-b-4 border-black px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="bg-black text-[#ffec27] px-2 py-0.5 border border-[#ffec27] font-pixel text-xs">
            🍓 JAVAI-64
          </span>
          <span className="hidden sm:inline text-[#fff1e8] font-pixel text-[11px]">
            PICOTRON WORKSTATION
          </span>
          <span className="hidden md:inline bg-[#7e2553] px-2 py-0.5 border border-black">
            DRIVE://CARTS ({CALIFORNIA_PROJECTS.length})
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[#ffec27] hidden sm:inline">60FPS</span>
          <span className="hidden md:inline">RAM: 64KB</span>
          <span className="bg-black text-[#00e436] px-2 py-0.5 font-pixel text-xs">
            {clockText}
          </span>
        </div>
      </header>

      {/* Main Picotron Desktop */}
      <main className="relative z-10 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Cartridge Shelf (11 Projects + 12th Extra Carts tile = 0 orphan holes!) */}
        <section
          aria-label="Prateleira de Cartuchos"
          className={`${
            windowState === "expanded" ? "lg:col-span-5" : "lg:col-span-6"
          } bg-black/80 border-4 border-black pico-shadow flex flex-col`}
        >
          <div className="bg-[#7e2553] text-[#fff1e8] px-3 py-1.5 border-b-4 border-black flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              <Disc className="w-4 h-4 text-[#ffec27]" />
              <span className="font-pixel text-xs">CARTRIDGE_SHELF.POD</span>
            </div>
            <span className="text-[#ffec27] font-pixel text-xs">12 SLOTS</span>
          </div>

          <div className="p-2.5 sm:p-3 grid grid-cols-2 gap-2.5">
            {CALIFORNIA_PROJECTS.map((proj, idx) => {
              const isSelected = proj.id === selectedId;
              const ext = FILE_EXTENSIONS[proj.id] || `${proj.id}.p8`;
              return (
                <div
                  key={proj.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCartSelect(proj.id, idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCartSelect(proj.id, idx);
                    }
                  }}
                  className={`cursor-pointer p-2.5 border-2 transition-all flex flex-col justify-between min-h-[104px] ${
                    isSelected
                      ? "bg-[#7e2553] border-[#ffec27] -translate-y-0.5 pico-shadow"
                      : "bg-[#1d2b53] border-black hover:border-[#29adff] pico-shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-lg">{proj.icon}</span>
                      <span className="text-[11px] font-bold px-1.5 py-0.5 bg-black text-[#00e436] border border-[#00e436]/40 truncate max-w-[100px]">
                        {ext}
                      </span>
                    </div>
                    <h2 className="font-pixel text-xs text-[#fff1e8] leading-snug">
                      {proj.title}
                    </h2>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-black/60 flex items-center justify-between gap-1">
                    <span className="text-xs text-[#ffec27] font-bold">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLaunch(proj.vercelUrl);
                      }}
                      className="px-2 py-1 bg-[#00e436] hover:bg-[#ffec27] text-black font-pixel text-[11px] border border-black cursor-pointer"
                    >
                      ▶ BOOT
                    </button>
                  </div>
                </div>
              );
            })}

            {/* 12th Cartridge Slot: Extra Repos (balances 2x6 grid perfectly) */}
            <div className="p-2.5 border-2 border-[#29adff]/70 bg-[#121a33] pico-shadow-sm flex flex-col justify-between min-h-[104px]">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <FolderKanban className="w-5 h-5 text-[#ffec27]" />
                  <span className="text-[11px] font-bold px-1.5 py-0.5 bg-black text-[#ff77a8] border border-[#ff77a8]/40">
                    extra.pod
                  </span>
                </div>
                <h2 className="font-pixel text-xs text-[#ffec27] leading-snug">
                  EXTRA_CARTS
                </h2>
              </div>

              <div className="mt-2 pt-1.5 border-t border-black/60 flex flex-wrap gap-1.5">
                {EXTRA_PROJECTS.map((ep) => (
                  <a
                    key={ep.name}
                    href={ep.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-1.5 py-0.5 bg-black text-[#29adff] hover:text-[#ffec27] border border-[#29adff]/50 text-xs font-bold"
                  >
                    💾 {ep.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Right Desktop Column: Sticky Inspector + Shell (hidden on mobile; mobile opens native <dialog> on cart tap) */}
        <div
          className={`${
            windowState === "expanded" ? "lg:col-span-7" : "lg:col-span-6"
          } space-y-4 lg:sticky lg:top-14`}
        >
          {/* Inspector Window (Desktop) */}
          {windowState !== "minimized" && windowState !== "closed" && (
            <section
              aria-label="Inspetor de Cartucho"
              className="hidden lg:block bg-[#c2c3c7] text-black border-4 border-black pico-shadow"
            >
              <div className="bg-[#ff004d] text-[#fff1e8] px-3 py-1.5 border-b-4 border-black flex items-center justify-between text-xs font-bold">
                <span className="font-pixel text-xs">
                  INSPECTOR // {selectedExt.toUpperCase()}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setWindowState("minimized")}
                    aria-label="Minimizar janela do inspetor"
                    title="Minimizar"
                    className="w-6 h-5 bg-[#c2c3c7] hover:bg-[#ffec27] text-black border-2 border-black font-pixel text-xs flex items-center justify-center cursor-pointer"
                  >
                    _
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setWindowState(windowState === "expanded" ? "normal" : "expanded")
                    }
                    aria-label="Expandir janela do inspetor"
                    title="Expandir / Restaurar"
                    className="w-6 h-5 bg-[#c2c3c7] hover:bg-[#00e436] text-black border-2 border-black font-pixel text-xs flex items-center justify-center cursor-pointer"
                  >
                    □
                  </button>
                  <button
                    type="button"
                    onClick={() => setWindowState("closed")}
                    aria-label="Fechar janela do inspetor"
                    title="Fechar"
                    className="w-6 h-5 bg-[#ffec27] hover:bg-white text-black border-2 border-black font-pixel text-xs flex items-center justify-center cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-3">
                <div className="bg-[#1d2b53] text-[#fff1e8] border-4 border-black p-4 space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block bg-[#29adff] text-black font-bold text-xs px-2 py-0.5 border border-black">
                        {selectedProject.tag}
                      </span>
                      <h1 className="font-pixel text-xl text-[#ffec27] mt-2 flex items-center gap-2">
                        <span>{selectedProject.icon}</span>
                        <span>{selectedProject.title}</span>
                      </h1>
                    </div>
                    <span className="bg-black text-[#00e436] text-xs font-bold px-2 py-1 border border-[#00e436] shrink-0">
                      {selectedProject.rating}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-[#ff77a8]">
                    {selectedProject.tagline}
                  </p>

                  <p className="text-xs text-[#fff1e8]/95 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-black text-[#29adff] px-2 py-0.5 border border-[#29adff]/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onLaunch(selectedProject.vercelUrl)}
                      className="flex-1 py-2.5 px-4 bg-[#00e436] hover:bg-[#ffec27] text-black font-pixel text-xs border-2 border-black pico-shadow cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>RUN CARTRIDGE</span>
                    </button>
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 bg-[#ff004d] hover:bg-[#ff77a8] text-white font-pixel text-xs border-2 border-black pico-shadow flex items-center gap-1.5"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>CODE</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Desktop Interactive PICO-8 Command Prompt */}
          <div className="hidden lg:block bg-black text-[#00e436] border-4 border-[#5f574f] pico-shadow p-3 text-xs space-y-2">
            <div className="flex items-center justify-between text-[#ffec27] border-b border-[#5f574f] pb-1">
              <span className="flex items-center gap-1.5 font-pixel text-xs">
                <Terminal className="w-3.5 h-3.5" />
                <span>JAVAI-SH // SHELL</span>
              </span>
              <span className="text-xs text-[#c2c3c7]">help · list · run · random</span>
            </div>
            <div className="text-[#fff1e8] font-mono-code text-xs py-1 break-words">
              &gt; {termOutput}
            </div>
            <form onSubmit={onSubmitTerminal} className="flex items-center gap-2">
              <label htmlFor="picotron-cli-desktop" className="text-[#ff004d] font-bold">
                JAVAI-64&gt;
              </label>
              <input
                id="picotron-cli-desktop"
                type="text"
                value={termInput}
                onChange={(e) => onChangeTermInput(e.target.value)}
                placeholder='Digite "help" ou "run"...'
                className="flex-1 bg-transparent text-[#00e436] focus:outline-none font-mono-code text-xs min-w-0"
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-[#1d2b53] text-[#ffec27] border border-[#29adff] font-pixel text-xs cursor-pointer"
              >
                EXEC
              </button>
            </form>
          </div>

          {/* Mobile Collapsible Shell (< lg) */}
          <details className="lg:hidden bg-black text-[#00e436] border-4 border-[#5f574f] pico-shadow p-3 text-xs">
            <summary className="cursor-pointer font-pixel text-xs text-[#ffec27] flex items-center justify-between">
              <span>&gt;_ TERMINAL JAVAI-SH (ABRIR)</span>
              <span className="text-[#00e436]">CLI</span>
            </summary>
            <div className="mt-2.5 pt-2 border-t border-[#5f574f] space-y-2">
              <div className="text-[#fff1e8] font-mono-code text-xs break-words">
                &gt; {termOutput}
              </div>
              <form onSubmit={onSubmitTerminal} className="flex items-center gap-2">
                <span className="text-[#ff004d] font-bold">&gt;</span>
                <input
                  type="text"
                  aria-label="Comando do terminal Picotron"
                  value={termInput}
                  onChange={(e) => onChangeTermInput(e.target.value)}
                  placeholder="help, list, run, random..."
                  className="flex-1 bg-transparent text-[#00e436] focus:outline-none font-mono-code text-xs min-w-0"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-[#1d2b53] text-[#ffec27] border border-[#29adff] font-pixel text-xs cursor-pointer"
                >
                  EXEC
                </button>
              </form>
            </div>
          </details>
        </div>
      </main>

      {/* Picotron Bottom Status Bar with Restore Chip */}
      <footer className="relative z-10 bg-black text-[#c2c3c7] border-t-4 border-[#5f574f] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span>🍓 JAVAI-64 • PETER (@javaijafoi) • SP</span>
          {(windowState === "minimized" || windowState === "closed") && (
            <button
              type="button"
              onClick={() => setWindowState("normal")}
              className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 bg-[#7e2553] text-[#ffec27] border border-[#ffec27] font-pixel text-xs cursor-pointer"
            >
              ▲ RESTAURAR {selectedExt.toUpperCase()}
            </button>
          )}
        </div>
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
            GITHUB
          </a>
        </div>
      </footer>
    </div>
  );
}
