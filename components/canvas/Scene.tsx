'use client'

import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import { Lighting } from './Lighting'
import { Particles } from './Particles'
import { SwordModel } from './SwordModel'
import { CameraRig } from './CameraRig'
import { Effects } from './Effects'

export function Scene() {
  return (
    <>
      <CameraRig />
      <Lighting />
      <Particles />

      <Suspense fallback={null}>
        <SwordModel />
      </Suspense>

      <Effects />

      {/* Subtle environment for IBL on metallic surfaces */}
      <Environment preset="night" />
    </>
  )
}
