"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/data/projects";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import {
  ExternalLink,
  Award,
  Sparkles,
  Search,
  CheckCircle2,
  Bookmark,
  Sword,
  Gamepad2,
  Wrench,
  BookOpen
} from "lucide-react";
import { GithubIcon } from "./Icons";

interface QuestLogWindowProps {
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
}

export default function QuestLogWindow({ onClose, onFocus, zIndex }: QuestLogWindowProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS[0].id);
  const [claimedRewards, setClaimedRewards] = useState<Record<string, boolean>>({});

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.questName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techs.some((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  const handleClaim = (project: Project) => {
    if (claimedRewards[project.id]) return;
    sound.playLevelUp();
    setClaimedRewards((prev) => ({ ...prev, [project.id]: true }));

    // Pixelated celebration
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#8b5cf6", "#10b981", "#3b82f6"],
    });
  };

  const getRankColor = (rank: Project["rank"]) => {
    switch (rank) {
      case "SSR":
        return "bg-amber-500/20 text-amber-300 border-amber-500/60";
      case "S":
        return "bg-purple-500/20 text-purple-300 border-purple-500/60";
      case "A":
        return "bg-blue-500/20 text-blue-300 border-blue-500/60";
      case "B":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/60";
    }
  };

  return (
    <div
      onClick={onFocus}
      style={{ zIndex }}
      className="absolute top-8 left-4 right-4 md:left-24 md:right-24 bottom-16 md:bottom-20 max-w-5xl mx-auto flex flex-col retro-box-raised overflow-hidden shadow-2xl"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 border-b-2 border-indigo-950 text-white font-pixel text-xs tracking-wider cursor-move">
        <div className="flex items-center gap-2">
          <span>📜</span>
          <span className="truncate">LIVRO DE MISSÕES (QUEST LOG) - PROJETOS DO ÉTER</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playCloseWindow();
              onClose();
            }}
            className="w-5 h-5 flex items-center justify-center bg-red-800 hover:bg-red-700 active:bg-red-900 border-t border-l border-red-400 border-b border-r border-red-950 text-white text-xs font-bold leading-none"
            title="Fechar Janela"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-900/95">
        {/* Left Column: Categories and Quest List */}
        <div className="w-full md:w-80 border-b-2 md:border-b-0 md:border-r-2 border-[#141521] flex flex-col bg-[#161722]">
          {/* Search Bar */}
          <div className="p-2 border-b border-slate-800">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar missão ou runa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0e0f17] border border-slate-700 px-7 py-1 text-xs text-slate-200 placeholder-slate-500 font-pixel-text focus:outline-none focus:border-indigo-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-2" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1.5 bg-[#12131c] border-b border-slate-800 text-[10px] font-pixel">
            <button
              onClick={() => {
                sound.playSelect();
                setSelectedCategory("all");
              }}
              className={`p-1.5 text-center transition-colors truncate ${
                selectedCategory === "all"
                  ? "bg-indigo-700 text-white font-bold"
                  : "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              Tudo ({PROJECTS.length})
            </button>
            <button
              onClick={() => {
                sound.playSelect();
                setSelectedCategory("games");
              }}
              className={`p-1.5 text-center transition-colors truncate ${
                selectedCategory === "games"
                  ? "bg-indigo-700 text-white font-bold"
                  : "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              Jogos
            </button>
            <button
              onClick={() => {
                sound.playSelect();
                setSelectedCategory("rpg");
              }}
              className={`p-1.5 text-center transition-colors truncate ${
                selectedCategory === "rpg"
                  ? "bg-indigo-700 text-white font-bold"
                  : "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              RPG
            </button>
            <button
              onClick={() => {
                sound.playSelect();
                setSelectedCategory("tools");
              }}
              className={`p-1.5 text-center transition-colors truncate ${
                selectedCategory === "tools"
                  ? "bg-indigo-700 text-white font-bold"
                  : "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              IA/Tools
            </button>
          </div>

          {/* Scrollable Quest List */}
          <div className="flex-1 overflow-y-auto p-1 space-y-1">
            {filteredProjects.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 font-pixel-text">
                Nenhum artefato encontrado na névoa...
              </div>
            ) : (
              filteredProjects.map((project) => {
                const isSelected = project.id === selectedProjectId;
                const isClaimed = claimedRewards[project.id];
                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedProjectId(project.id);
                    }}
                    className={`p-2 cursor-pointer border transition-all text-left flex items-start gap-2.5 ${
                      isSelected
                        ? "bg-indigo-950/70 border-indigo-500 text-amber-200"
                        : "bg-[#1a1b2a] border-slate-800 text-slate-300 hover:bg-[#222438] hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xl mt-0.5">{project.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-pixel text-[11px] truncate text-slate-100">
                          {project.title}
                        </span>
                        <span
                          className={`text-[9px] font-pixel px-1 py-0.5 border ${getRankColor(
                            project.rank
                          )}`}
                        >
                          {project.rank}
                        </span>
                      </div>
                      <p className="font-pixel-text text-xs text-slate-400 truncate mt-0.5">
                        {project.questName}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-amber-400/90 font-mono">
                        <span>⭐ +{project.xpReward} XP</span>
                        {isClaimed && (
                          <span className="text-emerald-400 flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Resgatado
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Quest Details & Actions */}
        <div className="flex-1 flex flex-col bg-[#12131d] overflow-y-auto">
          {/* Header Banner */}
          <div className="p-4 md:p-5 border-b border-slate-800 bg-gradient-to-r from-indigo-950/60 to-purple-950/40">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedProject.icon}</span>
                <span
                  className={`text-xs font-pixel px-2 py-0.5 border ${getRankColor(
                    selectedProject.rank
                  )}`}
                >
                  RANK {selectedProject.rank}
                </span>
                <span className="text-xs font-mono text-indigo-400 px-2 py-0.5 bg-indigo-950/80 border border-indigo-800/60">
                  NÍVEL {selectedProject.level}
                </span>
                <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 bg-emerald-950/80 border border-emerald-800/60">
                  {selectedProject.categoryLabel}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-pixel text-amber-400">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>RECOMPENSA: +{selectedProject.xpReward} XP</span>
              </div>
            </div>

            <h2 className="text-lg md:text-xl font-pixel text-amber-300 tracking-wide mt-1">
              {selectedProject.title}
            </h2>
            <h3 className="font-pixel-text text-base text-indigo-200 mt-0.5">
              &quot;{selectedProject.questName}&quot;
            </h3>
          </div>

          {/* Quest Content */}
          <div className="p-4 md:p-6 space-y-5 flex-1">
            {/* Lore Box */}
            <div className="retro-box-sunken p-3.5 bg-[#0b0c13]">
              <div className="flex items-center gap-2 text-indigo-400 font-pixel text-xs mb-1.5">
                <Bookmark className="w-3.5 h-3.5" />
                <span>RELATO DA MISSÃO (LORE)</span>
              </div>
              <p className="font-pixel-text text-sm md:text-base text-slate-300 leading-relaxed">
                {selectedProject.lore}
              </p>
            </div>

            {/* Tech Loot & Runes */}
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-pixel text-xs mb-2.5">
                <Sword className="w-3.5 h-3.5" />
                <span>RUNAS & ARTEFATOS UTILIZADOS (LOOT / TECH)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedProject.techs.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-[#1b1c2b] border border-slate-700 flex flex-col justify-between"
                  >
                    <span className="font-pixel text-[10px] text-slate-200 truncate">
                      {tech.name}
                    </span>
                    <span className="font-mono text-xs text-emerald-400 mt-1 font-semibold">
                      {tech.bonus}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quest Status */}
            <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800">
              <span className="font-pixel text-xs text-slate-400">STATUS DA MISSÃO:</span>
              <span className="font-pixel text-xs text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> FORJADO & ATIVO NA NUVEM
              </span>
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="p-3 md:p-4 border-t border-slate-800 bg-[#161724] flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => handleClaim(selectedProject)}
              disabled={claimedRewards[selectedProject.id]}
              className={`px-3 py-2 font-pixel text-xs flex items-center gap-2 retro-button ${
                claimedRewards[selectedProject.id]
                  ? "opacity-50 cursor-not-allowed bg-slate-800 text-slate-400 border-slate-700"
                  : "bg-amber-600 hover:bg-amber-500 text-white border-amber-300"
              }`}
            >
              <Award className="w-4 h-4" />
              {claimedRewards[selectedProject.id] ? "XP REIVINDICADO!" : "RESGATAR RECOMPENSA DE XP"}
            </button>

            <div className="flex items-center gap-2 ml-auto">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-3 py-2 font-pixel text-xs flex items-center gap-1.5 retro-button text-slate-200 hover:text-white"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}

              {selectedProject.vercelUrl && (
                <a
                  href={selectedProject.vercelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playOpenWindow()}
                  className="px-4 py-2 font-pixel text-xs flex items-center gap-1.5 retro-button bg-indigo-700 hover:bg-indigo-600 text-white border-indigo-400 shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir na Vercel</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
