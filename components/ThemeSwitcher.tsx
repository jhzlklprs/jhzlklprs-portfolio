"use client";

import { useEffect, useState } from "react";
import { MonitorIcon, SunIcon, MoonIcon } from "@/components/icons";

type Theme = "system" | "light" | "dark";

const THEME_COLORS: Record<"dark" | "light", string> = {
  dark: "#0a0b0f",
  light: "#f7f7f7",
};

const OPTIONS: { value: Theme; label: string; Icon: () => React.JSX.Element }[] = [
  { value: "system", label: "System theme", Icon: MonitorIcon },
  { value: "light", label: "Light theme", Icon: SunIcon },
  { value: "dark", label: "Dark theme", Icon: MoonIcon },
];

export default function ThemeSwitcher() {
  // Starts as "system" on both server and client so the first render
  // matches for hydration. The inline no-flash script in layout.tsx has
  // already set the *real* theme on <html data-theme="..."> before this
  // component ever mounts — this effect just reads that back once, after
  // mount, so the active button matches it. eslint-disable is scoped and
  // deliberate: this is a one-time read of an imperative DOM value that
  // doesn't exist during SSR, not a derived-state anti-pattern.
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark" || current === "system") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(current);
    }
  }, []);

  function applyTheme(next: Theme) {
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
    setTheme(next);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const resolved: "dark" | "light" =
        next === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : next;
      meta.setAttribute("content", THEME_COLORS[resolved]);
    }
  }

  return (
    <div className="theme-toggle" aria-label="Theme selector">
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          className={`theme-button${theme === value ? " active" : ""}`}
          data-theme-value={value}
          aria-label={label}
          aria-pressed={theme === value}
          title={label}
          onClick={() => applyTheme(value)}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
}
