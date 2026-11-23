"use client";

import React, { useState, useRef, useId } from "react";
import { CALIFORNIA_PROJECTS } from "@/data/projects";
import { EXTRA_PROJECTS, GITHUB_URL } from "@/lib/site";
import { OSProps, OS_THEMES, OSThemeId } from "@/lib/os-config";
import { GithubIcon } from "@/components/Icons";
import { useDialogLightDismiss } from "./useDialogLightDismiss";
import { FolderOpen, ArrowUpRight } from "lucide-react";

export default function Win95OS({
  selectedProject,
  selectedId,
  onSelectProject,
  onLaunch,
  soundOn,
  onToggleSound,
  onRandomizeOS,
  onSwitchOS,
  clockText,
}: OSProps) {
  const [windowState, setWindowState] = useState<"normal" | "expanded" | "minimized" | "closed">(
    "normal"
  );
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [extrasOpen, setExtrasOpen] = useState(false);

  const extrasDialogRef = useRef<HTMLDialogElement>(null);
  const extrasTitleId = useId();
  useDialogLightDismiss(extrasDialogRef, extrasOpen, () => setExtrasOpen(false));

  const handleDesktopIconClick = (id: string, idx: number) => {
    setStartMenuOpen(false);
    if (windowState === "minimized" || windowState === "closed") {
      setWindowState("normal");
    }
    onSelectProject(id, idx, true);
  };

  const handleStartSwitchOS = (id: OSThemeId) => {
    setStartMenuOpen(false);
    onSwitchOS(id);
  };

  return (
    <div
      className="flex-1 flex flex-col justify-between bg-[#008080] text-black font-win95 select-none relative"
      onClick={() => {
        if (startMenuOpen) setStartMenuOpen(false);
      }}
    >
      {/* Desktop Workspace */}
      <main className="max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Desktop Shortcut Icons Grid (11 .exe + 1 Extras.dir = 12 icons, 0 orphans) */}
        <section
          aria-label="Ícones da Área de Trabalho"
          className={`${
            windowState === "expanded" ? "lg:col-span-4" : "lg:col-span-5"
          } grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2.5 content-start`}
        >
          {CALIFORNIA_PROJECTS.map((proj, idx) => {
            const isSelected = proj.id === selectedId;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDesktopIconClick(proj.id, idx);
                }}
                onDoubleClick={() => onLaunch(proj.vercelUrl)}
                className={`cursor-pointer p-2 flex flex-col items-center text-center transition-colors min-h-[88px] ${
                  isSelected
                    ? "bg-[#000080]/85 text-white outline-1 outline-dotted outline-yellow-300"
                    : "text-white hover:bg-white/15"
                }`}
              >
                <div className="w-11 h-11 bg-[#c0c0c0] text-black win95-bevel flex items-center justify-center text-2xl mb-1.5">
                  {proj.icon}
                </div>
                <span className="text-xs font-medium leading-tight line-clamp-2 drop-shadow">
                  {proj.title}.exe
                </span>
              </button>
            );
          })}

          {/* 12th Icon: Extras Folder (Zero orphan on 3-col / 4-col grids) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setStartMenuOpen(false);
              setExtrasOpen(true);
            }}
            className="cursor-pointer p-2 flex flex-col items-center text-center text-white hover:bg-white/15 min-h-[88px]"
          >
            <div className="w-11 h-11 bg-[#c0c0c0] text-[#000080] win95-bevel flex items-center justify-center mb-1.5">
              <FolderOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium leading-tight drop-shadow">
              Extras.dir
            </span>
          </button>
        </section>

        {/* Desktop Sticky Program Properties Window */}
        {windowState !== "minimized" && windowState !== "closed" && (
          <section
            aria-label="Propriedades do Aplicativo"
            className={`hidden lg:block ${
              windowState === "expanded" ? "lg:col-span-8" : "lg:col-span-7"
            } bg-[#c0c0c0] p-1.5 win95-bevel space-y-1.5 lg:sticky lg:top-14`}
          >
            {/* Title Bar */}
            <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2.5 py-1.5 flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2 truncate">
                <span>{selectedProject.icon}</span>
                <span className="truncate">
                  C:\Javai\Projetos\{selectedProject.title}.exe — Propriedades
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={onRandomizeOS}
                  className="bg-[#c0c0c0] text-black px-1.5 py-0.5 text-xs win95-bevel cursor-pointer"
                  title="Sortear outro OS"
                  aria-label="Sortear outro sistema operacional"
                >
                  ?
                </button>
                <button
                  type="button"
                  onClick={() => setWindowState("minimized")}
                  className="bg-[#c0c0c0] text-black px-1.5 py-0.5 text-xs win95-bevel cursor-pointer"
                  title="Minimizar"
                  aria-label="Minimizar janela"
                >
                  _
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setWindowState(windowState === "expanded" ? "normal" : "expanded")
                  }
                  className="bg-[#c0c0c0] text-black px-1.5 py-0.5 text-xs win95-bevel cursor-pointer"
                  title="Expandir / Restaurar"
                  aria-label="Expandir janela"
                >
                  □
                </button>
                <button
                  type="button"
                  onClick={() => setWindowState("closed")}
                  className="bg-[#c0c0c0] text-black px-1.5 py-0.5 text-xs win95-bevel cursor-pointer"
                  title="Fechar"
                  aria-label="Fechar janela"
                >
                  X
                </button>
              </div>
            </div>

            {/* Working Menu Strip */}
            <div className="px-2 py-1 text-xs flex flex-wrap items-center gap-4 border-b border-gray-500 text-black">
              <button
                type="button"
                onClick={() => setExtrasOpen(true)}
                className="hover:underline cursor-pointer"
              >
                <u>E</u>xtras
              </button>
              <button
                type="button"
                onClick={() => onLaunch(selectedProject.vercelUrl)}
                className="hover:underline cursor-pointer"
              >
                <u>E</u>xecutar
              </button>
              <a
                href={selectedProject.githubUrl || GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <u>G</u>itHub
              </a>
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
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
                    <span className="text-xs font-mono-code text-gray-700 block">
                      {selectedProject.tag}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-[#000080]">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>
                <span className="bg-[#ffffcc] border border-black px-2 py-0.5 text-xs font-mono-code shrink-0">
                  {selectedProject.rating}
                </span>
              </div>

              <p className="text-sm font-bold text-gray-900">
                {selectedProject.tagline}
              </p>

              <p className="text-sm text-gray-800 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="pt-2 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-800 block mb-1.5">
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

            {/* Dialog Action Buttons */}
            <div className="px-2 py-2 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => onLaunch(selectedProject.vercelUrl)}
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
                  className="px-4 py-2 bg-[#c0c0c0] hover:bg-[#d4d4d4] text-black text-xs font-bold win95-bevel flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Código no GitHub</span>
                </a>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Authentic Win95 Start Menu Popup */}
      {startMenuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-11 left-2 z-50 w-64 bg-[#c0c0c0] win95-bevel flex text-xs text-black shadow-2xl"
        >
          <div className="w-7 bg-[#000080] text-white flex items-end justify-center pb-2 font-bold tracking-widest">
            <span className="[writing-mode:vertical-rl] rotate-180 text-xs">
              JAVAI-95
            </span>
          </div>
          <div className="flex-1 p-1 space-y-0.5">
            {OS_THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleStartSwitchOS(t.id)}
                className="w-full text-left px-2.5 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 cursor-pointer font-medium"
              >
                <span>{t.icon}</span>
                <span>{t.desktopLabel}</span>
              </button>
            ))}
            <div className="border-t border-gray-500 my-1" />
            <button
              type="button"
              onClick={() => {
                setStartMenuOpen(false);
                onRandomizeOS();
              }}
              className="w-full text-left px-2.5 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 cursor-pointer font-bold"
            >
              <span>🔀</span>
              <span>Sortear Outro OS</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStartMenuOpen(false);
                setExtrasOpen(true);
              }}
              className="w-full text-left px-2.5 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2 cursor-pointer"
            >
              <span>📁</span>
              <span>Outros Repositórios</span>
            </button>
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-2.5 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
            >
              <span>📄</span>
              <span>Ajuda (/llms.txt)</span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-2.5 py-1.5 hover:bg-[#000080] hover:text-white flex items-center gap-2"
            >
              <span>🐙</span>
              <span>GitHub (@javaijafoi)</span>
            </a>
          </div>
        </div>
      )}

      {/* Win95 Sticky Bottom Taskbar (high-contrast black text on #c0c0c0) */}
      <footer className="sticky bottom-0 z-30 bg-[#c0c0c0] p-1.5 win95-bevel flex items-center justify-between gap-2 text-xs text-black">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setStartMenuOpen((prev) => !prev);
            }}
            aria-expanded={startMenuOpen}
            className={`px-2.5 py-1 bg-[#c0c0c0] font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 ${
              startMenuOpen ? "win95-inset" : "win95-bevel"
            }`}
          >
            <span>🪟</span>
            <span>Iniciar</span>
          </button>

          {windowState !== "closed" && (
            <button
              type="button"
              onClick={() =>
                setWindowState(windowState === "minimized" ? "normal" : "minimized")
              }
              className={`hidden sm:flex px-2.5 py-1 text-xs font-bold items-center gap-1.5 truncate max-w-[240px] cursor-pointer ${
                windowState === "minimized" ? "win95-bevel bg-[#c0c0c0]" : "win95-inset bg-[#dfdfdf]"
              }`}
            >
              <span>{selectedProject.icon}</span>
              <span className="truncate">{selectedProject.title}.exe</span>
            </button>
          )}

          <span className="hidden md:inline text-black font-medium pl-1 truncate">
            Peter (@javaijafoi) • São Paulo, Brasil
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundOn ? "Mutar áudio do sistema" : "Ativar áudio do sistema"}
          className="px-2.5 py-1 win95-inset font-mono-code text-xs flex items-center gap-2 text-black cursor-pointer shrink-0"
        >
          <span>{soundOn ? "🔊" : "🔇"}</span>
          <span>{clockText}</span>
        </button>
      </footer>

      {/* Native Win95 Extras Directory Dialog */}
      <dialog
        ref={extrasDialogRef}
        aria-labelledby={extrasTitleId}
        {...({ closedby: "any" } as Record<string, string>)}
        className="m-auto w-[calc(100vw-1.5rem)] max-w-md bg-[#c0c0c0] text-black win95-bevel p-1 font-win95 open:flex flex-col"
      >
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2.5 py-1.5 flex items-center justify-between text-xs font-bold">
          <h2 id={extrasTitleId}>📁 C:\Javai\Outros_Repositorios</h2>
          <button
            type="button"
            onClick={() => setExtrasOpen(false)}
            aria-label="Fechar pasta Extras"
            className="min-h-7 min-w-7 bg-[#c0c0c0] text-black win95-bevel font-bold cursor-pointer"
          >
            X
          </button>
        </div>

        <div className="bg-white m-1 p-3 win95-inset space-y-2.5">
          {EXTRA_PROJECTS.map((ep) => (
            <div
              key={ep.name}
              className="p-2.5 border border-gray-300 flex items-center justify-between gap-3"
            >
              <div>
                <h3 className="text-xs font-bold text-[#000080]">{ep.name}</h3>
                <p className="text-xs text-gray-800 mt-0.5">{ep.description}</p>
              </div>
              <a
                href={ep.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#c0c0c0] win95-bevel text-xs font-bold shrink-0"
              >
                Abrir
              </a>
            </div>
          ))}
        </div>
      </dialog>
    </div>
  );
}
