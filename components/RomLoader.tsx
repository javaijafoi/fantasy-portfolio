"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ROM_LIST, RomProject } from "@/data/projects";
import { sound } from "@/lib/sound";
import { GithubIcon } from "./Icons";
import {
  Volume2,
  VolumeX,
  Play,
  ExternalLink,
  Cpu,
  HardDrive,
  Calendar,
  Sparkles,
  Terminal,
} from "lucide-react";

export default function RomLoader() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [soundActive, setSoundActive] = useState(true);
  const [isBooting, setIsBooting] = useState(false);

  const selectedRom = ROM_LIST[selectedIndex];

  const handleSelect = useCallback(
    (index: number) => {
      if (index === selectedIndex) return;
      sound.playCursor();
      setSelectedIndex(index);
    },
    [selectedIndex]
  );

  const handleBoot = useCallback(
    (rom: RomProject) => {
      sound.playBoot();
      setIsBooting(true);
      setTimeout(() => {
        setIsBooting(false);
        window.open(rom.vercelUrl, "_blank");
      }, 350);
    },
    []
  );

  const toggleAudio = () => {
    const state = sound.toggleMute();
    setSoundActive(state);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = (prev + 1) % ROM_LIST.length;
          sound.playCursor();
          return next;
        });
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = (prev - 1 + ROM_LIST.length) % ROM_LIST.length;
          sound.playCursor();
          return next;
        });
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleBoot(ROM_LIST[selectedIndex]);
      } else if (e.key === "g" || e.key === "G") {
        const rom = ROM_LIST[selectedIndex];
        if (rom.githubUrl) {
          sound.playCursor();
          window.open(rom.githubUrl, "_blank");
        }
      } else if (e.key === "m" || e.key === "M") {
        toggleAudio();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleBoot]);

  return (
    <div className="min-h-screen w-full bg-[#080a0f] text-slate-100 flex flex-col justify-between relative selection:bg-cyan-500 selection:text-black">
      {/* Subtle CRT Overlay */}
      <div className="crt-overlay fixed inset-0 z-50 pointer-events-none opacity-40" />

      {/* Top Header / Arcade Marquee */}
      <header className="border-b-2 border-[#1e2638] bg-[#0d111a] px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-4 z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold text-sm shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            ▶
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs md:text-sm text-cyan-400 tracking-wider">
                JAVAI-OS // ROM SELECTOR
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono">
                ONLINE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              CARTRIDGE BANK: 4 OF 4 LOADED • PETER (@javaijafoi)
            </p>
          </div>
        </div>

        {/* Global Nav & Controls */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <a
            href="https://github.com/javaijafoi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playCursor()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#141a26] hover:bg-[#1e2638] border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href="https://vercel.com/peters-projects-e3041d69"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playCursor()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#141a26] hover:bg-[#1e2638] border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Vercel</span>
          </a>

          <button
            onClick={toggleAudio}
            className="p-1.5 rounded bg-[#141a26] hover:bg-[#1e2638] border border-slate-700 text-slate-300 hover:text-cyan-300 transition-all"
            title={soundActive ? "Mutar Sons (M)" : "Ativar Sons (M)"}
          >
            {soundActive ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-red-400" />
            )}
          </button>
        </div>
      </header>

      {/* Main ROM Deck */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 z-10">
        {/* Left Column: ROM Directory (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col rom-panel rounded-lg overflow-hidden">
          {/* List Title */}
          <div className="bg-[#161c29] px-4 py-3 border-b border-[#232c3d] flex items-center justify-between">
            <span className="font-pixel text-xs text-slate-300 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              <span>DIRETÓRIO DE JOGOS & APPS</span>
            </span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
              [ 4 ITENS ]
            </span>
          </div>

          {/* ROM List Items */}
          <div className="p-3 space-y-2 flex-1">
            {ROM_LIST.map((rom, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={rom.id}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-3.5 rounded transition-all flex items-center justify-between border ${
                    isSelected
                      ? "rom-selected border-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.15)] translate-x-1"
                      : "bg-[#0d1017] border-[#1d2433] hover:border-slate-600 hover:bg-[#121622] text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`font-pixel text-xs ${
                        isSelected ? "text-cyan-400 animate-pulse" : "text-slate-600"
                      }`}
                    >
                      {isSelected ? "▶" : `${idx + 1}.`}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono font-bold text-sm truncate ${
                            isSelected ? "text-white" : "text-slate-300"
                          }`}
                        >
                          {rom.romName}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono truncate mt-0.5">
                        {rom.genre}
                      </p>
                    </div>
                  </div>

                  <span className="text-xl ml-2 shrink-0">{rom.icon}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Help box */}
          <div className="p-3 bg-[#0c0e14] border-t border-[#1d2433] text-[11px] text-slate-400 font-mono flex items-center justify-between">
            <span>USE [▲/▼] OU CLIQUE PARA SELECIONAR</span>
            <span className="text-cyan-400 font-bold">[ENTER] BOOT</span>
          </div>
        </div>

        {/* Right Column: ROM Cartridge Deck & Specs (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col rom-panel rounded-lg overflow-hidden">
          {/* Cartridge Top Banner */}
          <div
            className={`p-5 md:p-6 bg-gradient-to-r ${selectedRom.boxColor} border-b border-[#232c3d] relative`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-2 py-0.5 rounded bg-black/50 border border-white/20 text-white font-mono text-[11px] mb-2 font-bold tracking-wide">
                  {selectedRom.system}
                </span>
                <h1 className="text-2xl md:text-3xl font-pixel text-white drop-shadow-md">
                  {selectedRom.title}
                </h1>
                <p className="text-sm md:text-base font-mono text-white/90 mt-1">
                  {selectedRom.subtitle}
                </p>
              </div>

              <div className="w-16 h-16 rounded-lg bg-black/40 border-2 border-white/30 flex items-center justify-center text-4xl shadow-inner shrink-0">
                {selectedRom.icon}
              </div>
            </div>
          </div>

          {/* ROM Details & Specs */}
          <div className="p-5 md:p-6 space-y-6 flex-1 bg-[#10141e]">
            {/* Overview & Description */}
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1.5 font-bold">
                // SÍNTESE DO PROJETO
              </span>
              <p className="text-sm md:text-base text-slate-200 leading-relaxed font-mono bg-[#0b0e14] p-4 rounded border border-[#1e2638]">
                {selectedRom.description}
              </p>
            </div>

            {/* Hardware & Tech Specs Grid */}
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-2 font-bold">
                // ESPECIFICAÇÕES TÉCNICAS (TECH STACK)
              </span>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                {selectedRom.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-3 rounded bg-[#0b0e14] border border-[#1e2638] flex flex-col justify-between"
                  >
                    <span className="text-slate-400 text-[11px]">{spec.label}</span>
                    <span className="text-cyan-300 font-bold text-sm mt-1 truncate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ASCII Preview & Status Line */}
            <div className="flex items-center justify-between p-3 rounded bg-[#090b10] border border-[#1a202e] text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold">DEPLOY PRONTO NA VERCEL</span>
              </div>
              <span className="text-slate-400">STATUS: {selectedRom.status}</span>
            </div>
          </div>

          {/* Boot & Launch Actions */}
          <div className="p-4 md:p-5 bg-[#0c0f17] border-t border-[#232c3d] flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => handleBoot(selectedRom)}
              disabled={isBooting}
              className="flex-1 sm:flex-none px-6 py-3 rounded bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-black font-mono font-bold text-sm flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isBooting ? "CARREGANDO ROM..." : "EXECUTAR PROJETO (VERCEL)"}</span>
            </button>

            {selectedRom.githubUrl && (
              <a
                href={selectedRom.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playCursor()}
                className="px-5 py-3 rounded bg-[#161c29] hover:bg-[#20293d] border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-mono text-sm flex items-center gap-2 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Ver Código (GitHub)</span>
              </a>
            )}
          </div>
        </div>
      </main>

      {/* Arcade Bottom Footer / Keybindings Bar */}
      <footer className="border-t-2 border-[#1e2638] bg-[#0c0f17] px-4 md:px-8 py-2.5 z-10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-[#182030] text-cyan-300 border border-slate-700 text-[10px]">
              ▲/▼
            </kbd>
            <span>Navegar</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-[#182030] text-cyan-300 border border-slate-700 text-[10px]">
              ENTER
            </kbd>
            <span>Executar ROM</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-[#182030] text-cyan-300 border border-slate-700 text-[10px]">
              G
            </kbd>
            <span>Abrir GitHub</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-[#182030] text-cyan-300 border border-slate-700 text-[10px]">
              M
            </kbd>
            <span>Mutar Áudio</span>
          </span>
        </div>

        <div className="text-[11px] text-slate-500">
          JAVAI-OS FLASH CART • 2024
        </div>
      </footer>
    </div>
  );
}
