'use client'

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface ScrollStore {
  progress: number
  chapter: number
  chapterProgress: number
  setProgress: (progress: number) => void
}

export const useScrollStore = create<ScrollStore>()(
  subscribeWithSelector((set) => ({
    progress: 0,
    chapter: 0,
    chapterProgress: 0,
    setProgress: (progress) => {
      const clamped = Math.max(0, Math.min(1, progress))
      const raw = clamped * 6  // 6 chapters → each gets 1/6 of scroll (~16.7%)
      const chapter = Math.min(Math.floor(raw), 5)
      const chapterProgress = Math.min(raw - chapter, 1)
      set({ progress: clamped, chapter, chapterProgress })
    },
  }))
)
