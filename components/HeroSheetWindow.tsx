"use client";

import React from "react";
import { HERO_PROFILE } from "@/data/projects";
import { sound } from "@/lib/sound";
import { ExternalLink, Shield, Zap, Sparkles, Wand2, Terminal } from "lucide-react";
import { GithubIcon } from "./Icons";

interface HeroSheetWindowProps {
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
}

export default function HeroSheetWindow({ onClose, onFocus, zIndex }: HeroSheetWindowProps) {
  return (
    <div
      onClick={onFocus}
      style={{ zIndex }}
      className="absolute top-12 left-4 right-4 md:left-32 md:right-32 bottom-20 max-w-4xl mx-auto flex flex-col retro-box-raised overflow-hidden shadow-2xl"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-emerald-950 via-teal-900 to-indigo-950 border-b-2 border-teal-950 text-white font-pixel text-xs tracking-wider cursor-move">
        <div className="flex items-center gap-2">
          <span>🧙</span>
          <span className="truncate">FICHA DE PERSONAGEM (CHARACTER SHEET) - HERÓI DO CÓDIGO</span>
        </div>
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

      {/* Content Container */}
      <div className="flex-1 overflow-y-auto bg-[#141523] p-4 md:p-6 space-y-6 text-slate-200">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 bg-[#1b1c2e] border-2 border-slate-700">
          {/* Avatar Pixel Art Box */}
          <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-b from-indigo-900 to-purple-950 border-4 border-amber-500/80 flex flex-col items-center justify-center shadow-lg relative shrink-0">
            <span className="text-5xl md:text-6xl animate-pulse">🧙‍♂️</span>
            <span className="absolute bottom-1 bg-black/80 px-1.5 py-0.5 text-[9px] font-pixel text-amber-300">
              LVL {HERO_PROFILE.level}
            </span>
          </div>

          {/* Profile Overview */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
              <div>
                <h1 className="text-lg md:text-xl font-pixel text-amber-300">{HERO_PROFILE.name}</h1>
                <p className="font-pixel-text text-base text-emerald-300">{HERO_PROFILE.title}</p>
              </div>
              <span className="px-2.5 py-1 bg-indigo-950 border border-indigo-700 font-pixel text-[10px] text-indigo-300">
                {HERO_PROFILE.guild}
              </span>
            </div>

            <p className="font-pixel-text text-sm text-slate-300 leading-relaxed">
              {HERO_PROFILE.bio}
            </p>

            {/* HP and Mana Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <div className="flex justify-between font-pixel text-[10px] text-red-400 mb-1">
                  <span>HP (ENERGIA VITAL)</span>
                  <span>{HERO_PROFILE.hp}</span>
                </div>
                <div className="w-full h-3 bg-red-950 border border-red-700 p-0.5">
                  <div className="h-full bg-red-500 w-full animate-pulse" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-pixel text-[10px] text-blue-400 mb-1">
                  <span>MANA (RESERVA DE CÓDIGO)</span>
                  <span>{HERO_PROFILE.mana}</span>
                </div>
                <div className="w-full h-3 bg-blue-950 border border-blue-700 p-0.5">
                  <div className="h-full bg-blue-500 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Attributes and Spells */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attributes / Stats */}
          <div className="retro-box-sunken p-4 bg-[#11121d]">
            <div className="flex items-center gap-2 font-pixel text-xs text-amber-400 mb-4 border-b border-slate-800 pb-2">
              <Shield className="w-4 h-4" />
              <span>ATRIBUTOS PRIMÁRIOS</span>
            </div>

            <div className="space-y-4 font-pixel text-xs">
              {HERO_PROFILE.attributes.map((attr, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-[11px]">{attr.name}</span>
                    <span className="text-amber-300 font-mono">
                      {attr.value}/{attr.max}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 border border-slate-700 p-0.5">
                    <div
                      className={`h-full ${attr.color}`}
                      style={{ width: `${(attr.value / attr.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-2.5 bg-slate-900/80 border border-slate-800 text-xs font-pixel-text text-slate-400">
              💡 Bônus passivo: +20% velocidade de deploy quando emparelhado com a Vercel Edge Network.
            </div>
          </div>

          {/* Spells & Specializations */}
          <div className="retro-box-sunken p-4 bg-[#11121d]">
            <div className="flex items-center gap-2 font-pixel text-xs text-indigo-400 mb-4 border-b border-slate-800 pb-2">
              <Wand2 className="w-4 h-4" />
              <span>ENCANTAMENTOS & ESPECIALIZAÇÕES</span>
            </div>

            <div className="space-y-2.5">
              {HERO_PROFILE.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-[#191a29] border border-slate-800 hover:border-slate-700 flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-pixel text-[11px] text-slate-100">{skill.name}</span>
                    <span className="font-pixel text-[9px] text-amber-400 px-1 bg-amber-950/60 border border-amber-800/40">
                      {skill.level}
                    </span>
                  </div>
                  <span className="font-pixel-text text-xs text-indigo-300 mt-0.5">
                    ✨ &quot;{skill.spell}&quot;
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Guild Links & Portals */}
        <div className="p-4 bg-[#191a2c] border border-slate-700 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-pixel text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>PORTAIS DE COMUNICAÇÃO DO ARQUIMAGO</span>
          </div>

          <div className="flex items-center gap-3">
            {HERO_PROFILE.socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-4 py-2 font-pixel text-xs flex items-center gap-2 retro-button text-slate-100 hover:text-white"
              >
                {social.name === "GitHub" ? (
                  <GithubIcon className="w-4 h-4" />
                ) : (
                  <ExternalLink className="w-4 h-4" />
                )}
                <span>
                  {social.name}: {social.handle}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
