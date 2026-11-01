import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import { experience } from '../data/experience'
import { Reveal, Section, SectionHeading } from './Shared'

const years = ['2025 — 26', '2025']

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="experience">
      <SectionHeading index="03" label="Experience" title="Experience that turns|knowledge into execution." />

      <ol className="relative space-y-10">
        <span className="absolute bottom-0 left-[0.55rem] top-2 w-px bg-gradient-to-b from-rose via-orchid to-transparent lg:left-[13.1rem]" aria-hidden="true" />
        {experience.map((e, i) => {
          const isOpen = open === i
          return (
            <li key={e.company} className="relative grid gap-5 pl-9 lg:grid-cols-[12rem_1fr] lg:gap-14 lg:pl-0">
              <span className="absolute left-0 top-2 grid h-[1.15rem] w-[1.15rem] place-items-center rounded-full border border-rose bg-bg lg:left-[12.55rem]" aria-hidden="true">
                <span className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-rose' : 'bg-orchid'}`} />
              </span>

              <Reveal className="lg:text-right">
                <p className="font-display text-4xl font-medium leading-none tracking-tight text-iridescent sm:text-5xl">{years[i]}</p>
                <p className="mt-3 font-mono text-xs text-mute">{e.period}</p>
                <p className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-mute"><MapPin size={12} aria-hidden="true" />{e.location}</p>
              </Reveal>

              <Reveal delay={0.1}>
                <article className="paper overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`exp-${i}`}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left sm:p-8"
                  >
                    <span>
                      <span className="kicker">{e.kind}</span>
                      <span className="font-display mt-2 block text-3xl font-medium leading-tight tracking-tight sm:text-4xl">{e.role}</span>
                      <span className="italic-serif mt-1 block text-xl text-rose">{e.company}</span>
                    </span>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition ${isOpen ? 'rotate-180 bg-ink text-white' : ''}`}>
                      <ChevronDown size={18} aria-hidden="true" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`exp-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-3 px-6 pb-2 text-[0.98rem] leading-relaxed text-mute sm:px-8">
                          {e.points.map((p) => (
                            <li key={p} className="flex gap-3"><span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-peach" aria-hidden="true" />{p}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 px-6 pb-7 pt-5 sm:px-8">
                          {e.tech.map((t) => <span key={t} className="chip">{t}</span>)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
