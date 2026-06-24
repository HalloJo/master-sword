'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollStore } from '@/store/useScrollStore'

useGLTF.preload('/models/master_sword.glb')

const PARTICLE_COUNT = 150
const PALETTE = [
  new THREE.Color('#ffd700'),
  new THREE.Color('#fff8f0'),
  new THREE.Color('#c8a84b'),
]

// ─── Sword ───────────────────────────────────────────────────────────────────

function Sword() {
  const { scene } = useGLTF('/models/master_sword.glb')
  const ref     = useRef<THREE.Group>(null)
  const smoothY = useRef(-6)   // starts below viewport

  useEffect(() => {
    if (!ref.current) return

    ref.current.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(scene)
    if (box.isEmpty()) return

    const center  = box.getCenter(new THREE.Vector3())
    const size    = box.getSize(new THREE.Vector3())
    const targetH = 2 * 6 * Math.tan((45 / 2) * (Math.PI / 180)) * 0.7
    const scale   = targetH / Math.max(size.y, 0.001)

    scene.position.sub(center)
    ref.current.scale.setScalar(scale)
    ref.current.rotation.x = -0.15
    ref.current.position.y = -6   // start fully below viewport
  }, [scene])

  useFrame((_, delta) => {
    if (!ref.current) return

    const { chapter, chapterProgress: cp } = useScrollStore.getState()

    // Rise in first 70 % of chapter 0 → then locked to 0 for all later chapters
    const targetY =
      chapter === 0
        ? THREE.MathUtils.lerp(-6, 0, THREE.MathUtils.clamp(cp / 0.7, 0, 1))
        : chapter > 0 ? 0 : -6

    // Smooth lerp so position never jumps
    smoothY.current += (targetY - smoothY.current) * Math.min(delta * 3, 1)
    ref.current.position.y = smoothY.current

    // Continuous ambient Y rotation
    ref.current.rotation.y += delta * 0.25
  })

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  )
}

// ─── Particles ───────────────────────────────────────────────────────────────

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy   = useMemo(() => new THREE.Object3D(), [])

  type ParticleData = { x: number; y: number; z: number; speed: number }
  const data = useRef<ParticleData[]>([])

  const geo = useMemo(() => new THREE.SphereGeometry(0.01, 4, 4), [])
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color:             new THREE.Color('#ffffff'),
        emissive:          new THREE.Color('#ffc850'),
        emissiveIntensity: 1,
        roughness: 1,
        metalness: 0,
      }),
    []
  )

  useEffect(() => {
    // Math.random() is impure — must live in useEffect, not in the useRef initializer
    data.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2
      const r     = Math.sqrt(Math.random()) * 1.2
      return {
        x:     Math.cos(angle) * r,
        y:     (Math.random() - 0.5) * 7,
        z:     Math.sin(angle) * r,
        speed: 0.003 + Math.random() * 0.005,
      }
    })

    if (!meshRef.current) return
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      meshRef.current.setColorAt(i, PALETTE[i % 3])
    }
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    const { chapter } = useScrollStore.getState()
    meshRef.current.visible = chapter === 0
    if (chapter !== 0) return

    data.current.forEach((p, i) => {
      p.y += p.speed
      if (p.y > 3.5) {
        p.y = -3.5
        const angle = Math.random() * Math.PI * 2
        const r     = Math.sqrt(Math.random()) * 1.2
        p.x = Math.cos(angle) * r
        p.z = Math.sin(angle) * r
      }
      dummy.position.set(p.x, p.y, p.z)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return <instancedMesh ref={meshRef} args={[geo, mat, PARTICLE_COUNT]} />
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function SwordScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </defs>
      </svg>

      <Canvas
        style={{ background: 'radial-gradient(ellipse at center, #f5f0e8 0%, #e8e0d0 40%, #d4cbb8 100%)' }}
        gl={{ antialias: true }}
        camera={{ position: [0, 0, 6], fov: 45 }}
        shadows="percentage"
      >
        <ambientLight     color="#fff8f0" intensity={1.2} />
        <directionalLight color="#ffffff" intensity={2}   position={[5, 8, 5]}   />
        <directionalLight color="#ffd580" intensity={1.2} position={[-3, 2, -2]} />
        <pointLight       color="#aaccff" intensity={0.8} position={[0, -2, 3]}  />
        <pointLight       color="#ffc850" intensity={1.5} position={[2, 4, -3]}  />
        <Sword />
        <Particles />
      </Canvas>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(180,165,140,0.4) 100%)' }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 bg-white opacity-[0.03]"
        style={{ filter: 'url(#grain)' }}
      />
    </div>
  )
}
