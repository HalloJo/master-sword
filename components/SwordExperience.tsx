'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollStore } from '@/store/useScrollStore'
import { ChapterOverlay } from '@/components/ui/ChapterOverlay'

const SwordCanvas = dynamic(() => import('@/components/canvas/SwordCanvas'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-1 h-16 bg-gradient-to-b from-blue-400/60 to-transparent animate-pulse" />
    </div>
  ),
})

export function SwordExperience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const setProgress = useScrollStore((s) => s.setProgress)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        setProgress(self.progress)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [setProgress])

  return (
    /* 600vh tall outer container — the scroll engine */
    <div ref={containerRef} className="relative" style={{ height: '600vh' }}>
      {/* Sticky viewport — stays pinned during the 600vh scroll */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0f]">
        {/* R3F canvas */}
        <SwordCanvas />

        {/* Text & UI overlays sit on top of canvas */}
        <ChapterOverlay />
      </div>
    </div>
  )
}
