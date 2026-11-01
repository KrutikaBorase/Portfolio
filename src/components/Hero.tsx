import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownRight, ArrowRight, Brain, Download, Server, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'
import { GithubIcon, LinkedInIcon } from './icons'
import Marquee from './Marquee'
import Tilt from './Tilt'

function SplitWord({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.08em] [perspective:600px] ${className}`} aria-hidden="true">
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block origin-bottom"
          initial={{ y: '105%', rotateX: -75, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % profile.roles.length), 2800)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-block h-[1.5em] min-w-[16ch] align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: 16, opacity: 0, rotateX: -40 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -16, opacity: 0, rotateX: 40 }}
          transition={{ duration: 0.45 }}
          className="italic-serif text-iridescent absolute left-0 top-0 whitespace-nowrap"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const chips = [
  { icon: Server, title: 'Backend', text: 'REST APIs · Flask · FastAPI', pos: 'right-[4%] top-[22%]', rot: -4 },
  { icon: Brain, title: 'AI / ML', text: 'LSTM · TensorFlow', pos: 'right-[26%] top-[62%]', rot: 3 },
  { icon: Sparkles, title: 'GenAI', text: 'LLMs · RAG · Ollama', pos: 'right-[2%] top-[72%]', rot: -2 },
]

const ticker = ['Python', 'Flask', 'FastAPI', 'REST APIs', 'TensorFlow', 'LSTM', 'LangChain', 'RAG', 'Ollama', 'SQL', 'Docker', 'pytest']

export default function Hero() {
  return (
    <section id="home" className="relative z-10 flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28">
      <div className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center gap-3">
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2">
            <span className="pulse-dot h-2 w-2 rounded-full bg-rose" />
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink">Available for opportunities</span>
          </span>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mute">Portfolio · 2026</span>
        </motion.div>

        <h1 className="font-display mt-8 text-[clamp(4.1rem,17.5vw,12.5rem)] font-medium leading-[0.86] tracking-[-0.045em]" aria-label="Krutika Borase">
          <span className="block"><SplitWord text="Krutika" delay={0.25} /></span>
          <span className="block pl-[0.5em] sm:pl-[1.1em]"><SplitWord text="Borase" delay={0.55} className="italic-serif text-iridescent pr-[0.1em]" /></span>
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,34rem)_1fr]">
          <div>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="font-display text-2xl leading-snug sm:text-[1.75rem] [perspective:600px]">
              <RotatingRole />
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mt-3 text-lg font-medium text-ink">
              {profile.headline[0]} {profile.headline[1]}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-mute">
              {profile.summary}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35 }} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-solid">Explore my work <ArrowRight size={16} aria-hidden="true" /></a>
              {profile.resumeUrl && <a href={profile.resumeUrl} download className="btn btn-line"><Download size={16} aria-hidden="true" /> Download resume</a>}
              <a href="#contact" className="btn btn-line">Let's connect</a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-7 flex items-center gap-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="glass grid h-11 w-11 place-items-center rounded-full text-ink transition hover:text-rose"><GithubIcon /></a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="glass grid h-11 w-11 place-items-center rounded-full text-ink transition hover:text-rose"><LinkedInIcon /></a>
              <a href="#about" className="ml-3 inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mute hover:text-ink">Scroll <ArrowDownRight size={14} aria-hidden="true" className="float" /></a>
            </motion.div>
          </div>
        </div>

        {/* floating glass cards orbiting the pearl (desktop only) */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          {chips.map(({ icon: Icon, title, text, pos, rot }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.15, duration: 0.8 }}
              className={`pointer-events-auto absolute ${pos}`}
              style={{ rotate: `${rot}deg` }}
            >
              <div className="float" style={{ animationDelay: `${i * 1.3}s` }}>
                <Tilt max={14} className="glass w-52 rounded-2xl p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/80 text-rose shadow-sm"><Icon size={17} /></span>
                  <p className="font-display mt-3 text-xl leading-none">{title}</p>
                  <p className="mt-1 font-mono text-[0.68rem] text-mute">{text}</p>
                </Tilt>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative mt-14 border-y border-line bg-white/30 py-4 backdrop-blur-sm">
        <Marquee items={ticker} />
      </div>
    </section>
  )
}
