import { ArrowUp, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { GithubIcon, LinkedInIcon } from './icons'

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden bg-night text-[#fbf3ee]">
      <div className="sheen-line" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-20 sm:px-8">
        <p className="outline-text font-display select-none text-[clamp(3.4rem,13vw,10rem)] font-medium leading-[0.9] tracking-[-0.04em]" aria-hidden="true">
          Krutika <span className="italic-serif">Borase</span>
        </p>
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm text-[#e4d9f0]">Designed &amp; Built with curiosity by Krutika Borase.</p>
            <p className="mt-1 font-mono text-xs text-[#b6a5cc]">© {new Date().getFullYear()} Krutika Borase</p>
          </div>
          <div className="flex items-center gap-2">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-peach hover:text-peach"><GithubIcon /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-peach hover:text-peach"><LinkedInIcon /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-peach hover:text-peach"><Mail size={18} aria-hidden="true" /></a>
            <a href="#home" className="btn btn-ghost-dark ml-2 !py-3"><ArrowUp size={15} aria-hidden="true" />Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
