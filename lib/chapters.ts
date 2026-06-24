import * as THREE from 'three'

export interface Chapter {
  id: number
  subtitle: string
  title: string
  body: string
  accentColor: string
  camera: {
    position: readonly [number, number, number]
    target: readonly [number, number, number]
  }
}

export const CHAPTERS: Chapter[] = [
  {
    id: 0,
    subtitle: 'A legend forged in the Sacred Realm',
    title: "The Blade of Evil's Bane",
    body: 'In the age before memory, the Goddess Hylia forged a sacred light and sealed it within steel. A weapon not of war — but of destiny.',
    accentColor: '#4a90d9',
    camera: { position: [0, 0, 8], target: [0, 0, 0] },
  },
  {
    id: 1,
    subtitle: 'Origins',
    title: 'The Sacred Realm',
    body: 'Deep within the Temple of Time, cloaked in eternal silence, the Master Sword rests. Time cannot touch it. Evil cannot corrupt it.',
    accentColor: '#6fa8dc',
    camera: { position: [2.5, 1.5, 5], target: [0, 0.5, 0] },
  },
  {
    id: 2,
    subtitle: 'Purpose',
    title: 'Chosen by Fate',
    body: 'The Triforce of Courage stirs within the bloodline of the hero. Only one who is true of heart may draw this blade from its pedestal.',
    accentColor: '#ffd700',
    camera: { position: [0, -0.5, 3], target: [0, 1.5, 0] },
  },
  {
    id: 3,
    subtitle: 'Power',
    title: 'The Triforce of Courage',
    body: 'Three golden triangles, forged from the prayers of the goddess. Courage. Wisdom. Power. The sacred wish bound in divine geometry.',
    accentColor: '#f4c430',
    camera: { position: [-3.5, 1, 4], target: [0, 0, 0] },
  },
  {
    id: 4,
    subtitle: 'Legacy',
    title: 'Tears of the Kingdom',
    body: 'Across a thousand years and countless kingdoms, through the depths of darkness and the heights of legend — the blade endures. Eternal. Unyielding.',
    accentColor: '#7eb8f7',
    camera: { position: [1, 3.5, 3.5], target: [0, 0, 0] },
  },
  {
    id: 5,
    subtitle: 'The Chosen Hero',
    title: 'Draw the Sword',
    body: 'It has waited through the ages — for you. The sword chose you long before you were born. Answer the call. Take up the blade of legend.',
    accentColor: '#ffffff',
    camera: { position: [0, -0.8, 2.5], target: [0, 0.8, 0] },
  },
]

const _a = new THREE.Vector3()
const _b = new THREE.Vector3()
const _outPos = new THREE.Vector3()
const _outTarget = new THREE.Vector3()

export function getCameraFromProgress(
  progress: number,
  outPos: THREE.Vector3,
  outTarget: THREE.Vector3
): void {
  const clamped = Math.max(0, Math.min(1, progress))
  const last = CHAPTERS.length - 1
  const raw = clamped * last
  const fromIdx = Math.min(Math.floor(raw), last - 1)
  const toIdx = fromIdx + 1
  const t = easeInOutCubic(raw - fromIdx)

  const from = CHAPTERS[fromIdx].camera
  const to = CHAPTERS[toIdx].camera

  _a.set(from.position[0], from.position[1], from.position[2])
  _b.set(to.position[0], to.position[1], to.position[2])
  outPos.lerpVectors(_a, _b, t)

  _a.set(from.target[0], from.target[1], from.target[2])
  _b.set(to.target[0], to.target[1], to.target[2])
  outTarget.lerpVectors(_a, _b, t)
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
