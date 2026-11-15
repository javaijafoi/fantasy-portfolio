"use client";

import React, { useState } from "react";
import DesktopIcon from "./DesktopIcon";
import QuestLogWindow from "./QuestLogWindow";
import HeroSheetWindow from "./HeroSheetWindow";
import SpellInventoryWindow from "./SpellInventoryWindow";
import Taskbar from "./Taskbar";
import { sound } from "@/lib/sound";

interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

export default function Desktop() {
  const [highestZ, setHighestZ] = useState(10);
  const [trashOpen, setTrashOpen] = useState(false);

  const [windows, setWindows] = useState<Record<string, WindowState>>({
    questLog: {
      id: "questLog",
      title: "Livro de Missões",
      icon: "📜",
      isOpen: true,
      isMinimized: false,
      zIndex: 10,
    },
    heroSheet: {
      id: "heroSheet",
      title: "Ficha do Herói",
      icon: "🧙",
      isOpen: false,
      isMinimized: false,
      zIndex: 9,
    },
    inventory: {
      id: "inventory",
      title: "Inventário de Spells",
      icon: "🎒",
      isOpen: false,
      isMinimized: false,
      zIndex: 8,
    },
  });

  const [activeWindowId, setActiveWindowId] = useState<string | null>("questLog");

  const bringToFront = (id: string) => {
    const nextZ = highestZ + 1;
    setHighestZ(nextZ);
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
  };

  const openWindow = (id: string) => {
    const nextZ = highestZ + 1;
    setHighestZ(nextZ);
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
      },
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const toggleWindow = (id: string) => {
    const win = windows[id];
    if (win.isMinimized || activeWindowId !== id) {
      bringToFront(id);
    } else {
      // Minimize
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true,
        },
      }));
      setActiveWindowId(null);
    }
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden fantasy-wallpaper select-none flex flex-col justify-between">
      {/* Background Crest / Ambient Watermark */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-10">
        <span className="text-[140px] md:text-[220px]">🏰</span>
        <h1 className="font-pixel text-xl md:text-3xl text-amber-200 mt-2 tracking-widest text-center">
          REINOS DIGITAIS DE PETER
        </h1>
        <p className="font-pixel-text text-lg text-indigo-300">javaijafoi • Vercel & GitHub</p>
      </div>

      {/* Desktop Shortcuts Grid */}
      <div className="relative z-10 p-4 md:p-6 grid grid-cols-2 sm:grid-cols-1 gap-3 max-w-fit pointer-events-auto">
        <DesktopIcon
          id="questLog"
          label="Livro de Missões"
          icon="📜"
          badge="13"
          onClick={() => openWindow("questLog")}
        />

        <DesktopIcon
          id="heroSheet"
          label="Ficha do Herói"
          icon="🧙‍♂️"
          badge="LV42"
          onClick={() => openWindow("heroSheet")}
        />

        <DesktopIcon
          id="inventory"
          label="Mochila Arcana"
          icon="🎒"
          onClick={() => openWindow("inventory")}
        />

        <DesktopIcon
          id="picotron"
          label="Picotron Arena"
          icon="🕹️"
          badge="HOT"
          onClick={() => {
            sound.playOpenWindow();
            window.open("https://picotron-arena.vercel.app", "_blank");
          }}
        />

        <DesktopIcon
          id="github"
          label="Masmorra GitHub"
          icon="🐙"
          onClick={() => {
            sound.playClick();
            window.open("https://github.com/javaijafoi", "_blank");
          }}
        />

        <DesktopIcon
          id="vercel"
          label="Reinos Vercel"
          icon="▲"
          onClick={() => {
            sound.playClick();
            window.open("https://vercel.com/peters-projects-e3041d69", "_blank");
          }}
        />

        <DesktopIcon
          id="trash"
          label="Lixeira de Bugs"
          icon="🗑️"
          onClick={() => {
            sound.playClick();
            setTrashOpen(true);
          }}
        />
      </div>

      {/* Windows Layer */}
      {windows.questLog.isOpen && !windows.questLog.isMinimized && (
        <QuestLogWindow
          zIndex={windows.questLog.zIndex}
          onClose={() => closeWindow("questLog")}
          onFocus={() => bringToFront("questLog")}
        />
      )}

      {windows.heroSheet.isOpen && !windows.heroSheet.isMinimized && (
        <HeroSheetWindow
          zIndex={windows.heroSheet.zIndex}
          onClose={() => closeWindow("heroSheet")}
          onFocus={() => bringToFront("heroSheet")}
        />
      )}

      {windows.inventory.isOpen && !windows.inventory.isMinimized && (
        <SpellInventoryWindow
          zIndex={windows.inventory.zIndex}
          onClose={() => closeWindow("inventory")}
          onFocus={() => bringToFront("inventory")}
        />
      )}

      {/* Fun Easter Egg Modal: Bug Trash Bin */}
      {trashOpen && (
        <div
          style={{ zIndex: highestZ + 5 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 retro-box-raised p-4 bg-[#1b1c2b] shadow-2xl flex flex-col font-pixel text-xs text-slate-200"
        >
          <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-3">
            <span className="text-amber-300 flex items-center gap-1.5">
              <span>🗑️</span>
              <span>LIXEIRA DE BUGS</span>
            </span>
            <button
              onClick={() => {
                sound.playCloseWindow();
                setTrashOpen(false);
              }}
              className="px-1.5 py-0.5 bg-red-800 text-white hover:bg-red-700"
            >
              ✕
            </button>
          </div>
          <p className="font-pixel-text text-sm text-slate-300 mb-3">
            Aqui jazem 1.428 bugs, exceções de ponteiro nulo e erros de CORS eliminados com sucesso durante o desenvolvimento dos projetos.
          </p>
          <div className="p-2 bg-slate-900 border border-slate-800 text-emerald-400 font-pixel-text text-xs mb-3">
            ✨ Status: Nenhum erro crítico sobrevivente.
          </div>
          <button
            onClick={() => {
              sound.playLevelUp();
              setTrashOpen(false);
            }}
            className="w-full py-1.5 retro-button bg-indigo-700 text-white font-pixel text-[10px]"
          >
            PURIFICAR MEMÓRIA (OK)
          </button>
        </div>
      )}

      {/* Taskbar */}
      <Taskbar
        windows={Object.values(windows)}
        activeWindowId={activeWindowId}
        onToggleWindow={toggleWindow}
        onOpenWindow={openWindow}
      />
    </main>
  );
}
