"use client";

import React, { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { CALIFORNIA_PROJECTS, ProjectCard } from "@/data/projects";
import { GITHUB_URL } from "@/lib/site";
import { sound } from "@/lib/sound";
import {
  OSThemeId,
  OS_THEMES,
  CrtPhosphorColor,
  FILE_EXTENSIONS,
  OSProps,
} from "@/lib/os-config";
import KvmBar from "./os/KvmBar";
import MobileProjectDialog from "./os/MobileProjectDialog";
import PicotronOS from "./os/PicotronOS";
import ArcanaOS from "./os/ArcanaOS";
import SunsetOS from "./os/SunsetOS";
import TempleCrtOS from "./os/TempleCrtOS";
import Win95OS from "./os/Win95OS";

const VALID_OS_IDS = new Set<OSThemeId>(OS_THEMES.map((t) => t.id));

function subscribeOS(callback: () => void): () => void {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-os"],
  });
  return () => observer.disconnect();
}

function getSnapshotOS(): OSThemeId | null {
  const attr = document.documentElement.getAttribute("data-os") as OSThemeId | null;
  return attr && VALID_OS_IDS.has(attr) ? attr : "sunset";
}

function getServerSnapshotOS(): OSThemeId | null {
  return null;
}

export default function FantasyOS() {
  const activeOS = useSyncExternalStore(
    subscribeOS,
    getSnapshotOS,
    getServerSnapshotOS
  );

  const [selectedId, setSelectedId] = useState<string>(CALIFORNIA_PROJECTS[0].id);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [crtColor, setCrtColor] = useState<CrtPhosphorColor>("#ffb000");
  const [d20Roll, setD20Roll] = useState<number>(20);
  const [clockText, setClockText] = useState<string>("12:00");
  const [termInput, setTermInput] = useState<string>("");
  const [termOutput, setTermOutput] = useState<string>(
    'READY. Digite "help", "list", "run", "random" ou selecione um projeto.'
  );
  const [mobileProjectOpen, setMobileProjectOpen] = useState<boolean>(false);
  const [osMenuOpen, setOsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClockText(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    const initTimer = setTimeout(updateClock, 0);
    const interval = setInterval(updateClock, 15000);
    return () => {
      clearTimeout(initTimer);
      clearInterval(interval);
    };
  }, []);

  const applyOS = useCallback((id: OSThemeId) => {
    document.documentElement.setAttribute("data-os", id);
  }, []);

  const selectedProject: ProjectCard =
    CALIFORNIA_PROJECTS.find((p) => p.id === selectedId) || CALIFORNIA_PROJECTS[0];

  const handleSelectProject = useCallback(
    (id: string, idx: number, openModalOnMobile = true) => {
      const freqs = [329.63, 392.0, 440.0, 523.25, 587.33];
      sound.playSynthNote(freqs[idx % freqs.length]);
      setSelectedId(id);

      const proj = CALIFORNIA_PROJECTS.find((p) => p.id === id);
      if (proj) {
        setTermOutput(`LOADED "${FILE_EXTENSIONS[id] || id}" — ${proj.tagline}`);
      }

      if (
        openModalOnMobile &&
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 1023px)").matches
      ) {
        setMobileProjectOpen(true);
      }
    },
    []
  );

  const handleLaunch = useCallback((url: string) => {
    sound.playLaunchChord();
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 180);
  }, []);

  const handleSwitchOS = useCallback(
    (id: OSThemeId) => {
      sound.playSynthNote(493.88);
      applyOS(id);
    },
    [applyOS]
  );

  const handleRandomizeOS = useCallback(() => {
    sound.playLaunchChord();
    const current = activeOS || "sunset";
    const others = OS_THEMES.filter((t) => t.id !== current);
    const pick = others[Math.floor(Math.random() * others.length)];
    applyOS(pick.id);
    setD20Roll(Math.floor(Math.random() * 20) + 1);
  }, [activeOS, applyOS]);

  const handleRollD20 = useCallback(() => {
    sound.playSynthNote(587.33);
    const roll = Math.floor(Math.random() * 20) + 1;
    setD20Roll(roll);
    const randomIdx = Math.floor(Math.random() * CALIFORNIA_PROJECTS.length);
    setSelectedId(CALIFORNIA_PROJECTS[randomIdx].id);
  }, []);

  const handleToggleSound = useCallback(() => {
    const newState = sound.toggleMute();
    setSoundOn(newState);
  }, []);

  const handleTerminalCommand = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const cmd = termInput.trim().toLowerCase();
      setTermInput("");
      sound.playSynthNote(440);

      if (!cmd) return;
      if (cmd === "help") {
        setTermOutput(
          "COMANDOS: list | run | github | random | clear | pico | arcana | sunset | crt | win95"
        );
      } else if (cmd === "clear" || cmd === "cls") {
        setTermOutput("READY.");
      } else if (cmd === "list" || cmd === "ls") {
        setTermOutput(
          CALIFORNIA_PROJECTS.map((p) => FILE_EXTENSIONS[p.id] || p.id).join("  ")
        );
      } else if (cmd === "run" || cmd === "play") {
        setTermOutput(`EXECUTANDO ${selectedProject.vercelUrl}...`);
        handleLaunch(selectedProject.vercelUrl);
      } else if (cmd === "github" || cmd === "git") {
        handleLaunch(selectedProject.githubUrl || GITHUB_URL);
      } else if (cmd === "random") {
        handleRandomizeOS();
      } else if (cmd.includes("pico")) {
        applyOS("picotron");
      } else if (cmd.includes("arcana") || cmd.includes("rpg")) {
        applyOS("arcana");
      } else if (cmd.includes("sunset") || cmd.includes("88")) {
        applyOS("sunset");
      } else if (cmd.includes("crt") || cmd.includes("temple") || cmd.includes("dos")) {
        applyOS("mainframe");
      } else if (cmd.includes("win") || cmd.includes("95")) {
        applyOS("win95");
      } else {
        const found = CALIFORNIA_PROJECTS.find(
          (p) => p.id.includes(cmd) || p.title.toLowerCase().includes(cmd)
        );
        if (found) {
          setSelectedId(found.id);
          setTermOutput(`SELECIONADO: ${found.title} — digite "run" para abrir.`);
        } else {
          setTermOutput(`?SYNTAX ERROR: "${cmd}". Digite "help".`);
        }
      }
    },
    [applyOS, handleLaunch, handleRandomizeOS, selectedProject, termInput]
  );

  const sharedProps: OSProps = {
    selectedProject,
    selectedId,
    onSelectProject: handleSelectProject,
    onLaunch: handleLaunch,
    soundOn,
    onToggleSound: handleToggleSound,
    onRandomizeOS: handleRandomizeOS,
    onSwitchOS: handleSwitchOS,
    clockText,
    crtColor,
    onChangeCrtColor: setCrtColor,
    d20Roll,
    onRollD20: handleRollD20,
    termInput,
    onChangeTermInput: setTermInput,
    termOutput,
    onSubmitTerminal: handleTerminalCommand,
  };

  return (
    <div className="min-h-dvh w-full flex flex-col os-boot-screen relative overflow-x-clip">
      <KvmBar
        activeOS={activeOS || "sunset"}
        mounted={activeOS !== null}
        soundOn={soundOn}
        osMenuOpen={osMenuOpen}
        onSetOsMenuOpen={setOsMenuOpen}
        onSwitchOS={handleSwitchOS}
        onRandomizeOS={handleRandomizeOS}
        onToggleSound={handleToggleSound}
      />

      {activeOS === null ? (
        <main className="flex-1 flex items-center justify-center p-6 os-boot-screen font-mono-code text-xs">
          <div className="opacity-80 tracking-wider">BOOTING JAVAI-OS...</div>
        </main>
      ) : (
        <>
          {activeOS === "picotron" && <PicotronOS {...sharedProps} />}
          {activeOS === "arcana" && <ArcanaOS {...sharedProps} />}
          {activeOS === "sunset" && <SunsetOS {...sharedProps} />}
          {activeOS === "mainframe" && <TempleCrtOS {...sharedProps} />}
          {activeOS === "win95" && <Win95OS {...sharedProps} />}

          <MobileProjectDialog
            open={mobileProjectOpen}
            activeOS={activeOS}
            crtColor={crtColor}
            project={selectedProject}
            onClose={() => setMobileProjectOpen(false)}
            onSelectProject={handleSelectProject}
            onLaunch={handleLaunch}
          />
        </>
      )}
    </div>
  );
}
