'use client'

import { useEffect, useRef } from 'react'
import { useScrollStore } from '@/store/useScrollStore'

export default function ScrollSetup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const setProgress  = useScrollStore((s) => s.setProgress)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update() // seed store on mount so sword position is correct immediately
    return () => window.removeEventListener('scroll', update)
  }, [setProgress])

  // 600vh invisible column that creates the scroll space
  return <div ref={containerRef} className="h-[600vh]" />
}
