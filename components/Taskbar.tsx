"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { Volume2, VolumeX, ExternalLink, Sparkles, Terminal, Power } from "lucide-react";
import { GithubIcon } from "./Icons";

interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
}

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  onToggleWindow: (id: string) => void;
  onOpenWindow: (id: string) => void;
}

export default function Taskbar({
  windows,
  activeWindowId,
  onToggleWindow,
  onOpenWindow,
}: TaskbarProps) {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timeString, setTimeString] = useState<string>("12:00:00");
  const [dateString, setDateString] = useState<string>("Era do Código");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
      setDateString(
        now.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const newState = sound.toggleMute();
    setSoundEnabled(newState);
  };

  return (
    <>
      {/* Start Menu Popup */}
      {startMenuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-10 left-1 w-72 retro-box-raised bg-[#1a1b2b] z-50 shadow-2xl flex flex-col font-pixel"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 p-3 border-b-2 border-indigo-950 flex items-center gap-2.5">
            <span className="text-2xl">🧙‍♂️</span>
            <div>
              <div className="text-xs text-amber-300 font-bold">FANTASY OS 95</div>
              <div className="text-[9px] text-indigo-300">javaijafoi @ Vercel/GitHub</div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-1 space-y-1 text-xs">
            <button
              onClick={() => {
                sound.playOpenWindow();
                onOpenWindow("questLog");
                setStartMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 hover:bg-indigo-700 text-left text-slate-200 hover:text-white"
            >
              <span>📜</span>
              <span>Livro de Missões (Projetos)</span>
            </button>

            <button
              onClick={() => {
                sound.playOpenWindow();
                onOpenWindow("heroSheet");
                setStartMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 hover:bg-indigo-700 text-left text-slate-200 hover:text-white"
            >
              <span>🧙</span>
              <span>Ficha de Personagem (Sobre)</span>
            </button>

            <button
              onClick={() => {
                sound.playOpenWindow();
                onOpenWindow("inventory");
                setStartMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 hover:bg-indigo-700 text-left text-slate-200 hover:text-white"
            >
              <span>🎒</span>
              <span>Inventário de Tecnologias</span>
            </button>

            <div className="h-[1px] bg-slate-700 my-1" />

            <a
              href="https://github.com/javaijafoi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                sound.playClick();
                setStartMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 hover:bg-indigo-700 text-left text-slate-200 hover:text-white"
            >
              <GithubIcon className="w-4 h-4 text-slate-400" />
              <span>Masmorra do GitHub</span>
            </a>

            <a
              href="https://vercel.com/peters-projects-e3041d69"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                sound.playClick();
                setStartMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2 hover:bg-indigo-700 text-left text-slate-200 hover:text-white"
            >
              <ExternalLink className="w-4 h-4 text-indigo-400" />
              <span>Reinos da Vercel</span>
            </a>

            <div className="h-[1px] bg-slate-700 my-1" />

            <button
              onClick={() => {
                sound.playClick();
                window.location.reload();
              }}
              className="w-full flex items-center gap-2.5 p-2 hover:bg-red-800 text-left text-red-300 hover:text-white"
            >
              <Power className="w-4 h-4" />
              <span>Reiniciar Reino (Reload)</span>
            </button>
          </div>
        </div>
      )}

      {/* The Bottom Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#25273b] border-t-2 border-l-2 border-[#575b8a] border-b-2 border-r-2 border-[#12131d] z-40 flex items-center justify-between px-1 shadow-lg select-none">
        {/* Left: Start Button */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              setStartMenuOpen(!startMenuOpen);
            }}
            className={`px-2.5 py-1 flex items-center gap-1.5 font-pixel text-xs ${
              startMenuOpen
                ? "bg-[#181926] border-t-2 border-l-2 border-[#10111a] border-b-2 border-r-2 border-[#5a5e8c] text-amber-300 translate-y-[1px]"
                : "retro-button text-slate-100 font-bold"
            }`}
          >
            <span className="text-sm">🏰</span>
            <span>INICIAR</span>
          </button>

          <div className="h-6 w-[2px] bg-slate-700 mx-1 hidden sm:block" />

          {/* Center: Open Window Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-[50vw]">
            {windows
              .filter((w) => w.isOpen)
              .map((w) => {
                const isActive = activeWindowId === w.id && !w.isMinimized;
                return (
                  <button
                    key={w.id}
                    onClick={() => {
                      sound.playClick();
                      onToggleWindow(w.id);
                    }}
                    className={`px-2 py-1 max-w-[150px] truncate flex items-center gap-1.5 font-pixel text-[10px] ${
                      isActive
                        ? "bg-[#181926] border-t-2 border-l-2 border-[#10111a] border-b-2 border-r-2 border-[#5a5e8c] text-amber-300"
                        : "retro-button text-slate-300"
                    }`}
                  >
                    <span>{w.icon}</span>
                    <span className="truncate">{w.title}</span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Right: Systray */}
        <div className="flex items-center gap-2 px-2 py-0.5 retro-box-sunken bg-[#131420]">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-1 hover:text-amber-300 text-slate-300 transition-colors"
            title={soundEnabled ? "Mutar Sons 8-bit" : "Ativar Sons 8-bit"}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            )}
          </button>

          {/* GitHub / Vercel Status Beacons */}
          <div className="hidden sm:flex items-center gap-1.5 px-1 font-pixel text-[9px] text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400">ONLINE</span>
          </div>

          <div className="h-4 w-[1px] bg-slate-700" />

          {/* Arcane Clock */}
          <div className="font-pixel text-[10px] text-slate-200 flex items-center gap-1">
            <span>⏳</span>
            <span>{timeString}</span>
          </div>
        </div>
      </div>
    </>
  );
}
