"use client";

import { useEffect, useMemo, useState } from "react";
import { Sun, Moon } from "lucide-react";

const STORAGE_KEY = "themeMode";

function getSystemPrefersDark() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

function applyTheme(mode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
}

export default function ThemeToggle({ className = "" }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    const initial =
      saved === "light" || saved === "dark"
        ? saved
        : getSystemPrefersDark()
          ? "dark"
          : "light";
    setMode(initial);
    applyTheme(initial);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, initial);
  }, []);

  const options = useMemo(
    () => [
      { id: "light", Icon: Sun },
      { id: "dark", Icon: Moon },
    ],
    []
  );

  const onSelect = (next) => {
    setMode(next);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  };

  return (
    <div className={`theme-toggle-container ${className}`} role="group" aria-label="Theme toggle">
      {options.map(({ id, Icon }) => {
        const active = mode === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-pressed={active}
            aria-label={id}
            data-active={active ? "true" : "false"}
            className="theme-seg-btn"
          >
            <Icon size={14} strokeWidth={1.75} />
          </button>
        );
      })}
    </div>
  );
}
