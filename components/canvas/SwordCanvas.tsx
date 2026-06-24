'use client'

import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'

export default function SwordCanvas() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: 5, // ACESFilmicToneMapping
        toneMappingExposure: 1.2,
      }}
      shadows
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  )
}
