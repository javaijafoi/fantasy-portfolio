"use client";

import React, { useRef, useId } from "react";
import { OSThemeId, OS_THEMES } from "@/lib/os-config";
import { GITHUB_URL } from "@/lib/site";
import { sound } from "@/lib/sound";
import { GithubIcon } from "@/components/Icons";
import { useDialogLightDismiss } from "./useDialogLightDismiss";
import { Shuffle, Volume2, VolumeX, ChevronDown, Check, X } from "lucide-react";

interface KvmBarProps {
  activeOS: OSThemeId;
  mounted: boolean;
  soundOn: boolean;
  osMenuOpen: boolean;
  onSetOsMenuOpen: (open: boolean) => void;
  onSwitchOS: (id: OSThemeId) => void;
  onRandomizeOS: () => void;
  onToggleSound: () => void;
}

export default function KvmBar({
  activeOS,
  mounted,
  soundOn,
  osMenuOpen,
  onSetOsMenuOpen,
  onSwitchOS,
  onRandomizeOS,
  onToggleSound,
}: KvmBarProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useDialogLightDismiss(dialogRef, osMenuOpen, () => onSetOsMenuOpen(false));

  const currentMeta = OS_THEMES.find((t) => t.id === activeOS) || OS_THEMES[0];

  const handleSelectOSFromDialog = (id: OSThemeId) => {
    onSwitchOS(id);
    onSetOsMenuOpen(false);
  };

  return (
    <>
      <nav
        aria-label="Seletor de Fantasy OS"
        className="sticky top-0 z-40 h-11 bg-[#0b0816]/95 backdrop-blur-md border-b border-white/15 px-3 flex items-center"
      >
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-2 flex-nowrap">
          {/* Mobile (< lg): Compact OS Pill Trigger */}
          <div className="flex lg:hidden items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => {
                sound.playSynthNote(440);
                onSetOsMenuOpen(true);
              }}
              aria-haspopup="dialog"
              aria-expanded={osMenuOpen}
              className="min-h-9 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono font-bold text-white flex items-center gap-1.5 cursor-pointer truncate max-w-[210px]"
            >
              <span>{currentMeta.icon}</span>
              <span className="truncate">{currentMeta.shortName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
            </button>
          </div>

          {/* Desktop (>= lg): Left Randomizer */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onRandomizeOS}
              className="min-h-8 px-2.5 py-1 rounded-md bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-mono font-bold shadow-sm transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
              title="Sortear outro Fantasy OS"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>RANDOM</span>
            </button>
          </div>

          {/* Desktop (>= lg): 5 Compact OS Tabs in 1 single row */}
          <div className="hidden lg:flex items-center gap-1.5 flex-nowrap">
            {OS_THEMES.map((theme) => {
              const isActive = mounted && activeOS === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => onSwitchOS(theme.id)}
                  className={`min-h-8 px-2.5 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border whitespace-nowrap ${
                    isActive
                      ? `${theme.accentClasses} shadow-[0_0_12px_rgba(255,255,255,0.18)]`
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
                  }`}
                >
                  <span>{theme.icon}</span>
                  <span>{theme.desktopLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Right Utilities (Mobile + Desktop) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onRandomizeOS}
              aria-label="Sortear outro Fantasy OS"
              title="Sortear outro Fantasy OS"
              className="lg:hidden min-h-9 min-w-9 px-2 rounded-md bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-mono font-bold flex items-center justify-center cursor-pointer active:scale-95"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center min-h-8 px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-300 transition-colors whitespace-nowrap"
              title="Documentação estruturada para IAs e LLMs"
            >
              /llms.txt
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub @javaijafoi"
              onClick={() => sound.playSynthNote(440)}
              className="min-h-9 min-w-9 lg:min-h-8 lg:min-w-0 inline-flex items-center justify-center gap-1.5 px-2 lg:px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 transition-colors whitespace-nowrap"
            >
              <GithubIcon className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-pink-400" />
              <span className="hidden lg:inline">@javaijafoi</span>
            </a>

            <button
              type="button"
              onClick={onToggleSound}
              aria-label={soundOn ? "Mutar Synth Audio" : "Ativar Synth Audio"}
              title={soundOn ? "Mutar Synth Audio" : "Ativar Synth Audio"}
              className="min-h-9 min-w-9 lg:min-h-8 lg:min-w-8 inline-flex items-center justify-center rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 cursor-pointer"
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-yellow-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-red-400" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Native OS Boot Switcher Dialog (mainly for mobile KVM selector) */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        {...({ closedby: "any" } as Record<string, string>)}
        className="m-auto w-[calc(100vw-1.5rem)] max-w-md max-h-[88dvh] bg-[#120d24] text-slate-100 border border-white/20 rounded-xl shadow-2xl p-0 overflow-hidden open:flex flex-col"
      >
        <div className="px-4 py-3 bg-[#1a1333] border-b border-white/15 flex items-center justify-between">
          <div>
            <h2 id={titleId} className="text-sm font-mono font-bold text-yellow-300">
              🖥️ BOOT MANAGER // FANTASY OS
            </h2>
            <p className="text-xs text-slate-300">
              Escolha o sistema operacional do portfólio
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSetOsMenuOpen(false)}
            aria-label="Fechar seletor de OS"
            className="min-h-9 min-w-9 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 space-y-2 overflow-y-auto">
          {OS_THEMES.map((theme) => {
            const isActive = activeOS === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelectOSFromDialog(theme.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isActive
                    ? `${theme.previewSwatch} ring-2 ring-yellow-300`
                    : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl shrink-0">{theme.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold truncate">
                        {theme.desktopLabel}
                      </span>
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-black/40 border border-white/15">
                        {theme.mobileBadge}
                      </span>
                    </div>
                    <p className="text-xs opacity-85 mt-0.5 line-clamp-1">
                      {theme.tagline}
                    </p>
                  </div>
                </div>
                {isActive && <Check className="w-4 h-4 shrink-0 text-yellow-300" />}
              </button>
            );
          })}
        </div>

        <div className="p-3 bg-[#0d091a] border-t border-white/15 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              onRandomizeOS();
              onSetOsMenuOpen(false);
            }}
            className="flex-1 min-h-10 px-3 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            <span>Sortear Aleatório</span>
          </button>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-10 px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-xs font-mono text-cyan-300 flex items-center"
          >
            /llms.txt
          </a>
        </div>
      </dialog>
    </>
  );
}
