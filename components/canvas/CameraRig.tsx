'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useScrollStore } from '@/store/useScrollStore'
import { getCameraFromProgress } from '@/lib/chapters'

export function CameraRig() {
  const destPos = useRef(new THREE.Vector3(0, 0, 8))
  const destLook = useRef(new THREE.Vector3(0, 0, 0))
  const smoothPos = useRef(new THREE.Vector3(0, 0, 8))
  const smoothLook = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((state, delta) => {
    const progress = useScrollStore.getState().progress
    getCameraFromProgress(progress, destPos.current, destLook.current)

    const lerpFactor = 1 - Math.pow(0.02, delta)
    smoothPos.current.lerp(destPos.current, lerpFactor)
    smoothLook.current.lerp(destLook.current, lerpFactor)

    state.camera.position.copy(smoothPos.current)
    state.camera.lookAt(smoothLook.current)
  })

  return null
}
