/** Shared, non-reactive state read every frame by the 3D scene. */
export const sceneState = { active: 'home' }

export interface Slot {
  /** -1..1 across the viewport width (0 = centre, positive = right) */
  x: number
  /** -1..1 across the viewport height (positive = up) */
  y: number
  /** pearl radius as a fraction of half the viewport height */
  s: number
  /** pearl tint for this chapter */
  color: string
}

export const desktopSlots: Record<string, Slot> = {
  home: { x: 0.5, y: -0.02, s: 0.56, color: '#fbe9f0' },
  about: { x: 0.74, y: 0.5, s: 0.2, color: '#efe4ff' },
  expertise: { x: 0.74, y: 0.18, s: 0.24, color: '#ffe9de' },
  experience: { x: -0.74, y: -0.05, s: 0.26, color: '#e8f1ff' },
  projects: { x: 0.82, y: 0.38, s: 0.001, color: '#d9c8ff' },
  achievements: { x: 0.72, y: -0.1, s: 0.28, color: '#ffe6ef' },
  github: { x: -0.76, y: 0.1, s: 0.22, color: '#e6f4ef' },
  contact: { x: 0.8, y: 0.52, s: 0.24, color: '#ffe2d6' },
}

export const mobileSlots: Record<string, Slot> = {
  home: { x: 0.52, y: 0.62, s: 0.2, color: '#fbe9f0' },
  about: { x: 0.82, y: 0.88, s: 0.12, color: '#efe4ff' },
  expertise: { x: 0.82, y: 0.88, s: 0.12, color: '#ffe9de' },
  experience: { x: 0.82, y: 0.88, s: 0.12, color: '#e8f1ff' },
  projects: { x: 0.82, y: 0.88, s: 0.001, color: '#d9c8ff' },
  achievements: { x: 0.82, y: 0.88, s: 0.12, color: '#ffe6ef' },
  github: { x: 0.82, y: 0.88, s: 0.12, color: '#e6f4ef' },
  contact: { x: 0, y: 0.8, s: 0.2, color: '#ffe2d6' },
}
