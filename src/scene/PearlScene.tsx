import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { desktopSlots, mobileSlots, sceneState } from './sceneState'

const GEMS = [
  { color: '#a8286a', angle: 0.2, r: 1.72, y: 0.15, size: 0.1 },
  { color: '#7c4ddb', angle: 1.5, r: 1.72, y: -0.35, size: 0.085 },
  { color: '#ff9e7d', angle: 2.7, r: 1.72, y: 0.4, size: 0.095 },
  { color: '#5fb8c9', angle: 3.9, r: 1.72, y: -0.1, size: 0.075 },
  { color: '#d9779a', angle: 5.0, r: 1.72, y: 0.3, size: 0.09 },
]

function Pearl({ mobile, lite }: { mobile: boolean; lite: boolean }) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const orbit = useRef<THREE.Group>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const mat = useRef<THREE.MeshPhysicalMaterial>(null)
  const target = useMemo(() => new THREE.Color(), [])
  const slots = mobile ? mobileSlots : desktopSlots

  useFrame((state, dt) => {
    const g = group.current
    const c = core.current
    if (!g || !c) return
    const slot = slots[sceneState.active] ?? slots.home
    const { width, height } = state.viewport
    const k = 1 - Math.exp(-dt * 2.4)
    g.position.x += (slot.x * (width / 2) - g.position.x) * k
    g.position.y += (slot.y * (height / 2) - g.position.y) * k
    const s = slot.s * (height / 2)
    g.scale.setScalar(g.scale.x + (s - g.scale.x) * k)

    const t = state.clock.elapsedTime
    const sy = window.scrollY
    c.rotation.y = t * 0.16 + sy * 0.0013 + state.pointer.x * 0.4
    c.rotation.x = Math.sin(t * 0.32) * 0.14 + state.pointer.y * -0.22
    if (orbit.current) {
      orbit.current.rotation.y = t * 0.3 + sy * 0.0006
      orbit.current.rotation.z = Math.sin(t * 0.2) * 0.12
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.12
    if (ringB.current) ringB.current.rotation.z = -t * 0.09
    if (mat.current) mat.current.color.lerp(target.set(slot.color), k)
  })

  const distortProps = {
    color: '#f6d6e6', roughness: 0.08, metalness: 0.05, distort: 0.26, speed: 1.2,
    iridescence: 1, iridescenceIOR: 1.45, iridescenceThicknessMinimum: 260, iridescenceThicknessMaximum: 900,
    clearcoat: 1, clearcoatRoughness: 0.06, sheen: 1, sheenColor: new THREE.Color('#cdb8f5'), sheenRoughness: 0.4,
    envMapIntensity: 1.5, emissive: new THREE.Color('#f7c5d5'), emissiveIntensity: 0.06,
  }

  return (
    <group ref={group} scale={0.001}>
      <mesh ref={core}>
        <sphereGeometry args={[1, lite ? 64 : 128, lite ? 64 : 128]} />
        {/* MeshDistortMaterial extends MeshPhysicalMaterial, so the iridescence props are valid at runtime */}
        <MeshDistortMaterial ref={mat as never} {...(distortProps as object)} />
      </mesh>

      <mesh ref={ringA} rotation={[1.25, 0.25, 0]}>
        <torusGeometry args={[1.5, 0.007, 8, 200]} />
        <meshBasicMaterial color="#a8286a" transparent opacity={0.55} />
      </mesh>
      <mesh ref={ringB} rotation={[0.55, -0.6, 0.4]}>
        <torusGeometry args={[1.95, 0.006, 8, 220]} />
        <meshBasicMaterial color="#7c4ddb" transparent opacity={0.4} />
      </mesh>

      <group ref={orbit}>
        {GEMS.map((gm) => (
          <mesh key={gm.color} position={[Math.cos(gm.angle) * gm.r, gm.y, Math.sin(gm.angle) * gm.r]} scale={gm.size * 3.2}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshPhysicalMaterial color={gm.color} roughness={0.12} metalness={0.2} iridescence={1} clearcoat={1} envMapIntensity={1.6} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function PearlScene({ mobile, lite }: { mobile: boolean; lite: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 35 }}
      dpr={[1, lite ? 1.25 : 1.75]}
      gl={{ antialias: !lite, alpha: true, powerPreference: 'high-performance' }}
      eventSource={document.documentElement}
      eventPrefix="client"
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} color="#fff4ee" />
      <Environment resolution={256} frames={1}>
        {/* soft pastel dome so grazing reflections stay luminous instead of going dark */}
        <mesh scale={40}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#6f4f90" side={THREE.BackSide} />
        </mesh>
        <Lightformer form="rect" intensity={4.2} color="#ffe4ec" position={[-4, 3, 3]} scale={[7, 4, 1]} />
        <Lightformer form="rect" intensity={3.4} color="#d9c8ff" position={[4, -1, 3]} scale={[5, 5, 1]} />
        <Lightformer form="ring" intensity={3.4} color="#ffd1bd" position={[0, 4, -3]} scale={4} />
        <Lightformer form="rect" intensity={2.4} color="#ffffff" position={[0, -4, 2]} scale={[9, 2, 1]} />
      </Environment>
      <Pearl mobile={mobile} lite={lite} />
      <Sparkles count={lite ? 18 : 46} scale={[12, 7, 3]} size={3.2} speed={0.25} opacity={0.7} color="#c47a9c" />
    </Canvas>
  )
}
