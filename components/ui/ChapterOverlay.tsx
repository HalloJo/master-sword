'use client'

import { useScrollStore } from '@/store/useScrollStore'
import { CHAPTERS } from '@/lib/chapters'

export function ChapterOverlay() {
  const chapter = useScrollStore((s) => s.chapter)
  const progress = useScrollStore((s) => s.progress)

  const isLast = chapter === CHAPTERS.length - 1

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Scroll progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-amber-400 transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Chapter counter */}
      <div className="absolute top-8 right-8 text-right">
        <span className="text-white/30 text-xs tracking-[0.3em] font-mono">
          {String(chapter + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
        </span>
      </div>

      {/* Chapter text panels */}
      {CHAPTERS.map((ch, i) => {
        const isActive = i === chapter
        const side = i % 2 === 0 ? 'left' : 'right'

        return (
          <div
            key={ch.id}
            className={`
              absolute bottom-16 transition-all duration-700 ease-in-out max-w-sm
              ${side === 'left' ? 'left-10 md:left-16' : 'right-10 md:right-16 text-right'}
              ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-2 font-light"
              style={{ color: ch.accentColor }}
            >
              {ch.subtitle}
            </p>
            <h2 className="text-white text-2xl md:text-3xl font-serif leading-tight mb-3">
              {ch.title}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-[26ch] font-light">
              {ch.body}
            </p>
          </div>
        )
      })}

      {/* Scroll hint — only at the very start */}
      <div
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
          transition-opacity duration-700
          ${progress < 0.03 ? 'opacity-60' : 'opacity-0'}
        `}
      >
        <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>

      {/* Final chapter CTA */}
      {isLast && (
        <div
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            pointer-events-auto transition-opacity duration-1000
            ${chapter === 5 ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* placeholder for a CTA button added in chapter 6 */}
        </div>
      )}
    </div>
  )
}
