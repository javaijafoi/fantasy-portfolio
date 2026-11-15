"use client";

import React, { useState, useEffect } from "react";
import { CALIFORNIA_PROJECTS, ProjectCard } from "@/data/projects";
import { sound } from "@/lib/sound";
import { GithubIcon } from "./Icons";
import {
  Volume2,
  VolumeX,
  ExternalLink,
  Play,
  Sparkles,
  ArrowUpRight,
  Smile,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function CaliforniaVibes() {
  const [selectedId, setSelectedId] = useState<string>(CALIFORNIA_PROJECTS[0].id);
  const [soundOn, setSoundOn] = useState(true);
  const [kidsMode, setKidsMode] = useState<boolean>(true); // Defaults to TRUE (KIDS MODE ON)

  // Read saved cache from localStorage on client mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem("peter_kids_mode_cache");
      if (cached !== null) {
        setKidsMode(cached === "true");
      } else {
        setKidsMode(true);
      }
    } catch {
      // Ignore localStorage restrictions
    }
  }, []);

  const handleToggleKidsMode = () => {
    const nextVal = !kidsMode;
    setKidsMode(nextVal);
    sound.playSynthNote(nextVal ? 659.25 : 329.63);
    try {
      localStorage.setItem("peter_kids_mode_cache", String(nextVal));
    } catch {
      // Ignore cache error
    }
  };

  const selectedProject =
    CALIFORNIA_PROJECTS.find((p) => p.id === selectedId) || CALIFORNIA_PROJECTS[0];

  const handleSelect = (id: string, idx: number) => {
    const freqs = [329.63, 392.0, 440.0, 523.25];
    sound.playSynthNote(freqs[idx % freqs.length]);
    setSelectedId(id);
  };

  const handleLaunch = (url: string) => {
    sound.playLaunchChord();
    setTimeout(() => {
      window.open(url, "_blank");
    }, 250);
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
          <div className="w-full h-3 bg-[#170936] mb-2 opacity-90" />
          <div className="w-full h-2.5 bg-[#170936] mb-2 opacity-90" />
          <div className="w-full h-2 bg-[#170936] mb-2 opacity-90" />
          <div className="w-full h-1.5 bg-[#170936] mb-2 opacity-90" />
          <div className="w-full h-1 bg-[#170936] mb-2 opacity-90" />
          <div className="w-full h-0.5 bg-[#170936] mb-2 opacity-90" />
        </div>
      </div>

      {/* Top Navbar */}
      <header className="relative z-20 max-w-7xl w-full mx-auto px-6 py-5 flex items-center justify-between">
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

          <a
            href="https://vercel.com/peters-projects-e3041d69"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSynthNote(523)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-500/50 text-sm font-medium transition-all hover:scale-105"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Vercel</span>
          </a>

          <button
            onClick={toggleSound}
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

      {/* Prominent KIDS MODE / MODO FÁCIL Banner & Controller */}
      <div className="relative z-30 max-w-7xl w-full mx-auto px-6 mb-4">
        <div
          className={`rounded-2xl p-4 md:p-5 transition-all duration-300 border shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 ${
            kidsMode
              ? "bg-gradient-to-r from-amber-500/25 via-pink-600/30 to-purple-600/25 border-yellow-400/80 shadow-[0_0_35px_rgba(250,204,21,0.25)]"
              : "bg-white/5 border-white/10"
          }`}
        >
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform ${
                kidsMode
                  ? "bg-gradient-to-br from-yellow-400 to-pink-500 shadow-[0_0_20px_rgba(250,204,21,0.6)] scale-110 animate-bounce"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {kidsMode ? "⭐" : "🎮"}
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span
                  className={`font-retro text-lg md:text-xl tracking-wide ${
                    kidsMode ? "text-yellow-300 drop-shadow" : "text-slate-300"
                  }`}
                >
                  {kidsMode
                    ? "MODO KIDS & MODO FÁCIL: ATIVADO!"
                    : "MODO KIDS & FÁCIL: DESLIGADO"}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                    kidsMode
                      ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/50"
                      : "bg-slate-700 text-slate-300 border-slate-600"
                  }`}
                >
                  {kidsMode ? "SUPER AMIGÁVEL" : "MODO PADRÃO"}
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-200 mt-1">
                {kidsMode
                  ? "✨ Dicas fáceis de 1-clique, linguagem simples e jogabilidade amigável habilitadas em todos os jogos!"
                  : "Visual técnico e descrições completas ativados. Você pode religar o Modo Kids a qualquer momento."}
              </p>
            </div>
          </div>

          {/* Toggle Switch with localStorage indicator */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-slate-300 hidden sm:inline">
              {kidsMode ? "Salva automático no navegador:" : "Ligar Modo Kids:"}
            </span>
            <button
              onClick={handleToggleKidsMode}
              className={`px-5 py-2.5 rounded-xl font-retro text-xs tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 ${
                kidsMode
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-950 font-bold border border-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              }`}
            >
              <span>{kidsMode ? "DESLIGAR MODO KIDS" : "ATIVAR MODO KIDS ⭐"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Showcase Section */}
      <main className="relative z-20 max-w-7xl w-full mx-auto px-6 py-4 flex-1 flex flex-col justify-center">
        {/* Hero Tagline */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 font-retro text-xs tracking-widest uppercase mb-2 neon-glow-pink">
            ★ SELECT YOUR TRACK // {CALIFORNIA_PROJECTS.length} JOGOS & PROJETOS ★
          </span>
          <h2 className="font-retro text-3xl md:text-5xl text-white tracking-wide">
            {kidsMode ? "ESCOLHA SEU JOGO FAVORITO!" : "PROJETOS COM VIBE DOS ANOS 80"}
          </h2>
          <p className="text-slate-300 text-sm md:text-base mt-2 font-normal">
            {kidsMode
              ? "Cada jogo abaixo tem um super Modo Fácil preparado para jogar direto no navegador sem complicação!"
              : "Escolha uma fita no deck abaixo para conferir o projeto rodando na Vercel ou inspecionar o código-fonte no GitHub."}
          </p>
        </div>

        {/* Interactive Fluid Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CALIFORNIA_PROJECTS.map((proj, idx) => {
            const isSelected = proj.id === selectedId;
            return (
              <div
                key={proj.id}
                onClick={() => handleSelect(proj.id, idx)}
                className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "glass-card ring-2 ring-pink-500 scale-[1.03] shadow-[0_20px_40px_rgba(255,42,133,0.3)] bg-[#21113c]/90"
                    : "glass-card hover:bg-white/10 hover:scale-[1.01]"
                }`}
              >
                {/* Card Top Tag */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-retro px-2.5 py-1 rounded-full border ${
                        kidsMode
                          ? "bg-yellow-400/25 text-yellow-300 border-yellow-400/50 font-bold"
                          : proj.badgeColor
                      }`}
                    >
                      {kidsMode ? "⭐ MODO FÁCIL" : proj.rating}
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

                  {/* Description: simplified if kidsMode is ON */}
                  <p className="text-slate-200 text-xs leading-relaxed mb-4">
                    {kidsMode ? proj.easyMode.simplifiedDesc : proj.description}
                  </p>

                  {/* Kids Mode Perks Box */}
                  {kidsMode && (
                    <div className="p-3 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-[11px] text-yellow-200 space-y-1 mb-4">
                      <div className="font-bold text-yellow-300 flex items-center gap-1">
                        <span>✨</span>
                        <span>Vantagens do Modo Fácil:</span>
                      </div>
                      <ul className="space-y-0.5 text-[10px] text-slate-300 list-disc list-inside">
                        {proj.easyMode.perks.slice(0, 2).map((perk, i) => (
                          <li key={i}>{perk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Bottom / Stacks & Actions */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  {/* Tech Badges / Easy Tip */}
                  {kidsMode ? (
                    <div className="text-[11px] text-emerald-300 font-medium">
                      {proj.easyMode.tip}
                    </div>
                  ) : (
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
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLaunch(proj.vercelUrl);
                      }}
                      className={`flex-1 py-2.5 px-3 rounded-xl font-retro text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        kidsMode
                          ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(250,204,21,0.5)] hover:scale-105"
                          : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-[0_0_15px_rgba(255,42,133,0.4)]"
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{kidsMode ? "JOGAR MODO FÁCIL 🚀" : "ABRIR DEMO"}</span>
                    </button>

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
                        title="Ver Repositório no GitHub"
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

          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xl">{selectedProject.icon}</span>
              <span className="font-retro text-xs text-yellow-400 tracking-widest uppercase">
                SPOTLIGHT // {selectedProject.title}
              </span>
              {kidsMode && (
                <span className="text-[10px] bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded-full border border-yellow-400/40 font-bold">
                  MODO FÁCIL DISPONÍVEL
                </span>
              )}
            </div>
            <h4 className="font-retro text-2xl md:text-3xl text-white">
              {selectedProject.tagline}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {kidsMode
                ? selectedProject.easyMode.simplifiedDesc
                : selectedProject.description}
            </p>

            {kidsMode && (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-yellow-400/10 via-pink-500/10 to-transparent border border-yellow-400/30 text-xs text-yellow-200 space-y-1">
                <div className="font-bold text-yellow-300">
                  {selectedProject.easyMode.label}
                </div>
                <div className="text-slate-300 text-xs">
                  {selectedProject.easyMode.tip}
                </div>
              </div>
            )}
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

            <button
              onClick={() => handleLaunch(selectedProject.vercelUrl)}
              className={`px-6 py-3 rounded-2xl font-retro text-sm tracking-wider flex items-center gap-2 transition-all hover:scale-105 cursor-pointer shadow-lg ${
                kidsMode
                  ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-slate-950 font-bold shadow-[0_0_25px_rgba(250,204,21,0.6)]"
                  : "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white shadow-[0_0_25px_rgba(255,42,133,0.5)]"
              }`}
            >
              <span>{kidsMode ? "JOGAR NO MODO FÁCIL" : "EXPERIMENTAR NA VERCEL"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Synthwave Beach Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-[#0e0622]/80 backdrop-blur-md px-6 py-4 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <span>🌴</span>
            <span>CALIFORNIA VIBES '88 • JAVAI-OS</span>
            <span>•</span>
            <span className="text-pink-400">DESENVOLVIDO POR PETER (@javaijafoi)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="text-yellow-400/90 font-mono text-[11px]">
              {kidsMode ? "⭐ Modo Kids Ativo" : "🕹️ Modo Padrão Ativo"}
            </span>
            <span>•</span>
            <a
              href="https://vercel.com/peters-projects-e3041d69"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              Hospedado na Vercel
            </a>
            <span>•</span>
            <a
              href="https://github.com/javaijafoi/fantasy-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              Repositório no GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
