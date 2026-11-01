import { useRef, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

/** Pointer-driven 3D tilt with a moving highlight. Disabled for touch input and reduced motion. */
export default function Tilt({
  children, className = '', max = 7, glare = true,
}: { children: ReactNode; className?: string; max?: number; glare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 })
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const bg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,.5), transparent 55%)`

  const move = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * max * 2)
    rx.set(-(py - 0.5) * max * 2)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const leave = () => { rx.set(0); ry.set(0) }

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={`group relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: bg }}
        />
      )}
    </motion.div>
  )
}
