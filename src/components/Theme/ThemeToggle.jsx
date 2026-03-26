"use client";

import { useEffect, useMemo, useState } from "react";
import { Monitor, Sun, Moon } from "lucide-react";

const STORAGE_KEY = "themeMode"; // 'system' | 'light' | 'dark'

function getSystemPrefersDark() {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? true;
}

function applyTheme(mode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const dark = mode === "dark" || (mode === "system" && getSystemPrefersDark());
  root.classList.toggle("dark", Boolean(dark));
}

export default function ThemeToggle({ className = "" }) {
  const [mode, setMode] = useState("system");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    const initial = saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
    setMode(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;
    const onChange = () => {
      const saved = window.localStorage.getItem(STORAGE_KEY) || "system";
      if (saved === "system") applyTheme("system");
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const options = useMemo(
    () => [
      { id: "system", label: "Device", Icon: Monitor },
      { id: "light", label: "Light", Icon: Sun },
      { id: "dark", label: "Dark", Icon: Moon },
    ],
    []
  );

  const onSelect = (next) => {
    setMode(next);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  };

  return (
    <div className={className} role="group" aria-label="Theme">
      {options.map(({ id, label, Icon }) => {
        const active = mode === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-pressed={active}
            data-active={active ? "true" : "false"}
            className="theme-seg-btn"
          >
            <Icon size={16} strokeWidth={1.75} />
            <span className="theme-seg-label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

