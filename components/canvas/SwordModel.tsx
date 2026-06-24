'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload('/models/master_sword.glb')

function SwordMesh() {
  const { scene } = useGLTF('/models/master_sword.glb')
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    scene.traverse((node) => {
      if (node instanceof THREE.Mesh && node.material) {
        const mat = node.material as THREE.MeshStandardMaterial
        mat.needsUpdate = true
        if (mat.name?.toLowerCase().includes('blade') || mat.color?.getHSL({ h: 0, s: 0, l: 0 }).l > 0.5) {
          mat.emissive = new THREE.Color('#1a4a8a')
          mat.emissiveIntensity = 0.4
        } else {
          mat.emissive = new THREE.Color('#3a2a00')
          mat.emissiveIntensity = 0.2
        }
        mat.roughness = Math.max(mat.roughness * 0.7, 0.1)
        mat.metalness = Math.min((mat.metalness ?? 0) + 0.3, 1)
      }
    })
  }, [scene])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.12
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1} />
    </group>
  )
}

export function SwordModel() {
  return (
    <SwordMesh />
  )
}
