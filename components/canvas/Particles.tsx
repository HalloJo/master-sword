'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 300

export function Particles() {
  const ref = useRef<THREE.Points>(null)

  const { positions, velocities, phases } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT)
    const phases = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 3 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI

      positions[i * 3] = r * Math.cos(theta) * Math.cos(phi)
      positions[i * 3 + 1] = (Math.random() - 0.3) * 8
      positions[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi)

      velocities[i] = 0.003 + Math.random() * 0.005
      phases[i] = Math.random() * Math.PI * 2
    }

    return { positions, velocities, phases }
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const time = state.clock.elapsedTime
    const pos = ref.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 1] += velocities[i]
      pos[i * 3] += Math.sin(time * 0.3 + phases[i]) * 0.002

      if (pos[i * 3 + 1] > 5) {
        pos[i * 3 + 1] = -4
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#6fa8dc"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
