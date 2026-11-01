export default function Marquee({
  items, variant = 'mono', className = '',
}: { items: string[]; variant?: 'mono' | 'serif' | 'outline-night'; className?: string }) {
  const row = [...items, ...items]
  const text =
    variant === 'mono' ? 'font-mono text-[0.72rem] uppercase tracking-[0.22em] text-mute'
    : variant === 'serif' ? 'font-display text-5xl italic text-ink/80 sm:text-7xl'
    : 'font-display text-6xl outline-text sm:text-8xl'
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <li key={`${k}-${i}`} className={`flex items-center whitespace-nowrap ${text}`}>
                <span className="px-6 sm:px-9">{t}</span>
                <span className="text-rose/70">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
