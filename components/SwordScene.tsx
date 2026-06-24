'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload('/models/master_sword.glb')

function Sword() {
  const { scene } = useGLTF('/models/master_sword.glb')
  const ref = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!ref.current) return

    ref.current.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(scene)
    if (box.isEmpty()) return

    const center = box.getCenter(new THREE.Vector3())
    const size   = box.getSize(new THREE.Vector3())

    const targetH = 2 * 6 * Math.tan((45 / 2) * (Math.PI / 180)) * 0.7
    const scale   = targetH / Math.max(size.y, 0.001)

    scene.position.sub(center)
    ref.current.scale.setScalar(scale)
    ref.current.rotation.x = -0.15
  }, [scene])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.25
  })

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  )
}

export default function SwordScene() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* SVG grain filter — defined once, applied via featureless overlay below */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
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
        <ambientLight color="#fff8f0" intensity={1.2} />
        <directionalLight position={[5, 8, 5]}   color="#ffffff" intensity={2}   />
        <directionalLight position={[-3, 2, -2]}  color="#ffd580" intensity={1.2} />
        <pointLight       position={[0, -2, 3]}   color="#aaccff" intensity={0.8} />
        <pointLight       position={[2, 4, -3]}   color="#ffc850" intensity={1.5} />
        <Sword />
      </Canvas>

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(180,165,140,0.4) 100%)',
      }} />

      {/* Film grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        filter: 'url(#grain)', opacity: 0.03,
        background: '#fff',
      }} />
    </div>
  )
}
