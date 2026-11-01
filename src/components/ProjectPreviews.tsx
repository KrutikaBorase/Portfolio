import { useEffect, useMemo, useState } from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { AlertTriangle, ArrowRight, FileText, Send, ShieldCheck } from 'lucide-react'

/* Every preview is an illustrative mockup. Chart values are generated for visual effect and are NOT project
   data; only the KPI figures taken from the CV are real. */

const C = { lilac: '#cdb8f5', peach: '#ff9e7d', rose: '#ff8fb8', alert: '#ff6b8a', grid: 'rgba(255,255,255,0.07)', axis: '#8f7fa6' }
const panel = 'rounded-xl border border-white/10 bg-white/[0.04] p-3'
const label = 'font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#b6a5cc]'

function Frame({ children, aria, className = '' }: { children: React.ReactNode; aria: string; className?: string }) {
  return (
    <div role="img" aria-label={aria} className={`relative rounded-2xl border border-white/12 bg-[#150a26]/90 p-4 shadow-[0_30px_80px_-30px_rgb(0_0_0/.7)] ${className}`}>
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" />
      </div>
      {children}
      <span className="absolute bottom-2 right-3 font-mono text-[0.58rem] uppercase tracking-widest text-white/35">Illustrative preview</span>
    </div>
  )
}

function seeded(n: number) {
  let s = 7
  return Array.from({ length: n }, () => ((s = (s * 9301 + 49297) % 233280) / 233280))
}

const noMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function IotPreview() {
  const rnd = useMemo(() => seeded(40), [])
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (noMotion()) return
    const t = setInterval(() => setTick((x) => x + 1), 1400)
    return () => clearInterval(t)
  }, [])

  const data = useMemo(
    () => Array.from({ length: 28 }, (_, i) => {
      const k = (i + tick) % 40
      const spike = k === 9 || k === 22 || k === 31
      return { t: i, traffic: 30 + rnd[k] * 28 + (spike ? 45 : 0), anomaly: spike ? 75 + rnd[k] * 10 : null }
    }),
    [rnd, tick],
  )
  const alerts = [
    { id: 'dev-04', msg: 'Abnormal packet burst', sev: 'high' },
    { id: 'dev-11', msg: 'Unusual traffic pattern', sev: 'med' },
    { id: 'dev-02', msg: 'Within normal range', sev: 'ok' },
  ]
  const stages = ['Traffic', 'Preprocess', 'LSTM', 'Flask API', 'Alerts']

  return (
    <Frame aria="Illustrative mockup of an IoT security monitoring dashboard with live traffic chart, alert list and inference pipeline" className="grid gap-3 sm:grid-cols-[1.6fr_1fr]">
      <div className={panel}>
        <div className="mb-1 flex items-center justify-between">
          <span className={label}>Network activity</span>
          <span className="flex items-center gap-1.5 font-mono text-[0.62rem] text-peach"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-peach" />monitoring</span>
        </div>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 6, right: 4, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={C.lilac} stopOpacity={0.5} /><stop offset="1" stopColor={C.lilac} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="t" hide />
              <YAxis tick={{ fill: C.axis, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Area type="monotone" dataKey="traffic" stroke={C.lilac} strokeWidth={1.8} fill="url(#trafficFill)" isAnimationActive={false} />
              <Area type="monotone" dataKey="anomaly" stroke={C.alert} strokeWidth={0} fill={C.alert} fillOpacity={0.45} isAnimationActive={false} connectNulls={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1 font-mono text-[0.6rem] text-[#b6a5cc]">
          {stages.map((s, i) => (
            <span key={s} className="flex items-center gap-1">
              <span className={`rounded-full border px-2 py-0.5 ${s === 'LSTM' ? 'border-peach/70 text-peach' : 'border-white/12'}`}>{s}</span>
              {i < stages.length - 1 && <ArrowRight size={10} aria-hidden="true" />}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className={panel}>
          <p className={label}>Detection accuracy</p>
          <p className="font-display mt-1 text-4xl font-medium text-peach">94.6%</p>
          <p className="text-[0.7rem] text-[#b6a5cc]">115K+ N-BaIoT samples</p>
        </div>
        <ul className={`${panel} space-y-1.5`}>
          {alerts.map((a) => (
            <li key={a.id} className="flex items-center gap-2 text-[0.72rem]">
              {a.sev === 'ok' ? <ShieldCheck size={13} className="text-emerald-300" aria-hidden="true" /> : <AlertTriangle size={13} className={a.sev === 'high' ? 'text-rose-300' : 'text-amber-300'} aria-hidden="true" />}
              <span className="font-mono text-[#b6a5cc]">{a.id}</span><span className="truncate text-white/85">{a.msg}</span>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  )
}

export function TutorPreview() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (noMotion()) { setStep(4); return }
    const t = setInterval(() => setStep((s) => (s + 1) % 6), 1500)
    return () => clearInterval(t)
  }, [])

  const flow = ['Question', 'Retrieve', 'Prompt', 'Ollama LLM', 'Answer']
  return (
    <Frame aria="Illustrative mockup of the AI Tutor: a question, retrieved documents, and a generated explanation">
      <div className="grid gap-3 sm:grid-cols-[1.5fr_1fr]">
        <div className={`${panel} space-y-2.5 text-[0.78rem] leading-relaxed`}>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-lilac/25 px-3 py-2 text-white">Explain how backpropagation works.</div>
          <div className={`max-w-[92%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.05] px-3 py-2 text-[#d6c9e6] transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-35'}`}>
            {step >= 3
              ? 'Backpropagation computes how much each weight contributed to the error, then nudges the weights to reduce it, layer by layer from the output back to the input.'
              : <span className="inline-flex items-center gap-1">thinking<span className="caret">▍</span></span>}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/12 px-3 py-2 text-[#b6a5cc]"><span className="flex-1 text-xs">Ask a follow-up…</span><Send size={13} aria-hidden="true" /></div>
        </div>

        <div className={`${panel} space-y-2`}>
          <p className={label}>Retrieved context</p>
          {['Neural networks — overview', 'Gradient descent notes', 'Chain rule refresher'].map((d, i) => (
            <div key={d} className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 text-[0.7rem] transition ${step >= 1 && step - 1 >= i ? 'border-peach/60 text-white' : 'border-white/10 text-white/35'}`}>
              <FileText size={12} aria-hidden="true" className="text-peach" />{d}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1 font-mono text-[0.6rem] text-[#b6a5cc]">
        {flow.map((f, i) => (
          <span key={f} className="flex items-center gap-1">
            <span className={`rounded-full border px-2 py-0.5 transition ${step >= i + 1 || (step === 0 && i === 0) ? 'border-peach/70 text-peach' : 'border-white/12'}`}>{f}</span>
            {i < flow.length - 1 && <ArrowRight size={10} aria-hidden="true" />}
          </span>
        ))}
      </div>
    </Frame>
  )
}

export function RidePreview() {
  const rnd = useMemo(() => seeded(48), [])
  const hourly = useMemo(
    () => Array.from({ length: 24 }, (_, h) => {
      const base = 20 + 160 * Math.exp(-((h - 8) ** 2) / 5) + 190 * Math.exp(-((h - 17.5) ** 2) / 7) + 60 * Math.exp(-((h - 13) ** 2) / 12)
      const actual = base + (rnd[h] - 0.5) * 24
      return { h: `${h}`, actual: Math.round(actual), predicted: Math.round(base) }
    }),
    [rnd],
  )
  return (
    <Frame aria="Illustrative mockup of the Power BI style dashboard showing predicted versus actual demand, hourly demand and model KPIs" className="grid gap-3 sm:grid-cols-[1.5fr_1fr]">
      <div className={panel}>
        <p className={`${label} mb-1`}>Predicted vs actual demand</p>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourly} margin={{ top: 6, right: 4, left: -26, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} vertical={false} />
              <XAxis dataKey="h" tick={{ fill: C.axis, fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fill: C.axis, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Line type="monotone" dataKey="actual" stroke={C.peach} strokeWidth={1.8} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="predicted" stroke={C.lilac} strokeWidth={1.8} strokeDasharray="4 3" dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 font-mono text-[0.6rem] text-[#b6a5cc]">
          <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-peach" />actual</span>
          <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 border-t border-dashed border-lilac" />predicted</span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className={panel}><p className={label}>R²</p><p className="font-display text-3xl font-medium text-peach">0.91</p></div>
          <div className={panel}><p className={label}>RMSE</p><p className="font-display text-3xl font-medium text-peach">38.4</p></div>
        </div>
        <div className={panel}>
          <p className={`${label} mb-1`}>Hourly demand</p>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourly} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                <Bar dataKey="actual" fill={C.lilac} radius={[3, 3, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Frame>
  )
}
