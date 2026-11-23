"use client";

import React, { useEffect, useState } from "react";
import { CALIFORNIA_PROJECTS } from "@/data/projects";
import { EXTRA_PROJECTS, GITHUB_URL } from "@/lib/site";
import { OSProps, CrtPhosphorColor, FILE_EXTENSIONS, ASCII_TAGS } from "@/lib/os-config";

const PHOSPHOR_MODES: { label: string; color: CrtPhosphorColor }[] = [
  { label: "AMBER", color: "#ffb000" },
  { label: "MATRIX", color: "#00ff66" },
  { label: "CYAN", color: "#00f0ff" },
  { label: "CYBER", color: "#ff2a85" },
];

export default function TempleCrtOS({
  selectedProject,
  selectedId,
  onSelectProject,
  onLaunch,
  onRandomizeOS,
  crtColor,
  onChangeCrtColor,
  termInput,
  onChangeTermInput,
  termOutput,
  onSubmitTerminal,
}: OSProps) {
  const [f1HelpBanner, setF1HelpBanner] = useState(false);

  const selectedExt = FILE_EXTENSIONS[selectedProject.id] || `${selectedProject.id}.bin`;
  const selectedAscii = ASCII_TAGS[selectedProject.id] || "APP ";

  const cyclePhosphor = () => {
    const idx = PHOSPHOR_MODES.findIndex((m) => m.color === crtColor);
    const next = PHOSPHOR_MODES[(idx + 1) % PHOSPHOR_MODES.length];
    onChangeCrtColor(next.color);
  };

  const triggerF1Help = () => {
    setF1HelpBanner((prev) => !prev);
  };

  // Real keyboard shortcuts for F1, F2, F3, F4, ArrowUp/ArrowDown (never hijacks F5)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      const hasOpenDialog = Boolean(document.querySelector("dialog[open]"));

      if (e.key === "F1") {
        e.preventDefault();
        setF1HelpBanner((prev) => !prev);
      } else if (e.key === "F2") {
        e.preventDefault();
        window.open("/llms.txt", "_blank", "noopener,noreferrer");
      } else if (e.key === "F3") {
        e.preventDefault();
        const idx = PHOSPHOR_MODES.findIndex((m) => m.color === crtColor);
        const next = PHOSPHOR_MODES[(idx + 1) % PHOSPHOR_MODES.length];
        onChangeCrtColor(next.color);
      } else if (e.key === "F4") {
        e.preventDefault();
        onRandomizeOS();
      } else if (!inInput && !hasOpenDialog && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
        e.preventDefault();
        const currentIdx = CALIFORNIA_PROJECTS.findIndex((p) => p.id === selectedId);
        const safeIdx = currentIdx === -1 ? 0 : currentIdx;
        const delta = e.key === "ArrowDown" ? 1 : -1;
        const nextIdx =
          (safeIdx + delta + CALIFORNIA_PROJECTS.length) % CALIFORNIA_PROJECTS.length;
        onSelectProject(CALIFORNIA_PROJECTS[nextIdx].id, nextIdx, false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [crtColor, onChangeCrtColor, onRandomizeOS, onSelectProject, selectedId]);

  return (
    <div
      className="flex-1 flex flex-col justify-between bg-[#060706] font-mono-code p-2.5 sm:p-4 relative"
      style={{ color: crtColor }}
    >
      {/* Clean CSS-bordered BIOS Header (no broken box-drawing glyphs) */}
      <header className="relative z-10 border-2 border-current px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="font-crt text-lg sm:text-xl tracking-wide font-bold">
          JAVAI-DOS BIOS v4.20 // NODE: SAO_PAULO_BR
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="hidden sm:inline opacity-80">PHOSPHOR:</span>
          {PHOSPHOR_MODES.map((mode) => {
            const active = crtColor === mode.color;
            return (
              <button
                key={mode.label}
                type="button"
                onClick={() => onChangeCrtColor(mode.color)}
                className="px-2 py-0.5 border border-current text-xs font-bold cursor-pointer"
                style={{
                  color: active ? "#050505" : mode.color,
                  backgroundColor: active ? mode.color : "transparent",
                  textShadow: active ? "none" : undefined,
                }}
              >
                [{mode.label}]
              </button>
            );
          })}
        </div>
      </header>

      {/* Optional F1 Help Banner */}
      {f1HelpBanner && (
        <div className="relative z-10 max-w-7xl w-full mx-auto mt-3 border-2 border-current px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
          <span>
            HELP: Use [SETAS ↑/↓] ou toque em um arquivo para inspecionar · [F2] /llms.txt · [F3] Fósforo · [F4] Random OS · CLI aceita: help, list, run, random
          </span>
          <button
            type="button"
            onClick={() => setF1HelpBanner(false)}
            className="px-2 py-0.5 border border-current font-bold cursor-pointer"
          >
            [OK]
          </button>
        </div>
      )}

      {/* Tiling Manager */}
      <main className="relative z-10 max-w-7xl w-full mx-auto my-3 sm:my-4 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Directory Tree Pane (Pure Monochrome — ASCII Tags only, zero color emojis) */}
        <section
          aria-label="Diretório C:\\JAVAI\\BIN"
          className="lg:col-span-5 border-2 border-current p-3 flex flex-col justify-between"
        >
          <div>
            <div className="text-xs font-bold border-b border-current pb-1.5 mb-2 flex justify-between">
              <span>DIR C:\JAVAI\BIN\*.*</span>
              <span>{CALIFORNIA_PROJECTS.length} FILES</span>
            </div>

            <div className="space-y-1">
              {CALIFORNIA_PROJECTS.map((proj, idx) => {
                const isSelected = proj.id === selectedId;
                const ext = FILE_EXTENSIONS[proj.id] || `${proj.id}.bin`;
                const ascii = ASCII_TAGS[proj.id] || "APP ";
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => onSelectProject(proj.id, idx, true)}
                    className="w-full text-left cursor-pointer px-2 py-2 min-h-10 text-xs flex items-center justify-between gap-2 transition-colors border border-transparent hover:border-current"
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
                    <span className="truncate">
                      {isSelected ? ">" : " "} [{ascii}] {ext} — {proj.title}
                    </span>
                    <span className="shrink-0">[RUN]</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-current text-xs space-y-1.5">
            <div className="font-bold">SUBDIR C:\JAVAI\EXTRA\</div>
            <div className="flex flex-wrap gap-3">
              {EXTRA_PROJECTS.map((ep) => (
                <a
                  key={ep.name}
                  href={ep.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                >
                  &gt; {ep.name.toUpperCase()}
                </a>
              ))}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
              >
                &gt; GITHUB.DIR
              </a>
            </div>
          </div>
        </section>

        {/* Right Desktop Sticky Mainframe Spec & DOS Console */}
        <section
          aria-label="Especificação do Módulo"
          className="hidden lg:flex lg:col-span-7 flex-col justify-between border-2 border-current p-4 space-y-4 lg:sticky lg:top-14"
        >
          <div className="space-y-3">
            <div className="border-b border-current pb-2 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span>MODULE: {selectedExt.toUpperCase()}</span>
              <span>TAG: [{selectedAscii}] // STATUS: 200 OK</span>
            </div>

            <h2 className="font-crt text-3xl md:text-4xl tracking-wide font-bold">
              [[ {selectedProject.title.toUpperCase()} ]]
            </h2>

            <div className="text-xs font-bold opacity-95">
              &gt;&gt; {selectedProject.tag} {"//"} {selectedProject.tagline}
            </div>

            <p className="text-sm leading-relaxed opacity-90 border-l-2 border-current pl-3 py-1">
              {selectedProject.description}
            </p>

            <div className="pt-2 text-xs">
              <div className="mb-1.5 font-bold">LINKED_MODULES:</div>
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
                type="button"
                onClick={() => onLaunch(selectedProject.vercelUrl)}
                className="flex-1 py-2.5 px-4 font-bold text-xs cursor-pointer border-2 border-current hover:opacity-90"
                style={{
                  backgroundColor: crtColor,
                  color: "#050505",
                  textShadow: "none",
                }}
              >
                [EXEC] {selectedProject.vercelUrl}
              </button>
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 border-2 border-current text-xs font-bold hover:underline"
                >
                  [SRC] GITHUB
                </a>
              )}
            </div>

            {/* Unified DOS Command Prompt */}
            <form
              onSubmit={onSubmitTerminal}
              className="border border-current p-2 text-xs flex items-center gap-2"
            >
              <label htmlFor="crt-cli-desktop" className="font-bold shrink-0">
                C:\JAVAI&gt;
              </label>
              <input
                id="crt-cli-desktop"
                type="text"
                value={termInput}
                onChange={(e) => onChangeTermInput(e.target.value)}
                placeholder='help, list, run, random...'
                className="flex-1 bg-transparent focus:outline-none text-current min-w-0"
              />
              <button
                type="submit"
                className="px-2.5 py-0.5 border border-current cursor-pointer font-bold"
              >
                EXEC
              </button>
            </form>
            <div className="text-xs opacity-85 break-words">STDOUT: {termOutput}</div>
          </div>
        </section>

        {/* Mobile Collapsible DOS Console (< lg) */}
        <details className="lg:hidden border-2 border-current p-3 text-xs">
          <summary className="cursor-pointer font-bold flex items-center justify-between">
            <span>C:\JAVAI&gt; CONSOLE DOS (ABRIR)</span>
            <span>[CLI]</span>
          </summary>
          <div className="mt-2.5 pt-2 border-t border-current space-y-2">
            <div className="break-words opacity-90">STDOUT: {termOutput}</div>
            <form onSubmit={onSubmitTerminal} className="flex items-center gap-2">
              <span className="font-bold">C:\&gt;</span>
              <input
                type="text"
                aria-label="Comando DOS"
                value={termInput}
                onChange={(e) => onChangeTermInput(e.target.value)}
                placeholder="help, list, run, random..."
                className="flex-1 bg-transparent focus:outline-none text-current min-w-0"
              />
              <button type="submit" className="px-2 py-0.5 border border-current cursor-pointer">
                EXEC
              </button>
            </form>
          </div>
        </details>
      </main>

      {/* Interactive Function-Key Footer (all F-keys are real clickable buttons!) */}
      <footer className="relative z-10 border-2 border-current px-3 sm:px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={triggerF1Help}
            className="px-2 py-0.5 border border-current hover:opacity-80 cursor-pointer font-bold"
          >
            F1:HELP
          </button>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-0.5 border border-current hover:opacity-80 font-bold"
          >
            F2:LLMS.TXT
          </a>
          <button
            type="button"
            onClick={cyclePhosphor}
            className="px-2 py-0.5 border border-current hover:opacity-80 cursor-pointer font-bold"
          >
            F3:PHOSPHOR
          </button>
          <button
            type="button"
            onClick={onRandomizeOS}
            className="px-2 py-0.5 border border-current hover:opacity-80 cursor-pointer font-bold"
          >
            F4:RANDOM_OS
          </button>
        </div>
        <span className="font-bold">OPERATOR: PETER (@javaijafoi) // 640K OK █</span>
      </footer>
    </div>
  );
}
