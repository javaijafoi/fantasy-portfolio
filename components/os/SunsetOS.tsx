"use client";

import React, { useState } from "react";
import { CALIFORNIA_PROJECTS } from "@/data/projects";
import { EXTRA_PROJECTS, GITHUB_URL } from "@/lib/site";
import { OSProps } from "@/lib/os-config";
import { GithubIcon } from "@/components/Icons";
import {
  Play,
  SkipBack,
  SkipForward,
  Shuffle,
  Disc3,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function SunsetOS({
  selectedProject,
  selectedId,
  onSelectProject,
  onLaunch,
  clockText,
}: OSProps) {
  const [rackCollapsed, setRackCollapsed] = useState(false);

  const currentIdx = CALIFORNIA_PROJECTS.findIndex((p) => p.id === selectedId);
  const safeIdx = currentIdx === -1 ? 0 : currentIdx;

  const handlePrev = () => {
    const prevIdx = (safeIdx - 1 + CALIFORNIA_PROJECTS.length) % CALIFORNIA_PROJECTS.length;
    onSelectProject(CALIFORNIA_PROJECTS[prevIdx].id, prevIdx, false);
  };

  const handleNext = () => {
    const nextIdx = (safeIdx + 1) % CALIFORNIA_PROJECTS.length;
    onSelectProject(CALIFORNIA_PROJECTS[nextIdx].id, nextIdx, false);
  };

  const handleShuffleTrack = () => {
    const others = CALIFORNIA_PROJECTS.filter((p) => p.id !== selectedId);
    const pick = others[Math.floor(Math.random() * others.length)];
    const idx = CALIFORNIA_PROJECTS.findIndex((p) => p.id === pick.id);
    onSelectProject(pick.id, idx === -1 ? 0 : idx, false);
  };

  return (
    <div className="flex-1 flex flex-col justify-between california-bg synth-horizon text-slate-100 relative overflow-x-clip">
      {/* 80s California Sun Backdrop */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-60">
        <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-t from-pink-500 via-orange-500 to-yellow-300 shadow-[0_0_80px_rgba(255,42,133,0.45)] flex flex-col justify-end overflow-hidden">
          <div className="w-full h-3 bg-[#170936] mb-2" />
          <div className="w-full h-2.5 bg-[#170936] mb-2" />
          <div className="w-full h-2 bg-[#170936] mb-2" />
          <div className="w-full h-1.5 bg-[#170936] mb-2" />
        </div>
      </div>

      {/* Outrun Top Menu Bar */}
      <header className="relative z-10 bg-[#140726]/90 backdrop-blur-md border-b border-pink-500/40 px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-retro tracking-wider">
            🌴 SUNSET-OS &apos;88
          </span>
          <span className="hidden sm:inline text-pink-300 font-mono-code">
            AMIGA WORKBENCH // CASSETTE DECK
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono-code text-cyan-300">
          <span className="hidden sm:inline">FM 88.5 MHz</span>
          <span className="text-yellow-300">{clockText}</span>
        </div>
      </header>

      {/* Mobile Compact Walkman Mini-Deck (< lg) */}
      <div className="relative z-10 lg:hidden px-3 pt-3">
        <div className="glass-card rounded-2xl border border-pink-500/70 p-3 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-xs font-mono-code text-cyan-300 block">
                WALKMAN // FITA {String(safeIdx + 1).padStart(2, "0")} DE {CALIFORNIA_PROJECTS.length}
              </span>
              <h1 className="font-retro text-lg text-white truncate">
                {selectedProject.icon} {selectedProject.title}
              </h1>
            </div>
            <Disc3 className="w-7 h-7 text-pink-400 cassette-reel-spin shrink-0" />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Fita anterior"
              className="min-h-10 min-w-10 px-2.5 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center cursor-pointer"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onLaunch(selectedProject.vercelUrl)}
              className="flex-1 min-h-10 px-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-retro text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PLAY DEMO</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Próxima fita"
              className="min-h-10 min-w-10 px-2.5 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleShuffleTrack}
              aria-label="Sortear fita aleatória"
              className="min-h-10 min-w-10 px-2.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Outrun Workspace: Desktop Left Stereo Player + Right Stacked Cassette Spines */}
      <main className="relative z-10 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Desktop Sticky Stereo Cassette Deck */}
        <section
          aria-label="Player de Fita K7"
          className="hidden lg:block lg:col-span-6 glass-card rounded-2xl border-2 border-pink-500 overflow-hidden shadow-[0_0_35px_rgba(255,42,133,0.3)] lg:sticky lg:top-14"
        >
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-black font-retro px-4 py-2 text-xs flex items-center justify-between">
            <span>HI-FI CASSETTE PLAYER // TRACK {String(safeIdx + 1).padStart(2, "0")}</span>
            <span className="font-mono-code font-bold">DOLBY B NR</span>
          </div>

          <div className="p-5 space-y-4">
            {/* Visual Cassette Shell with Dual Reels */}
            <div className="rounded-xl bg-[#0d061b] border-2 border-cyan-400/50 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-code">
                <span className="text-yellow-300 font-bold">SIDE A // {selectedProject.tag}</span>
                <span className="text-pink-400">C-90 CHROME</span>
              </div>

              <div className="bg-gradient-to-r from-pink-600/30 via-purple-700/30 to-cyan-600/30 border border-white/15 rounded-lg px-4 py-3 flex items-center justify-between gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-pink-400 bg-black/70 flex items-center justify-center cassette-reel-spin shrink-0">
                  <div className="w-3 h-3 rounded-full border border-dashed border-white" />
                </div>

                <div className="flex-1 text-center min-w-0">
                  <div className="text-2xl">{selectedProject.icon}</div>
                  <h1 className="font-retro text-2xl text-white truncate">
                    {selectedProject.title}
                  </h1>
                </div>

                <div className="w-10 h-10 rounded-full border-2 border-cyan-400 bg-black/70 flex items-center justify-center cassette-reel-spin shrink-0">
                  <div className="w-3 h-3 rounded-full border border-dashed border-white" />
                </div>
              </div>

              {/* Transport Controls */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono-code flex items-center gap-1 cursor-pointer"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                  <span>PREV</span>
                </button>
                <button
                  type="button"
                  onClick={() => onLaunch(selectedProject.vercelUrl)}
                  className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-retro text-xs tracking-wider shadow-[0_0_20px_rgba(255,42,133,0.45)] cursor-pointer flex items-center justify-center gap-1.5 hover:brightness-110"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>PLAY DEMO</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono-code flex items-center gap-1 cursor-pointer"
                >
                  <span>NEXT</span>
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleShuffleTrack}
                  aria-label="Sortear outra fita"
                  title="Shuffle"
                  className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 cursor-pointer"
                >
                  <Shuffle className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm font-medium text-cyan-300">
              {selectedProject.tagline}
            </p>

            <p className="text-sm text-slate-200 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="flex items-center justify-between gap-3 flex-wrap pt-2 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 rounded bg-white/10 border border-white/15 text-pink-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium flex items-center gap-1.5"
                >
                  <GithubIcon className="w-4 h-4 text-pink-400" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Cassette Spine Rack (Stacked Horizontal Tape Spines — no grid orphan holes) */}
        <section
          aria-label="Estante de Fitas Cassete"
          className="lg:col-span-6 glass-card rounded-2xl border border-cyan-400/40 overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.16)]"
        >
          <div className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-black font-retro px-4 py-2 text-xs flex items-center justify-between">
            <span>📼 CASSETTE_RACK.DRV // {CALIFORNIA_PROJECTS.length} FITAS</span>
            <button
              type="button"
              onClick={() => setRackCollapsed((prev) => !prev)}
              aria-label={rackCollapsed ? "Expandir estante" : "Recolher estante"}
              className="px-2 py-0.5 bg-black/20 hover:bg-black/30 rounded font-mono-code font-bold cursor-pointer flex items-center gap-1"
            >
              {rackCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              <span>{rackCollapsed ? "[ + ]" : "[ _ ]"}</span>
            </button>
          </div>

          {!rackCollapsed && (
            <div className="p-3 space-y-2">
              {CALIFORNIA_PROJECTS.map((proj, idx) => {
                const isSelected = proj.id === selectedId;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => onSelectProject(proj.id, idx, true)}
                    className={`w-full text-left cursor-pointer rounded-xl px-3 py-2.5 min-h-12 border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-pink-500/25 border-pink-400 shadow-[0_0_16px_rgba(255,42,133,0.4)]"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-400/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono-code text-xs text-cyan-300 shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xl shrink-0">{proj.icon}</span>
                      <div className="min-w-0">
                        <div className="font-retro text-sm sm:text-base text-white truncate">
                          {proj.title}
                        </div>
                        <p className="text-xs text-pink-200/85 truncate">
                          {proj.tagline}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono-code px-2 py-0.5 rounded bg-black/40 border border-white/15 text-yellow-300 shrink-0">
                      SIDE A
                    </span>
                  </button>
                );
              })}

              {/* Bonus Tracks */}
              <div className="pt-2 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono-code text-cyan-300">BONUS TRACKS (SIDE B):</span>
                <div className="flex flex-wrap gap-2">
                  {EXTRA_PROJECTS.map((ep) => (
                    <a
                      key={ep.name}
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-pink-200 font-medium"
                    >
                      📼 {ep.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="relative z-10 bg-[#0d041c]/90 border-t border-white/15 px-4 sm:px-6 py-3 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
        <span>🌴 SUNSET-OS &apos;88 • PETER (@javaijafoi) • SÃO PAULO</span>
        <div className="flex gap-4">
          <a href="/llms.txt" className="hover:text-yellow-300">
            /llms.txt
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
