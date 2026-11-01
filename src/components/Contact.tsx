import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2, Mail, MapPin, Send, TriangleAlert } from 'lucide-react'
import { profile } from '../data/profile'
import { Reveal, Section, SectionHeading } from './Shared'
import { GithubIcon, LinkedInIcon } from './icons'

const ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() ?? ''
type Values = { name: string; email: string; subject: string; message: string }
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'mailto'

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Please enter a valid email address.'
  if (v.subject.trim().length < 3) e.subject = 'Please add a short subject.'
  if (v.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.'
  return e
}

const field = 'w-full rounded-2xl border bg-white/70 px-4 py-3.5 text-[0.95rem] text-ink placeholder:text-mute/60 transition focus:border-rose focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose/10'

export default function Contact() {
  const [v, setV] = useState<Values>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setV((s) => ({ ...s, [k]: e.target.value }))
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) return

    if (!ENDPOINT) {
      // No form service configured: hand the message to the visitor's mail client instead of faking a send.
      const body = `${v.message}\n\n— ${v.name} (${v.email})`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(v),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setV({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const err = (k: keyof Values) => errors[k] && <p id={`${k}-err`} role="alert" className="mt-1.5 text-xs font-medium text-rose">{errors[k]}</p>
  const props = (k: keyof Values) => ({
    id: k, name: k, value: v[k], onChange: set(k), 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined,
    className: `${field} ${errors[k] ? 'border-rose' : 'border-line'}`,
  })

  return (
    <Section id="contact">
      <SectionHeading
        index="07"
        label="Let's connect"
        title="Have an interesting idea?|Let's build something meaningful."
        lead="I'm always interested in discussing software development, AI/ML applications, backend engineering, and opportunities to build innovative products."
      />

      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <ul className="space-y-3">
            {[
              { icon: <Mail size={18} aria-hidden="true" />, label: 'Email', text: profile.email, href: `mailto:${profile.email}` },
              { icon: <MapPin size={18} aria-hidden="true" />, label: 'Location', text: profile.location },
              { icon: <LinkedInIcon size={18} />, label: 'LinkedIn', text: 'linkedin.com/in/krutika-borase', href: profile.linkedin },
              { icon: <GithubIcon size={18} />, label: 'GitHub', text: 'github.com/KrutikaBorase', href: profile.github },
            ].map((c) => {
              const inner = (
                <>
                  <span className="iridescent grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink">{c.icon}</span>
                  <span className="min-w-0">
                    <span className="kicker block !text-[0.62rem] !text-mute">{c.label}</span>
                    <span className="block truncate text-[0.95rem] text-ink">{c.text}</span>
                  </span>
                </>
              )
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="glass flex items-center gap-4 rounded-full p-2.5 pr-6 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgb(168_40_106/.55)]">{inner}</a>
                  ) : (
                    <div className="glass flex items-center gap-4 rounded-full p-2.5 pr-6">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="glass space-y-5 rounded-[2rem] p-6 sm:p-9" aria-label="Contact form">
            <div className="grid gap-5 sm:grid-cols-2">
              <div><label htmlFor="name" className="mb-1.5 block text-sm font-medium">Name</label><input type="text" autoComplete="name" {...props('name')} />{err('name')}</div>
              <div><label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label><input type="email" autoComplete="email" {...props('email')} />{err('email')}</div>
            </div>
            <div><label htmlFor="subject" className="mb-1.5 block text-sm font-medium">Subject</label><input type="text" {...props('subject')} />{err('subject')}</div>
            <div><label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label><textarea rows={5} {...props('message')} />{err('message')}</div>

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status === 'sending'} className="btn btn-solid disabled:opacity-60">
                {status === 'sending' ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <div aria-live="polite" className="text-sm">
                {status === 'sent' && <span className="flex items-center gap-2 text-emerald-700"><CheckCircle2 size={16} aria-hidden="true" />Message sent. Thank you!</span>}
                {status === 'mailto' && <span className="flex items-center gap-2 text-orchid"><Mail size={16} aria-hidden="true" />Your email app should open with the message ready to send.</span>}
                {status === 'error' && <span className="flex items-center gap-2 text-rose"><TriangleAlert size={16} aria-hidden="true" />Couldn't send. Please try again or email me directly.</span>}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
