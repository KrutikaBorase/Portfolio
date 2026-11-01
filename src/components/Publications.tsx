import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, ExternalLink, GraduationCap, X } from 'lucide-react'
import { profile } from '../data/profile'
import { Reveal, Section, SectionHeading } from './Shared'
import Tilt from './Tilt'

function CertModal({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-[#12081f]/70 p-5 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label="SQL certification" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="paper relative w-full max-w-md p-8">
        <button ref={ref} type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line hover:bg-bg2"><X size={16} /></button>
        <Award className="text-rose" aria-hidden="true" />
        <h3 className="font-display mt-3 text-2xl font-medium">{profile.certification.name}</h3>
        <p className="text-mute">{profile.certification.issuer}</p>
        <a href={profile.certification.url} target="_blank" rel="noopener noreferrer" className="btn btn-solid mt-6"><ExternalLink size={15} aria-hidden="true" />Open certificate</a>
      </motion.div>
    </motion.div>
  )
}

/** A rosette seal: a decorative nod to a publication badge. */
function Seal() {
  const petals = Array.from({ length: 16 })
  return (
    <div className="relative grid h-36 w-36 shrink-0 place-items-center sm:h-40 sm:w-40" aria-hidden="true">
      <div className="spin-slow absolute inset-0">
        {petals.map((_, i) => (
          <span key={i} className="absolute left-1/2 top-1/2 h-full w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose/30" style={{ rotate: `${(i * 360) / petals.length}deg` }} />
        ))}
      </div>
      <div className="iridescent grid h-[72%] w-[72%] place-items-center rounded-full border border-white shadow-[inset_0_2px_6px_rgb(255_255_255/.9),0_12px_30px_-12px_rgb(168_40_106/.6)]">
        <div className="text-center">
          <p className="font-display text-2xl font-semibold leading-none text-ink">IEEE</p>
          <p className="font-mono mt-1 text-[0.6rem] tracking-[0.16em] text-ink/70">ICTBIG 2025</p>
        </div>
      </div>
    </div>
  )
}

export default function Publications() {
  const pub = profile.publication
  const edu = profile.education
  const cert = profile.certification
  const [certOpen, setCertOpen] = useState(false)

  return (
    <Section id="achievements">
      <SectionHeading index="05" label="Research & achievements" title="Building beyond code.|Contributing to knowledge." />

      <Reveal>
        <Tilt max={3} glare={false}>
          <article className="paper relative overflow-hidden p-7 sm:p-12">
            <div className="iridescent absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-50 blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-10 lg:grid-cols-[auto_1fr_17rem] lg:items-center">
              <Seal />
              <div>
                <p className="kicker">Published · {pub.venue}</p>
                <h3 className="font-display mt-3 text-3xl font-medium leading-[1.1] tracking-tight sm:text-[2.6rem]">{pub.title}</h3>
                <p className="mt-4 max-w-xl leading-relaxed text-mute">
                  Research behind my IoT anomaly detection project: an LSTM-based approach to identifying unusual behavior in IoT network traffic, backed by a Flask API and alert dashboard.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">{pub.tech.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                {pub.url && <a href={pub.url} target="_blank" rel="noopener noreferrer" className="btn btn-solid mt-6"><ExternalLink size={15} aria-hidden="true" />View on IEEE Xplore</a>}
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                {[['Conference', pub.venue], ['Year', pub.year], ['Domain', pub.domain], ['Project', 'IoT Anomaly Detection · 94.6%']].map(([k, v]) => (
                  <div key={k}>
                    <dt className="kicker !text-[0.64rem] !text-mute">{k}</dt>
                    <dd className="font-display mt-1 text-lg leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </Tilt>
      </Reveal>

      <div id="education" className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <Reveal>
          <Tilt max={4} className="h-full">
            <article className="paper h-full p-7 sm:p-9">
              <p className="kicker">06 — Education</p>
              <div className="mt-5 flex items-start gap-4">
                <span className="iridescent grid h-12 w-12 shrink-0 place-items-center rounded-full text-ink"><GraduationCap size={21} aria-hidden="true" /></span>
                <div>
                  <h3 className="font-display text-2xl font-medium leading-tight tracking-tight">{edu.degree}</h3>
                  <p className="mt-1 text-mute">{edu.institution}</p>
                  <p className="mt-1 font-mono text-xs text-mute">{edu.years}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="kicker !text-mute">CGPA</p>
                  <p className="font-display text-5xl font-medium leading-none text-iridescent">{edu.cgpa}</p>
                </div>
                <div className="flex flex-wrap gap-2">{edu.focus.map((f) => <span key={f} className="chip">{f}</span>)}</div>
              </div>
            </article>
          </Tilt>
        </Reveal>

        <Reveal delay={0.1}>
          <Tilt max={4} className="h-full">
            <article className="paper h-full p-7 sm:p-9">
              <p className="kicker">Certification</p>
              <div className="mt-5 flex items-start gap-4">
                <span className="iridescent grid h-12 w-12 shrink-0 place-items-center rounded-full text-ink"><Award size={21} aria-hidden="true" /></span>
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight">{cert.name}</h3>
                  <p className="mt-1 text-mute">{cert.issuer}</p>
                </div>
              </div>
              {cert.url && <button type="button" onClick={() => setCertOpen(true)} className="btn btn-line mt-7">View certificate</button>}
            </article>
          </Tilt>
        </Reveal>
      </div>

      <AnimatePresence>{certOpen && <CertModal onClose={() => setCertOpen(false)} />}</AnimatePresence>
    </Section>
  )
}
