'use client'

import * as THREE from 'three'

export function Lighting() {
  return (
    <>
      {/* Ambient: deep cosmic blue */}
      <ambientLight color="#1a3a5c" intensity={0.4} />

      {/* Key: warm gold from upper-right */}
      <directionalLight
        color="#c8a84b"
        intensity={2.5}
        position={[4, 6, 3]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
      />

      {/* Rim: cool blue-white from behind */}
      <directionalLight
        color="#a0c8ff"
        intensity={1.2}
        position={[-3, 2, -5]}
      />

      {/* Blade point light: glowing blue on the blade tip area */}
      <pointLight
        color="#4a90d9"
        intensity={8}
        distance={6}
        decay={2}
        position={[0, 2, 0.5]}
      />

      {/* Handle accent: subtle gold near the guard */}
      <pointLight
        color="#ffd700"
        intensity={3}
        distance={3}
        decay={2}
        position={[0, -0.5, 0.5]}
      />

      {/* God-ray source: bright spot above scene */}
      <spotLight
        color="#ffe0a0"
        intensity={15}
        distance={20}
        angle={Math.PI / 10}
        penumbra={0.4}
        decay={1.5}
        position={[3, 8, 2]}
        target-position={[0, 0, 0]}
        castShadow={false}
      />
    </>
  )
}
