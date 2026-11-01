import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { profile } from '../data/profile'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { GithubIcon } from './icons'

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ active }: { active: string }) {
  const { progress, scrolled } = useScrollProgress()
  const [open, setOpen] = useState(false)
  // the GitHub and contact chapters aren't in the nav; light up the nearest entry
  const current = active === 'github' ? 'achievements' : active

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-rose via-orchid to-peach"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:px-4 ${
          scrolled || open ? 'glass' : 'border border-transparent'
        }`}
      >
        <a href="#home" aria-label="Krutika Borase, back to top" className="flex items-center gap-2.5 pl-1">
          <span className="css-pearl float grid h-9 w-9 place-items-center" aria-hidden="true" />
          <span className="font-display text-lg font-medium tracking-tight">Krutika<span className="italic-serif text-rose"> B.</span></span>
        </a>

        <ul className="relative hidden items-center lg:flex">
          {NAV.map((n) => (
            <li key={n.id} className="relative">
              <a
                href={`#${n.id}`}
                aria-current={current === n.id ? 'true' : undefined}
                className={`relative z-10 block rounded-full px-3.5 py-2 text-[0.82rem] font-medium transition-colors ${current === n.id ? 'text-ink' : 'text-mute hover:text-ink'}`}
              >
                {n.label}
              </a>
              {current === n.id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/80 shadow-[0_4px_16px_-6px_rgb(168_40_106/.4)]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="grid h-9 w-9 place-items-center rounded-full text-ink/70 transition hover:bg-white/70 hover:text-ink">
            <GithubIcon size={18} />
          </a>
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} download className="btn btn-solid hidden !px-4 !py-2.5 !text-[0.8rem] sm:inline-flex">
              <Download size={14} aria-hidden="true" /> Resume
            </a>
          )}
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/70 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="glass mx-auto mt-2 max-w-5xl rounded-3xl p-3 lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className={`font-display block rounded-2xl px-4 py-3 text-2xl ${current === n.id ? 'bg-white/80 text-rose' : 'text-ink'}`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              {profile.resumeUrl && (
                <li className="mt-2">
                  <a href={profile.resumeUrl} download className="btn btn-solid w-full justify-center"><Download size={15} aria-hidden="true" /> Download Resume</a>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
