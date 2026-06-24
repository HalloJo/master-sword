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
      const raw = clamped * 5
      const chapter = Math.min(Math.floor(raw), 5)
      const chapterProgress = raw - chapter
      set({ progress: clamped, chapter, chapterProgress })
    },
  }))
)
