import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { categories, skills, type CategoryId } from '../data/skills'
import { Reveal, Section, SectionHeading } from './Shared'
import { SkillIcon } from './icons'

type Filter = CategoryId | 'all'

export default function Skills() {
  const [filter, setFilter] = useState<Filter>('all')
  const [focus, setFocus] = useState<string | null>(null)

  const visible = useMemo(() => (filter === 'all' ? skills : skills.filter((s) => s.cat === filter)), [filter])
  const related = useMemo(() => {
    if (!focus) return null
    const s = skills.find((x) => x.name === focus)
    const set = new Set<string>([focus, ...(s?.related ?? [])])
    skills.forEach((x) => x.related?.includes(focus) && set.add(x.name))
    return set
  }, [focus])

  const counts = useMemo(() => {
    const m = new Map<CategoryId, number>()
    skills.forEach((s) => m.set(s.cat, (m.get(s.cat) ?? 0) + 1))
    return m
  }, [])

  const tabs: { id: Filter; label: string; n: number; blurb?: string }[] = [
    { id: 'all', label: 'Everything', n: skills.length },
    ...categories.map((c) => ({ id: c.id as Filter, label: c.label, n: counts.get(c.id) ?? 0, blurb: c.blurb })),
  ]
  const activeTab = tabs.find((t) => t.id === filter)

  return (
    <Section id="expertise">
      <SectionHeading
        index="02"
        label="Technical expertise"
        title="Technologies I use to|build intelligent products."
        lead="Pick a discipline, then hover or focus a tool to see how I use it and what it connects to."
      />

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] [&>*]:min-w-0">
        <Reveal>
          <div role="tablist" aria-label="Filter technologies by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
            {tabs.map((t) => {
              const on = filter === t.id
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => { setFilter(t.id); setFocus(null) }}
                  className={`group relative flex shrink-0 items-baseline justify-between gap-6 whitespace-nowrap rounded-full border px-4 py-2.5 text-left transition lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:bg-transparent lg:px-0 lg:py-3.5 ${
                    on ? 'border-ink bg-ink text-white lg:!text-rose' : 'border-line bg-white/50 text-ink hover:border-rose'
                  }`}
                >
                  <span className={`font-display text-lg lg:text-[1.55rem] ${on ? '' : 'lg:group-hover:translate-x-1.5'} transition-transform`}>{t.label}</span>
                  <span className="font-mono text-[0.68rem] opacity-60">{String(t.n).padStart(2, '0')}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <div>
          {activeTab?.blurb && <p className="kicker mb-5">{activeTab.blurb}</p>}
          <motion.ul layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-live="polite">
            <AnimatePresence mode="popLayout">
              {visible.map((s) => {
                const dim = related && !related.has(s.name)
                const hot = related?.has(s.name) && focus !== s.name
                return (
                  <motion.li
                    layout
                    key={s.name}
                    initial={{ opacity: 0, scale: 0.94, y: 10 }}
                    animate={{ opacity: dim ? 0.35 : 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setFocus(s.name)}
                      onMouseLeave={() => setFocus(null)}
                      onFocus={() => setFocus(s.name)}
                      onBlur={() => setFocus(null)}
                      aria-describedby={`tip-${s.name.replace(/\W/g, '')}`}
                      className={`group flex h-full w-full items-start gap-4 rounded-2xl border p-4 text-left transition duration-300 ${
                        focus === s.name
                          ? 'border-rose bg-white shadow-[0_18px_40px_-20px_rgb(168_40_106/.55)] -translate-y-1'
                          : hot ? 'border-orchid/60 bg-white/80' : 'border-line bg-white/55 hover:border-rose/50 hover:bg-white/80'
                      }`}
                    >
                      <span className={`iridescent grid h-11 w-11 shrink-0 place-items-center rounded-full transition ${focus === s.name ? 'scale-110 text-rose' : 'text-ink/75'}`}>
                        <SkillIcon icon={s.icon} cat={s.cat} size={19} />
                      </span>
                      <span>
                        <span className="font-display block text-[1.15rem] leading-tight">{s.name}</span>
                        <span id={`tip-${s.name.replace(/\W/g, '')}`} className="mt-1 block text-[0.8rem] leading-snug text-mute">{s.note}</span>
                      </span>
                    </button>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </Section>
  )
}
