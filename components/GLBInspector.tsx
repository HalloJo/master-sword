"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";

function Inspector() {
  const sword1 = useGLTF("/models/master_sword.glb");
  const sword2 = useGLTF("/models/master_sword_2.glb");

  useEffect(() => {
    console.log("=== SWORD 1 ===");
    sword1.scene.traverse((node: any) => {
      console.log(node.name, node.type, node.material?.name);
    });
    console.log("=== SWORD 2 ===");
    sword2.scene.traverse((node: any) => {
      console.log(node.name, node.type, node.material?.name);
    });
  }, []);

  return null;
}

export default function GLBInspector() {
  return (
    <Canvas>
      <Inspector />
    </Canvas>
  );
}
