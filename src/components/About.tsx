import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { Reveal, Section, SectionHeading } from './Shared'
import Tilt from './Tilt'
import Marquee from './Marquee'

function CountUp({ to, decimals = 0, plain = false }: { to: number; decimals?: number; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (reduce) { setVal(to); return }
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: setVal })
    return () => c.stop()
  }, [inView, to, reduce])

  return <span ref={ref}>{plain ? Math.round(val) : val.toFixed(decimals)}</span>
}

export default function About() {
  const [lead, ...rest] = profile.about
  return (
    <>
      <Section id="about">
        <SectionHeading index="01" label="About me" title="Engineering today.|Innovating for tomorrow." />

        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="font-display text-[1.7rem] font-normal leading-[1.28] tracking-tight sm:text-[2.1rem]">{lead}</p>
            <div className="mt-8 max-w-xl space-y-5 text-[1.02rem] leading-relaxed text-mute">
              {rest.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {['Backend & REST APIs', 'Machine Learning', 'Generative AI'].map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 self-start lg:col-span-5" role="list" aria-label="Highlights">
            {profile.metrics.map((m, i) => (
              <Reveal key={m.caption} delay={i * 0.09} className={i % 2 ? 'translate-y-6' : ''}>
                <Tilt max={10} className="glass h-full rounded-3xl p-5 sm:p-6">
                  <div role="listitem">
                    <p className="font-display text-[2.7rem] font-medium leading-none tracking-tight sm:text-5xl">
                      <span className="text-iridescent"><CountUp to={m.value} decimals={m.decimals} plain={m.plain} /></span>
                      <span className="text-rose">{m.suffix}</span>
                    </p>
                    <p className="kicker mt-4 !text-[0.66rem]">{m.label}</p>
                    <p className="mt-1 text-sm text-mute">{m.caption}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <div className="relative z-10 border-y border-line bg-white/40 py-8 backdrop-blur-sm">
        <Marquee variant="serif" items={['Backend', 'Machine Learning', 'Generative AI', 'REST APIs', 'Data Science']} />
      </div>
    </>
  )
}
