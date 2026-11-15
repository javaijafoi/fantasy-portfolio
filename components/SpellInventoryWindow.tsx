"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { Shield, Sparkles } from "lucide-react";

interface SpellInventoryWindowProps {
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
}

interface Item {
  id: string;
  name: string;
  icon: string;
  type: string;
  rarity: "Comum" | "Raro" | "Épico" | "Lendário";
  rarityColor: string;
  description: string;
  effect: string;
}

const ITEMS: Item[] = [
  {
    id: "nextjs",
    name: "Cálice de Next.js",
    icon: "⚡",
    type: "Framework Arcana",
    rarity: "Lendário",
    rarityColor: "border-amber-400 text-amber-300",
    description: "Recipiente alquímico que funde SSR, SSG e rotas no tempo de um piscar de olhos.",
    effect: "+35 Velocidade de Renderização & Otimização Automática",
  },
  {
    id: "ts",
    name: "Tomo de TypeScript",
    icon: "📘",
    type: "Grimório Rígido",
    rarity: "Épico",
    rarityColor: "border-purple-400 text-purple-300",
    description: "Encantamento que petrifica erros de tipo antes que eles alcancem a produção.",
    effect: "+40 Imunidade a Runtime Errors (TypeError: undefined is not a function)",
  },
  {
    id: "react",
    name: "Orbe Reativa",
    icon: "⚛️",
    type: "Relíquia Viva",
    rarity: "Lendário",
    rarityColor: "border-amber-400 text-amber-300",
    description: "Esfera que vibra com hooks e componentes modulares infinitamente reutilizáveis.",
    effect: "+30 Agilidade de Interface & Estados Reativos",
  },
  {
    id: "tailwind",
    name: "Manto das Cores Rápidas",
    icon: "🎨",
    type: "Vestimenta Estilosa",
    rarity: "Épico",
    rarityColor: "border-purple-400 text-purple-300",
    description: "Tecido etéreo que aplica estilos utilitários instantâneos sem poluir arquivos CSS.",
    effect: "+25 Velocidade de Prototipagem & Responsividade",
  },
  {
    id: "ai",
    name: "Essência de Agentes de IA",
    icon: "🤖",
    type: "Elixir Sintético",
    rarity: "Lendário",
    rarityColor: "border-amber-400 text-amber-300",
    description: "Fórmula arcana que dá vida a assistentes inteligentes capazes de resolver tarefas.",
    effect: "+50 Poder de Raciocínio & Automação Inteligente",
  },
  {
    id: "picotron",
    name: "Micro-Circuito Pico-8",
    icon: "🕹️",
    type: "Artefato Retrô",
    rarity: "Raro",
    rarityColor: "border-blue-400 text-blue-300",
    description: "Chip vintage de 16 cores e som chiptune para criar jogos nostálgicos autênticos.",
    effect: "+30 Criatividade Lúdica & Baixo Consumo de Memória",
  },
  {
    id: "vercel",
    name: "Portal da Vercel",
    icon: "▲",
    type: "Nuvem dos Ventos",
    rarity: "Lendário",
    rarityColor: "border-amber-400 text-amber-300",
    description: "Porta dimensional que projeta qualquer repositório para o mundo em segundos.",
    effect: "+9999 Alcance Global & Zero Configuração de Servidores",
  },
  {
    id: "git",
    name: "Espada do Git Commit",
    icon: "🗡️",
    type: "Arma Temporal",
    rarity: "Épico",
    rarityColor: "border-purple-400 text-purple-300",
    description: "Lâmina capaz de cortar o tempo em ramificações (branches) e retroceder histórico.",
    effect: "+100 Segurança de Versão & Reversão de Desastres",
  },
];

export default function SpellInventoryWindow({ onClose, onFocus, zIndex }: SpellInventoryWindowProps) {
  const [selectedItem, setSelectedItem] = useState<Item>(ITEMS[0]);

  return (
    <div
      onClick={onFocus}
      style={{ zIndex }}
      className="absolute top-16 left-6 right-6 md:left-48 md:right-48 bottom-24 max-w-3xl mx-auto flex flex-col retro-box-raised overflow-hidden shadow-2xl"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-amber-950 via-amber-900 to-yellow-950 border-b-2 border-amber-950 text-white font-pixel text-xs tracking-wider cursor-move">
        <div className="flex items-center gap-2">
          <span>🎒</span>
          <span className="truncate">INVENTÁRIO DE FEITIÇOS & TECNOLOGIAS</span>
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

      {/* Body */}
      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden bg-[#131422]">
        {/* Inventory Grid */}
        <div className="p-4 sm:w-1/2 border-b sm:border-b-0 sm:border-r border-slate-800 flex flex-col">
          <div className="font-pixel text-xs text-amber-300 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MOCHILA DE ARTEFATOS ({ITEMS.length}/16 SLOTS)</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5 flex-1">
            {ITEMS.map((item) => {
              const isSelected = item.id === selectedItem.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedItem(item);
                  }}
                  className={`aspect-square flex flex-col items-center justify-center p-1 border-2 transition-all relative ${
                    isSelected
                      ? "bg-amber-950/70 border-amber-400 scale-105 shadow-md"
                      : "bg-[#1d1f30] border-slate-700 hover:border-slate-500 hover:bg-[#252840]"
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[8px] font-pixel text-slate-300 truncate w-full text-center mt-1">
                    {item.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}

            {/* Empty slots */}
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="aspect-square bg-[#0f1019] border border-dashed border-slate-800 flex items-center justify-center opacity-40 text-xs text-slate-600"
              >
                +
              </div>
            ))}
          </div>
        </div>

        {/* Selected Item Detail */}
        <div className="p-4 sm:w-1/2 flex flex-col justify-between bg-[#0e0f19]">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-[#191b2c] border border-slate-700">
              <div className="w-14 h-14 bg-black/40 border border-amber-500/50 flex items-center justify-center text-3xl">
                {selectedItem.icon}
              </div>
              <div className="min-w-0">
                <h3 className="font-pixel text-xs text-amber-300 truncate">{selectedItem.name}</h3>
                <span className={`text-[10px] font-pixel block mt-1 ${selectedItem.rarityColor}`}>
                  {selectedItem.rarity} • {selectedItem.type}
                </span>
              </div>
            </div>

            <div className="retro-box-sunken p-3 bg-[#0a0b12] space-y-2">
              <span className="font-pixel text-[10px] text-slate-400 block">DESCRIÇÃO DO ITEM:</span>
              <p className="font-pixel-text text-sm text-slate-200 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            <div className="p-3 bg-emerald-950/30 border border-emerald-800/50 space-y-1">
              <span className="font-pixel text-[10px] text-emerald-400 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                <span>ENCANTAMENTO ATIVO:</span>
              </span>
              <p className="font-pixel-text text-sm text-emerald-300 font-bold">
                {selectedItem.effect}
              </p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <span className="text-[10px] font-pixel text-slate-500">
              Equipado no Arsenal de Desenvolvimento
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
