"use client";

import React from "react";
import { sound } from "@/lib/sound";

interface DesktopIconProps {
  id: string;
  label: string;
  icon: string | React.ReactNode;
  badge?: string;
  onClick: () => void;
}

export default function DesktopIcon({ label, icon, badge, onClick }: DesktopIconProps) {
  return (
    <button
      onClick={() => {
        sound.playOpenWindow();
        onClick();
      }}
      className="group flex flex-col items-center justify-center p-2 w-24 h-24 rounded hover:bg-indigo-600/25 active:bg-indigo-600/40 border border-transparent hover:border-indigo-400/40 transition-all text-center focus:outline-none"
    >
      <div className="relative flex items-center justify-center w-12 h-12 bg-slate-900/60 group-hover:bg-slate-900/90 border border-slate-700/80 group-hover:border-amber-400/80 shadow-md transition-all group-hover:scale-105">
        <span className="text-2xl select-none">{icon}</span>
        {badge && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white font-pixel text-[8px] px-1 py-0.2 rounded-sm border border-red-400">
            {badge}
          </span>
        )}
      </div>
      <span className="mt-1.5 font-pixel text-[10px] text-slate-200 group-hover:text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] tracking-tight leading-tight line-clamp-2">
        {label}
      </span>
    </button>
  );
}
