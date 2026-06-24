'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, GodRays, Vignette } from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import * as THREE from 'three'

function SunSource({ onReady }: { onReady: (mesh: THREE.Mesh) => void }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ref.current && !ref.current.userData.registered) {
      ref.current.userData.registered = true
      onReady(ref.current)
    }
  })

  return (
    <mesh ref={ref} position={[3, 8, 2]}>
      <sphereGeometry args={[0.3, 8, 8]} />
      <meshBasicMaterial color="#ffe0a0" />
    </mesh>
  )
}

export function Effects() {
  const [sun, setSun] = useState<THREE.Mesh | null>(null)

  return (
    <>
      <SunSource onReady={setSun} />

      <EffectComposer multisampling={0}>
        {sun ? (
          <GodRays
            sun={sun}
            blendFunction={BlendFunction.SCREEN}
            samples={40}
            density={0.94}
            decay={0.88}
            weight={0.35}
            exposure={0.55}
            clampMax={1}
            blur
          />
        ) : (
          <></>
        )}
        <Bloom
          luminanceThreshold={0.25}
          luminanceSmoothing={0.4}
          intensity={1.8}
          kernelSize={KernelSize.LARGE}
          mipmapBlur
        />
        <Vignette
          offset={0.3}
          darkness={0.8}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  )
}
