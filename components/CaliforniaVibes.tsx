"use client";

import React, { useState } from "react";
import { CALIFORNIA_PROJECTS } from "@/data/projects";
import { sound } from "@/lib/sound";
import { GithubIcon } from "./Icons";
import {
  Volume2,
  VolumeX,
  Play,
  ArrowUpRight,
} from "lucide-react";

export default function CaliforniaVibes() {
  const [selectedId, setSelectedId] = useState<string>(CALIFORNIA_PROJECTS[0].id);
  const [soundOn, setSoundOn] = useState(true);

  const selectedProject =
    CALIFORNIA_PROJECTS.find((p) => p.id === selectedId) || CALIFORNIA_PROJECTS[0];

  const handleSelect = (id: string, idx: number) => {
    const freqs = [329.63, 392.0, 440.0, 523.25];
    sound.playSynthNote(freqs[idx % freqs.length]);
    setSelectedId(id);
  };

  const toggleSound = () => {
    const newState = sound.toggleMute();
    setSoundOn(newState);
  };

  return (
    <div className="min-h-screen w-full california-bg text-slate-100 flex flex-col justify-between relative overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* Synthwave Sunset Visual Header */}
      <div className="absolute top-0 left-0 right-0 h-96 pointer-events-none overflow-hidden flex justify-center opacity-70">
        {/* Striped 80s California Sun */}
        <div className="relative w-80 h-80 rounded-full bg-gradient-to-t from-pink-500 via-orange-500 to-yellow-400 mt-6 blur-[1px] shadow-[0_0_80px_rgba(255,42,133,0.5)] flex flex-col justify-end overflow-hidden">
          {/* Horizontal sunset stripes */}
          <div className="w-full h-3 bg-[#170936] mb-2 opacity-90" />
          <div className="w-full h-2.5 bg-[#170936] mb-2 opacity-90" />
          <div className="w-full h-2 bg-[#170936] mb-2 opacity-90" />
          <div className="w-full h-1.5 bg-[#170936] mb-2 opacity-90" />
          <div className="w-full h-1 bg-[#170936] mb-2 opacity-90" />
          <div className="w-full h-0.5 bg-[#170936] mb-2 opacity-90" />
        </div>
      </div>

      {/* Top Navbar */}
      <header className="relative z-20 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 to-yellow-400 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(255,42,133,0.5)]">
            🌴
          </div>
          <div>
            <span className="font-retro text-2xl md:text-3xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 drop-shadow-md">
              CALIFORNIA DREAMS
            </span>
            <div className="flex items-center gap-2 text-xs font-medium text-pink-300/80">
              <span>PETER // @javaijafoi</span>
              <span>•</span>
              <span className="text-cyan-300">SUMMER ARCADE EDITION</span>
            </div>
          </div>
        </div>

        {/* Header Socials & Controls */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/javaijafoi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSynthNote(440)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-pink-500/50 text-sm font-medium transition-all hover:scale-105"
          >
            <GithubIcon className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? "Mutar Sons 80s" : "Ativar Sons 80s"}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-yellow-300 transition-all cursor-pointer"
            title={soundOn ? "Mutar Sons 80s" : "Ativar Sons 80s"}
          >
            {soundOn ? (
              <Volume2 className="w-4 h-4 text-yellow-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-red-400" />
            )}
          </button>
        </div>
      </header>

      {/* Main Showcase Section */}
      <main className="relative z-20 max-w-7xl w-full mx-auto px-6 py-6 flex-1 flex flex-col justify-center">
        {/* Hero Tagline */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 font-retro text-xs tracking-widest uppercase mb-3 neon-glow-pink">
            ★ SELECT YOUR TRACK // {CALIFORNIA_PROJECTS.length} PROJETOS NO AR ★
          </span>
          <h1 className="font-retro text-3xl md:text-5xl text-white tracking-wide">
            COISAS QUE EU FIZ
            <span className="sr-only"> | Peter (@javaijafoi): jogos, histórias interativas e experimentos com IA</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-2 font-normal">
            Projetos pessoais, todos rodando agora. Escolha uma fita no deck para jogar, ler ou abrir o código.
          </p>
        </div>

        {/* Interactive Fluid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CALIFORNIA_PROJECTS.map((proj, idx) => {
            const isSelected = proj.id === selectedId;
            return (
              <div
                key={proj.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => handleSelect(proj.id, idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(proj.id, idx);
                  }
                }}
                className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isSelected
                    ? "glass-card ring-2 ring-pink-500 scale-[1.03] shadow-[0_20px_40px_rgba(255,42,133,0.3)] bg-[#21113c]/90"
                    : "glass-card hover:bg-white/10 hover:scale-[1.01]"
                }`}
              >
                {/* Card Top Tag */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-retro px-2.5 py-1 rounded-full border ${proj.badgeColor}`}
                    >
                      {proj.rating}
                    </span>
                    <span className="text-2xl filter drop-shadow">{proj.icon}</span>
                  </div>

                  <span className="text-[11px] font-mono tracking-wider text-pink-400/90 block mb-1">
                    {proj.tag}
                  </span>

                  <h3 className="font-retro text-2xl text-white group-hover:text-pink-300 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-cyan-300 font-medium mt-1 mb-3">
                    {proj.tagline}
                  </p>

                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-4">
                    {proj.description}
                  </p>
                </div>

                {/* Card Bottom / Stacks & Actions */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={proj.vercelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playLaunchChord();
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-retro text-xs tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(255,42,133,0.4)] transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>ABRIR DEMO</span>
                    </a>

                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playSynthNote(440);
                        }}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 text-slate-200 hover:text-white transition-all"
                        title={`Ver repositório de ${proj.title} no GitHub`}
                        aria-label={`Ver repositório de ${proj.title} no GitHub`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Project Highlight Spotlight */}
        <div className="mt-8 p-6 md:p-8 rounded-3xl glass-card border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xl">{selectedProject.icon}</span>
              <span className="font-retro text-xs text-yellow-400 tracking-widest uppercase">
                SPOTLIGHT // {selectedProject.title}
              </span>
            </div>
            <h4 className="font-retro text-2xl md:text-3xl text-white">
              {selectedProject.tagline}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedProject.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSynthNote(440)}
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm flex items-center gap-2 transition-all hover:scale-105"
              >
                <GithubIcon className="w-4 h-4 text-pink-400" />
                <span>Código no GitHub</span>
              </a>
            )}

            <a
              href={selectedProject.vercelUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playLaunchChord()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white font-retro text-sm tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(255,42,133,0.5)] transition-all hover:scale-105 cursor-pointer"
            >
              <span>EXPERIMENTAR AGORA</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      {/* Synthwave Beach Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-[#0e0622]/80 backdrop-blur-md px-6 py-4 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <span>🌴</span>
            <span>CALIFORNIA VIBES &apos;88 • JAVAI-OS</span>
            <span>•</span>
            <span className="text-pink-400">PETER (@javaijafoi) • SÃO PAULO, BRASIL</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors"
              title="Formato de texto para agentes e modelos de linguagem"
            >
              llms.txt
            </a>
            <span>•</span>
            <a
              href="https://github.com/javaijafoi/fantasy-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              Código deste site
            </a>
            <span>•</span>
            <a
              href="https://github.com/javaijafoi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              Repositórios no GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
