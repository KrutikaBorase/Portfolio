import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Award, ExternalLink, X } from 'lucide-react'
import { otherRepos, projects, type Project } from '../data/projects'
import { Reveal, Section, SectionHeading } from './Shared'
import { GithubIcon } from './icons'
import Tilt from './Tilt'
import Marquee from './Marquee'

const IotPreview = lazy(() => import('./ProjectPreviews').then((m) => ({ default: m.IotPreview })))
const TutorPreview = lazy(() => import('./ProjectPreviews').then((m) => ({ default: m.TutorPreview })))
const RidePreview = lazy(() => import('./ProjectPreviews').then((m) => ({ default: m.RidePreview })))

function Preview({ id }: { id: Project['id'] }) {
  const Cmp = id === 'iot' ? IotPreview : id === 'tutor' ? TutorPreview : RidePreview
  return (
    <Suspense fallback={<div className="h-64 w-full animate-pulse rounded-2xl bg-white/5" aria-hidden="true" />}>
      <Cmp />
    </Suspense>
  )
}

function Links({ p, dark = true }: { p: Project; dark?: boolean }) {
  const base = dark ? 'btn btn-ghost-dark !py-2.5 !text-[0.82rem]' : 'btn btn-line'
  return (
    <>
      {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className={base}><GithubIcon size={15} />GitHub</a>}
      {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className={base}><ExternalLink size={14} aria-hidden="true" />Live demo</a>}
      {p.publicationUrl && <a href={p.publicationUrl} target="_blank" rel="noopener noreferrer" className={base}><Award size={14} aria-hidden="true" />IEEE publication</a>}
    </>
  )
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const nodes = document.querySelectorAll<HTMLElement>('[data-modal] a[href], [data-modal] button')
        if (!nodes.length) return
        const first = nodes[0], last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus() }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-[#12081f]/80 p-0 backdrop-blur-md sm:items-center sm:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        data-modal
        role="dialog" aria-modal="true" aria-labelledby="modal-title"
        initial={{ y: 60, opacity: 0, rotateX: 8 }} animate={{ y: 0, opacity: 1, rotateX: 0 }} exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{ transformPerspective: 1200 }}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/12 bg-night2 p-6 text-[#fbf3ee] shadow-2xl sm:rounded-3xl sm:p-9"
      >
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close project details" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 hover:bg-white/10 hover:text-white"><X size={18} /></button>
        <p className="kicker !text-peach">Project {p.number} · {p.category}</p>
        <h3 id="modal-title" className="font-display mt-3 pr-12 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">{p.title}</h3>
        {p.period && <p className="mt-2 font-mono text-xs text-[#b6a5cc]">{p.period}</p>}

        <div className="mt-7"><Preview id={p.id} /></div>

        <div className="mt-8 grid gap-7 sm:grid-cols-2">
          <div><h4 className="kicker !text-peach">Problem</h4><p className="mt-2 leading-relaxed text-[#d6c9e6]">{p.problem}</p></div>
          <div><h4 className="kicker !text-peach">Solution</h4><p className="mt-2 leading-relaxed text-[#d6c9e6]">{p.solution}</p></div>
        </div>

        <h4 className="kicker mt-8 !text-peach">Key contributions</h4>
        <ul className="mt-3 space-y-2.5 leading-relaxed text-[#d6c9e6]">
          {p.highlights.map((h) => <li key={h} className="flex gap-3"><span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-peach" aria-hidden="true" />{h}</li>)}
        </ul>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {p.results.map((r) => (
            <div key={r.label} className="glass-dark rounded-2xl p-3 text-center sm:p-4">
              <p className="font-display text-2xl font-medium text-peach sm:text-3xl">{r.value}</p>
              <p className="mt-1 text-[0.7rem] text-[#b6a5cc] sm:text-xs">{r.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="chip chip-dark">{s}</span>)}</div>
        <div className="mt-7 flex flex-wrap gap-3"><Links p={p} /></div>
      </motion.div>
    </motion.div>
  )
}

function Chapter({ p, index, onOpen }: { p: Project; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotateX = useTransform(scrollYProgress, [0, 0.45, 1], [14, 0, -8])
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const flip = index % 2 === 1

  return (
    <article ref={ref} className="relative grid items-center gap-12 border-t border-white/10 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
      <span className="outline-text font-display pointer-events-none absolute -top-2 right-0 select-none text-[7rem] font-medium leading-none sm:text-[11rem] lg:-top-6" aria-hidden="true">{p.number}</span>

      <Reveal className={`relative lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
        <div className="flex flex-wrap items-center gap-2">
          <p className="kicker !text-peach">{p.category}</p>
        </div>
        {p.badge && (
          <span className="glass-dark mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.68rem] text-peach"><Award size={13} aria-hidden="true" />{p.badge}</span>
        )}
        <h3 className="font-display mt-5 text-[2rem] font-medium leading-[1.06] tracking-tight sm:text-[2.7rem]">{p.title}</h3>
        <p className="mt-4 leading-relaxed text-[#d6c9e6]">{p.description}</p>

        <dl className="mt-7 grid grid-cols-3 gap-3">
          {p.results.map((r) => (
            <div key={r.label} className="border-l border-peach/50 pl-3">
              <dt className="sr-only">{r.label}</dt>
              <dd className="font-display text-3xl font-medium leading-none text-peach sm:text-4xl">{r.value}</dd>
              <p className="mt-1.5 text-[0.7rem] leading-tight text-[#b6a5cc]" aria-hidden="true">{r.label}</p>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-1.5">{p.stack.map((s) => <span key={s} className="chip chip-dark">{s}</span>)}</div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={onOpen} className="btn btn-light">Explore project <ArrowUpRight size={15} aria-hidden="true" /></button>
          <Links p={p} />
        </div>
      </Reveal>

      <div className={`relative [perspective:1400px] lg:col-span-7 ${flip ? 'lg:order-1 lg:col-start-1' : ''}`}>
        <div className="iridescent absolute -inset-1 rounded-[2rem] opacity-20 blur-3xl sm:-inset-6" aria-hidden="true" />
        <motion.div style={{ rotateX, y, transformStyle: 'preserve-3d' }}>
          <Tilt max={6}>
            <button type="button" onClick={onOpen} aria-label={`Open ${p.title} details`} className="block w-full cursor-pointer text-left">
              <Preview id={p.id} />
            </button>
          </Tilt>
        </motion.div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <>
      <Section id="projects" tone="night">
        <SectionHeading
          index="04"
          label="Selected projects"
          tone="night"
          title="Turning complex problems into|intelligent solutions."
          lead="Previews are illustrative mockups of each system; the figures beside them come from my CV."
        />
        <div>
          {projects.map((p, i) => <Chapter key={p.id} p={p} index={i} onOpen={() => setActive(p)} />)}
        </div>

        <Reveal className="mt-10 border-t border-white/10 pt-16">
          <h3 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">More from <span className="italic-serif text-lilac">GitHub</span></h3>
          <p className="mt-2 text-sm text-[#b6a5cc]">Other public repositories, described from their READMEs.</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {otherRepos.map((r) => (
              <li key={r.name}>
                <Tilt max={4} className="glass-dark flex h-full flex-col rounded-3xl p-6 transition hover:border-peach/40">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-display text-xl font-medium">{r.name}</h4>
                    <div className="flex gap-1">
                      <a href={r.url} target="_blank" rel="noopener noreferrer" aria-label={`${r.name} on GitHub`} className="grid h-9 w-9 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"><GithubIcon size={16} /></a>
                      {r.demo && <a href={r.demo} target="_blank" rel="noopener noreferrer" aria-label={`${r.name} live demo`} className="grid h-9 w-9 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"><ExternalLink size={15} /></a>}
                    </div>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#cdbfe0]">{r.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">{r.stack.map((s) => <span key={s} className="chip chip-dark">{s}</span>)}</div>
                </Tilt>
              </li>
            ))}
          </ul>
        </Reveal>

        <AnimatePresence>{active && <Modal p={active} onClose={() => setActive(null)} />}</AnimatePresence>
      </Section>
      <div className="relative z-10 overflow-hidden bg-night pb-10"><Marquee variant="outline-night" items={['Build', 'Learn', 'Ship', 'Iterate']} /></div>
    </>
  )
}
