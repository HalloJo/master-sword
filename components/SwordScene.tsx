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
    <div style={{ width: '100vw', height: '100vh', background: '#000000' }}>
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: [0, 0, 6], fov: 45 }}
        shadows="percentage"
      >
        <ambientLight color="#ffffff" intensity={0.8} />
        <directionalLight color="#ffffff" intensity={1.5} position={[0, 8, 4]} />
        <pointLight color="#88aaff" intensity={1} position={[-3, 1, 4]} />
        <Sword />
      </Canvas>
    </div>
  )
}
