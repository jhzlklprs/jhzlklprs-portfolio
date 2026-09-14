"use client";

import { useEffect, useRef, useState } from "react";

const MIN_VISIBLE_MS = 900;
const HOLD_AT_FULL_MS = 250;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);
  const fillRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("is-loading");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let progress = 0;
    let rafId = 0;
    const startTime = Date.now();

    function setProgress(value: number) {
      progress = Math.min(value, 100);
      if (fillRef.current) fillRef.current.style.width = progress + "%";
      if (percentRef.current) {
        percentRef.current.textContent =
          String(Math.round(progress)).padStart(2, "0") + "%";
      }
    }

    function animateTo(target: number, duration: number, onDone?: () => void) {
      cancelAnimationFrame(rafId);
      const from = progress;
      let start: number | null = null;

      function step(timestamp: number) {
        if (start === null) start = timestamp;
        const elapsed = timestamp - start;
        const t = Math.min(elapsed / duration, 1);
        setProgress(from + (target - from) * easeOutCubic(t));
        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          onDone?.();
        }
      }
      rafId = requestAnimationFrame(step);
    }

    function reallyHide() {
      document.documentElement.classList.remove("is-loading");
      setFading(true);
      // matches the 0.5s opacity/visibility transition on #preloader
      setTimeout(() => setHidden(true), 500);
    }

    if (reduceMotion) {
      setProgress(100);
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);
      setTimeout(reallyHide, remaining);
      return () => cancelAnimationFrame(rafId);
    }

    // Phase 1 — eased climb toward 90% while we wait for real load.
    animateTo(90, 1800);

    function finish() {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);
      const fillDuration = Math.max(remaining, 350);
      animateTo(100, fillDuration, () => {
        setTimeout(reallyHide, HOLD_AT_FULL_MS);
      });
    }

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }
    const safety = setTimeout(finish, 4000);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(safety);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      id="preloader"
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={fading ? "is-hidden" : ""}
    >
      <div className="preloader-inner">
        <div className="preloader-label">Initializing</div>
        <div className="preloader-bar">
          <div ref={fillRef} className="preloader-bar-fill" />
        </div>
        <span ref={percentRef} className="preloader-percent">
          00%
        </span>
      </div>
    </div>
  );
}
