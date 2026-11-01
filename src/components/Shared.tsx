import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({ children, delay = 0, className = '', y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Title format: "Plain part|Italic gradient part". */
export function SectionHeading({
  index, label, title, lead, tone = 'light', align = 'left',
}: { index: string; label: string; title: string; lead?: string; tone?: 'light' | 'night'; align?: 'left' | 'center' }) {
  const [a, b] = title.split('|')
  const night = tone === 'night'
  return (
    <Reveal className={`mb-14 max-w-4xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`kicker flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${night ? '!text-peach' : ''}`}>
        <span className={`font-display text-lg normal-case tracking-normal ${night ? 'text-white/40' : 'text-ink/30'}`}>{index}</span>
        <span className={`h-px w-10 ${night ? 'bg-white/25' : 'bg-ink/25'}`} />
        {label}
      </p>
      <h2 className={`font-display mt-5 text-[2.5rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.4rem] ${night ? 'text-[#fbf3ee]' : ''}`}>
        {a}
        {b && (<><br /><span className={`italic-serif ${night ? 'text-lilac' : 'text-iridescent'}`}>{b}</span></>)}
      </h2>
      {lead && <p className={`mt-6 max-w-2xl text-[1.05rem] leading-relaxed ${night ? 'text-[#cdbfe0]' : 'text-mute'}`}>{lead}</p>}
    </Reveal>
  )
}

export function Section({ id, children, tone = 'light', className = '' }: { id: string; children: ReactNode; tone?: 'light' | 'night'; className?: string }) {
  return (
    <section
      id={id}
      className={`relative z-10 ${tone === 'night' ? 'bg-night text-[#fbf3ee]' : ''}`}
    >
      <div className={`mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 lg:py-36 ${className}`}>{children}</div>
    </section>
  )
}
