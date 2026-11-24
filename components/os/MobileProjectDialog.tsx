"use client";

import React, { useRef, useId } from "react";
import { ProjectCard, CALIFORNIA_PROJECTS } from "@/data/projects";
import {
  OSThemeId,
  CrtPhosphorColor,
  FILE_EXTENSIONS,
  ASCII_TAGS,
} from "@/lib/os-config";
import { GithubIcon } from "@/components/Icons";
import { useDialogLightDismiss } from "./useDialogLightDismiss";
import { Play, ChevronLeft, ChevronRight, X, ArrowUpRight } from "lucide-react";

interface MobileProjectDialogProps {
  open: boolean;
  activeOS: OSThemeId;
  crtColor: CrtPhosphorColor;
  project: ProjectCard;
  onClose: () => void;
  onSelectProject: (id: string, idx: number, openModalOnMobile?: boolean) => void;
  onLaunch: (url: string) => void;
}

export default function MobileProjectDialog({
  open,
  activeOS,
  crtColor,
  project,
  onClose,
  onSelectProject,
  onLaunch,
}: MobileProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useDialogLightDismiss(dialogRef, open, onClose);

  const currentIdx = CALIFORNIA_PROJECTS.findIndex((p) => p.id === project.id);
  const safeIdx = currentIdx === -1 ? 0 : currentIdx;
  const prevIdx = (safeIdx - 1 + CALIFORNIA_PROJECTS.length) % CALIFORNIA_PROJECTS.length;
  const nextIdx = (safeIdx + 1) % CALIFORNIA_PROJECTS.length;
  const ext = FILE_EXTENSIONS[project.id] || `${project.id}.app`;
  const asciiTag = ASCII_TAGS[project.id] || "APP ";

  const goPrev = () => {
    const p = CALIFORNIA_PROJECTS[prevIdx];
    onSelectProject(p.id, prevIdx, false);
  };

  const goNext = () => {
    const p = CALIFORNIA_PROJECTS[nextIdx];
    onSelectProject(p.id, nextIdx, false);
  };

  const isMainframe = activeOS === "mainframe";

  const dialogThemeShell: Record<OSThemeId, string> = {
    picotron: "bg-[#1d2b53] text-[#fff1e8] border-4 border-black pico-shadow font-mono-code rounded-none",
    arcana: "bg-[#1a130d] text-[#e8d8b9] border-2 border-[#d4a94e] font-grimoire rounded-sm shadow-2xl",
    sunset: "bg-[#170930] text-slate-100 border-2 border-[#ff2a85] rounded-2xl shadow-[0_0_35px_rgba(255,42,133,0.45)]",
    mainframe: "bg-[#060706] border-2 rounded-none font-mono-code",
    win95: "bg-[#c0c0c0] text-black win95-bevel rounded-none font-win95 p-1",
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      {...({ closedby: "any" } as Record<string, string>)}
      style={
        isMainframe
          ? { color: crtColor, borderColor: crtColor }
          : undefined
      }
      className={`m-auto w-[calc(100vw-1.5rem)] max-w-lg max-h-[88dvh] p-0 overflow-hidden open:flex flex-col ${dialogThemeShell[activeOS]}`}
    >
      {/* Header per OS */}
      {activeOS === "picotron" && (
        <div className="bg-[#ff004d] text-[#fff1e8] px-3 py-2 border-b-4 border-black flex items-center justify-between">
          <span className="font-pixel text-xs">CART // {ext.toUpperCase()}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="min-h-8 min-w-8 bg-black text-[#ffec27] border border-white/40 flex items-center justify-center font-pixel text-xs cursor-pointer"
          >
            X
          </button>
        </div>
      )}

      {activeOS === "arcana" && (
        <div className="bg-[#2a1d12] px-4 py-2.5 border-b border-[#8c6728] flex items-center justify-between">
          <span className="font-arcane text-xs text-[#f5c542] tracking-wider">
            ⚜️ TOMO #{safeIdx + 1} DE {CALIFORNIA_PROJECTS.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar pergaminho"
            className="min-h-8 min-w-8 border border-[#8c6728] bg-[#120d09] text-[#f5c542] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {activeOS === "sunset" && (
        <div className="bg-gradient-to-r from-[#ff2a85] via-purple-500 to-cyan-400 text-black px-4 py-2 flex items-center justify-between">
          <span className="font-retro text-xs tracking-wide">
            PROJETO {String(safeIdx + 1).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar player"
            className="min-h-8 min-w-8 rounded-md bg-black/25 hover:bg-black/40 text-black flex items-center justify-center font-bold cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {activeOS === "mainframe" && (
        <div
          className="px-3 py-2 border-b-2 flex items-center justify-between font-crt text-lg"
          style={{ borderColor: crtColor }}
        >
          <span>EXEC://C:\JAVAI\BIN\{ext.toUpperCase()}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar módulo CRT"
            className="min-h-8 px-2 border text-xs font-mono-code font-bold cursor-pointer"
            style={{ borderColor: crtColor }}
          >
            [ESC] X
          </button>
        </div>
      )}

      {activeOS === "win95" && (
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2.5 py-1.5 flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-1.5 truncate">
            <span>{project.icon}</span>
            <span className="truncate">{project.title}.exe — Propriedades</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="min-h-7 min-w-7 bg-[#c0c0c0] text-black win95-bevel flex items-center justify-center font-bold cursor-pointer"
          >
            X
          </button>
        </div>
      )}

      {/* Body Content */}
      <div
        className={`p-4 overflow-y-auto space-y-3.5 ${
          activeOS === "win95" ? "bg-white text-black m-1 win95-inset" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <span
              className={`text-xs block ${
                activeOS === "picotron"
                  ? "text-[#29adff] font-bold"
                  : activeOS === "arcana"
                    ? "text-[#f5c542] font-mono-code"
                    : activeOS === "sunset"
                      ? "text-cyan-300 font-mono-code"
                      : activeOS === "mainframe"
                        ? "opacity-80 font-mono-code"
                        : "text-gray-600 font-mono-code"
              }`}
            >
              {isMainframe ? `[${asciiTag}] // ${project.tag}` : project.tag}
            </span>
            <h2
              id={titleId}
              className={`mt-1 ${
                activeOS === "picotron"
                  ? "font-pixel text-lg text-[#ffec27]"
                  : activeOS === "arcana"
                    ? "font-arcane text-xl font-bold text-[#fff6e0]"
                    : activeOS === "sunset"
                      ? "font-retro text-2xl text-white"
                      : activeOS === "mainframe"
                        ? "font-crt text-2xl tracking-wide"
                        : "text-lg font-bold text-[#000080]"
              }`}
            >
              {isMainframe ? `[[ ${project.title.toUpperCase()} ]]` : `${project.icon} ${project.title}`}
            </h2>
          </div>

          {!isMainframe && (
            <span className="text-2xl shrink-0" aria-hidden="true">
              {project.icon}
            </span>
          )}
        </div>

        <p
          className={`text-xs sm:text-sm font-semibold ${
            activeOS === "picotron"
              ? "text-[#ff77a8]"
              : activeOS === "arcana"
                ? "text-[#f5c542] italic"
                : activeOS === "sunset"
                  ? "text-pink-300"
                  : activeOS === "mainframe"
                    ? "opacity-90"
                    : "text-gray-800"
          }`}
        >
          {project.tagline}
        </p>

        <p className="text-xs sm:text-sm leading-relaxed opacity-90">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`text-xs px-2 py-0.5 ${
                activeOS === "picotron"
                  ? "bg-black text-[#29adff] border border-[#29adff]/50"
                  : activeOS === "arcana"
                    ? "bg-[#120d09] border border-[#8c6728] text-[#f5c542] font-mono-code"
                    : activeOS === "sunset"
                      ? "rounded-md bg-white/10 border border-white/20 text-pink-200"
                      : activeOS === "mainframe"
                        ? "border border-current"
                        : "bg-[#c0c0c0] text-black win95-bevel"
              }`}
            >
              {isMainframe ? `[${tech}]` : tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions & Prev/Next */}
      <div
        className={`p-3 space-y-2.5 ${
          activeOS === "picotron"
            ? "bg-[#121a33] border-t-4 border-black"
            : activeOS === "arcana"
              ? "bg-[#120d09] border-t border-[#8c6728]"
              : activeOS === "sunset"
                ? "bg-[#110622] border-t border-white/15"
                : activeOS === "mainframe"
                  ? "border-t-2"
                  : "bg-[#c0c0c0] border-t border-gray-400"
        }`}
        style={isMainframe ? { borderColor: crtColor } : undefined}
      >
        <div className="flex gap-2">
          <button
            type="button"
            autoFocus
            onClick={() => onLaunch(project.vercelUrl)}
            className={`flex-1 min-h-11 px-4 py-2 text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 ${
              activeOS === "picotron"
                ? "bg-[#00e436] hover:bg-[#ffec27] text-black border-2 border-black pico-shadow-sm font-pixel"
                : activeOS === "arcana"
                  ? "bg-gradient-to-r from-[#8c6728] via-[#cfa046] to-[#8c6728] text-[#110d0a] border border-[#fff3d1] font-arcane"
                  : activeOS === "sunset"
                    ? "rounded-xl bg-gradient-to-r from-[#ff2a85] to-purple-600 text-white font-retro"
                    : activeOS === "mainframe"
                      ? "border border-current"
                      : "bg-[#c0c0c0] text-black win95-bevel font-bold"
            }`}
            style={
              isMainframe
                ? { backgroundColor: crtColor, color: "#050505", textShadow: "none" }
                : undefined
            }
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>ABRIR PROJETO</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`min-h-11 px-3.5 py-2 text-xs font-bold flex items-center justify-center gap-1.5 ${
                activeOS === "picotron"
                  ? "bg-[#ff004d] text-white border-2 border-black pico-shadow-sm"
                  : activeOS === "arcana"
                    ? "bg-[#1b140e] text-[#f5c542] border border-[#8c6728]"
                    : activeOS === "sunset"
                      ? "rounded-xl bg-white/10 border border-white/20 text-white"
                      : activeOS === "mainframe"
                        ? "border border-current"
                        : "bg-[#c0c0c0] text-black win95-bevel"
              }`}
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 text-xs">
          <button
            type="button"
            onClick={goPrev}
            className="min-h-9 px-3 py-1 rounded border border-current/30 flex items-center gap-1 cursor-pointer hover:opacity-80"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Anterior</span>
          </button>
          <span className="opacity-75 font-mono-code">
            {safeIdx + 1} / {CALIFORNIA_PROJECTS.length}
          </span>
          <button
            type="button"
            onClick={goNext}
            className="min-h-9 px-3 py-1 rounded border border-current/30 flex items-center gap-1 cursor-pointer hover:opacity-80"
          >
            <span>Próximo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </dialog>
  );
}
