import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import PearlBackdrop from './components/PearlBackdrop'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Publications from './components/Publications'
import GithubActivity from './components/GithubActivity'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useActiveSection } from './hooks/useScrollProgress'
import { sceneState } from './scene/sceneState'

const ORDER = ['home', 'about', 'expertise', 'experience', 'projects', 'achievements', 'github', 'contact']

/** Soft blush glow that follows the pointer on desktop. Transform-only, hidden on touch and reduced motion. */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return
    let raf = 0, x = 0, y = 0
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (ref.current) ref.current.style.transform = `translate3d(${x - 170}px, ${y - 170}px, 0)` })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return <div ref={ref} className="cursor-glow pointer-events-none fixed left-0 top-0 z-[2] h-[22rem] w-[22rem] rounded-full opacity-70 mix-blend-multiply" style={{ background: 'radial-gradient(circle, rgb(247 197 213 / .55), transparent 65%)' }} aria-hidden="true" />
}

function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-bg" exit={{ opacity: 0 }} transition={{ duration: 0.6 }} aria-hidden="true">
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.6, opacity: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="css-pearl float h-24 w-24" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const active = useActiveSection(ORDER)
  sceneState.active = active

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Loader done={ready} />
      <PearlBackdrop active={active} />
      <CursorGlow />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-white">Skip to content</a>
      <Navbar active={active} />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Publications />
        <GithubActivity />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
