"use client";

import React from "react";
import { CALIFORNIA_PROJECTS } from "@/data/projects";
import { EXTRA_PROJECTS, GITHUB_URL } from "@/lib/site";
import { OSProps } from "@/lib/os-config";
import { GithubIcon } from "@/components/Icons";
import { Dices, ScrollText, Sparkles } from "lucide-react";

export default function ArcanaOS({
  selectedProject,
  selectedId,
  onSelectProject,
  onLaunch,
  d20Roll,
  onRollD20,
}: OSProps) {
  const isCrit = d20Roll === 20;
  const isFumble = d20Roll === 1;

  return (
    <div
      className="flex-1 flex flex-col justify-between bg-[#100b08] text-[#e8d8b9] font-grimoire relative"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 18%, rgba(168, 120, 44, 0.24) 0%, rgba(16, 11, 8, 0.96) 72%)",
      }}
    >
      {/* Ornate RPG Top HUD */}
      <header className="bg-[#18110c] border-b-2 border-[#b48a3e] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg">
        <div className="flex items-center gap-2.5">
          <span className="text-xl" aria-hidden="true">
            ⚜️
          </span>
          <div>
            <span className="font-arcane font-bold text-sm sm:text-base text-[#f5c542] tracking-wider block">
              ARCANA OS // GRIMÓRIO DE JAVAI
            </span>
            <span className="text-xs text-[#b5a282]">
              Peter (@javaijafoi) • Lvl 99 Technomancer
            </span>
          </div>
        </div>

        {/* RPG Stats & Live 1d20 Roller */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono-code text-xs">
          <span className="hidden sm:inline-block px-2.5 py-1 bg-[#261710] border border-red-800/60 text-red-300 rounded">
            ♥ HP 120/120
          </span>
          <span className="hidden md:inline-block px-2.5 py-1 bg-[#111e29] border border-sky-700/60 text-sky-300 rounded">
            ✦ MANA {CALIFORNIA_PROJECTS.length}/{CALIFORNIA_PROJECTS.length}
          </span>
          <button
            type="button"
            onClick={onRollD20}
            className={`min-h-9 px-3 py-1 border-2 font-bold rounded flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
              isCrit
                ? "bg-[#432c10] border-[#ffd875] text-[#ffd875] shadow-[0_0_16px_rgba(245,197,66,0.5)]"
                : isFumble
                  ? "bg-[#341212] border-red-500 text-red-300"
                  : "bg-[#2c1f14] hover:bg-[#3f2c1c] border-[#f5c542] text-[#f5c542]"
            }`}
            title="Rolar 1d20 para sortear um Tomo"
          >
            <Dices className="w-4 h-4" />
            <span>
              1d20: {d20Roll}
              {isCrit ? " (CRÍTICO!)" : isFumble ? " (FALHA!)" : ""}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Compact Rolled Tome Banner (< lg) */}
      <div className="lg:hidden px-3 pt-3">
        <button
          type="button"
          onClick={() => {
            const idx = CALIFORNIA_PROJECTS.findIndex((p) => p.id === selectedId);
            onSelectProject(selectedProject.id, idx === -1 ? 0 : idx, true);
          }}
          className="w-full p-3 bg-[#24180f] border-2 border-[#d4a94e] flex items-center justify-between gap-2 text-left cursor-pointer"
        >
          <div className="min-w-0">
            <span className="text-xs font-mono-code text-[#f5c542] block">
              ✦ TOMO EQUIPADO (TOQUE PARA ABRIR)
            </span>
            <span className="font-arcane text-sm font-bold text-[#fff6e0] truncate block">
              {selectedProject.icon} {selectedProject.title}
            </span>
          </div>
          <span className="px-2.5 py-1 bg-[#8c6728] text-[#100b08] font-arcane font-bold text-xs border border-[#fff3d1] shrink-0">
            INSPECIONAR
          </span>
        </button>
      </div>

      {/* Main Grimoire Spread (Open Book Layout — Distinct from card grids) */}
      <main className="max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Page: Illuminated Tome Index List */}
        <section
          aria-label="Índice do Grimório"
          className="lg:col-span-6 bg-[#17110b]/95 border-2 border-[#8c6728] p-3 sm:p-4 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center justify-between border-b border-[#8c6728]/60 pb-2 mb-3">
            <span className="font-arcane text-xs sm:text-sm font-bold text-[#f5c542] uppercase tracking-wider flex items-center gap-2">
              <ScrollText className="w-4 h-4" />
              <span>Índice de Tomos ({CALIFORNIA_PROJECTS.length})</span>
            </span>
            <span className="text-xs font-mono-code text-[#b5a282]">
              Grimório Vivo
            </span>
          </div>

          <div className="divide-y divide-[#4a3720]/70">
            {CALIFORNIA_PROJECTS.map((proj, idx) => {
              const isSelected = proj.id === selectedId;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => onSelectProject(proj.id, idx, true)}
                  className={`w-full text-left px-3 py-2.5 min-h-12 flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#312113] border-l-4 border-[#f5c542] text-[#fff6e0]"
                      : "hover:bg-[#22170e] text-[#d5c3a1]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">{proj.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-arcane text-sm font-bold truncate">
                          {proj.title}
                        </span>
                      </div>
                      <p className="text-xs text-[#b5a282] truncate italic">
                        {proj.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline text-xs font-mono-code text-[#f5c542] px-1.5 py-0.5 bg-[#120d09] border border-[#6e5020]">
                      {proj.rating}
                    </span>
                    <span className="text-xs text-[#f5c542]">▸</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Relíquias Extras inside left page */}
          <div className="mt-4 pt-3 border-t border-[#8c6728]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-arcane text-[#f5c542] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Relíquias Extras:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {EXTRA_PROJECTS.map((ep) => (
                <a
                  key={ep.name}
                  href={ep.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-[#120d09] border border-[#8c6728] text-[#f5c542] hover:bg-[#2c1f14]"
                >
                  ⚜ {ep.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Right Page (Desktop Sticky): Equipped Artifact Scroll */}
        <section
          aria-label="Pergaminho do Artefato Equipado"
          className="hidden lg:block lg:col-span-6 bg-[#21170f] border-2 border-[#d4a94e] p-6 shadow-[inset_0_0_40px_rgba(0,0,0,0.85)] space-y-5 lg:sticky lg:top-14"
        >
          <div className="flex items-center justify-between border-b-2 border-[#8c6728] pb-3.5">
            <div>
              <span className="text-xs font-mono-code uppercase tracking-widest text-[#f5c542]">
                ARTEFATO EQUIPADO // {selectedProject.tag}
              </span>
              <h2 className="font-arcane text-2xl md:text-3xl font-bold text-[#fff6e0] mt-1">
                {selectedProject.icon} {selectedProject.title}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-[#f5c542] bg-[#120d09] flex items-center justify-center text-2xl shrink-0">
              {selectedProject.icon}
            </div>
          </div>

          <blockquote className="text-base text-[#f5c542] italic border-l-2 border-[#f5c542] pl-3.5">
            &ldquo;{selectedProject.tagline}&rdquo;
          </blockquote>

          <p className="text-sm sm:text-base text-[#e8d8b9] leading-relaxed">
            {selectedProject.description}
          </p>

          <div className="space-y-2 pt-2 border-t border-[#8c6728]/60">
            <span className="font-arcane text-xs uppercase tracking-wider text-[#b5a282] block">
              Runas de Conjuração:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedProject.techStack.map((s) => (
                <span
                  key={s}
                  className="text-xs font-mono-code px-2.5 py-1 bg-[#120d09] border border-[#8c6728] text-[#f5c542]"
                >
                  ✦ {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => onLaunch(selectedProject.vercelUrl)}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-[#8c6728] via-[#cfa046] to-[#8c6728] hover:brightness-110 text-[#110d0a] font-arcane font-bold text-xs uppercase tracking-widest border border-[#fff3d1] cursor-pointer shadow-lg"
            >
              ⚔ Conjurar Portal (Abrir Demo)
            </button>
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#120d09] hover:bg-[#1b140e] text-[#f5c542] border border-[#8c6728] font-arcane text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Códice</span>
              </a>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-[#140e0a] border-t border-[#8c6728] px-4 sm:px-6 py-3 text-xs text-[#b5a282] flex flex-wrap items-center justify-between gap-2">
        <span>⚜ ARCANA OS • PETER (@javaijafoi) • SÃO PAULO</span>
        <div className="flex gap-4">
          <a href="/llms.txt" className="text-[#f5c542] hover:underline">
            Pergaminho (/llms.txt)
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e8d8b9] hover:underline"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
