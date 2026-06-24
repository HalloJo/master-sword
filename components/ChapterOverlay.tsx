"use client";

import { useScrollStore } from "@/store/useScrollStore";

export default function ChapterOverlay() {
  const chapter = useScrollStore((s) => s.chapter);
  const cp = useScrollStore((s) => s.chapterProgress);

  // Fade in after sword is fully risen (~55 % of ch0), hold through rest of ch0,
  // then fade out over first 15 % of chapter 1
  const opacity =
    chapter === 0
      ? Math.max(0, Math.min(1, (cp - 0.55) / 0.15))
      : chapter === 1
      ? Math.max(0, Math.min(1, 1 - cp / 0.15))
      : 0;

  return (
    <div
      className="fixed inset-x-0 bottom-[20%] z-10 pointer-events-none text-center"
      style={{ opacity }}
    >
      <h1 className="m-0 leading-[1.1] tracking-tighter text-text-heading font-heading font-bold text-[clamp(40px,6vw,72px)]">
        The Blade of Evil&apos;s Bane
      </h1>
      <p className="mt-3.5 text-sm text-text-subtitle tracking-[0.2em] uppercase font-body">
        A legend forged in the Sacred Realm
      </p>
    </div>
  );
}
