"use client";

import { useScrollStore } from "@/store/useScrollStore";

export default function ScrollPrompt() {
  const progress = useScrollStore((s) => s.progress);

  // Disappears over the first 4 % of scroll — moves up 80 px as it fades
  const pct = Math.min(progress / 0.04, 1);
  const opacity = 1 - pct;
  const offsetY = -pct * 80;

  if (opacity <= 0) return null;

  return (
    <div
      className="fixed inset-x-0 top-1/2 z-10 pointer-events-none text-center"
      style={{
        opacity,
        transform: `translateY(calc(-50% + ${offsetY}px))`,
      }}
    >
      <p className="m-0 font-heading text-xs tracking-[0.3em] uppercase text-text-subtitle">
        Scroll to begin your journey
      </p>
      <div className="mt-4 animate-bounce text-text-subtitle text-sm select-none">
        ↓
      </div>
    </div>
  );
}
