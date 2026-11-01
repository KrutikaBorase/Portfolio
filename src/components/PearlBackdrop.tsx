import { lazy, Suspense, useEffect, useState } from 'react'
import { desktopSlots, mobileSlots } from '../scene/sceneState'

const PearlScene = lazy(() => import('../scene/PearlScene'))

type Mode = 'pending' | '3d' | 'css'

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

function pickMode(): Mode {
  const q = new URLSearchParams(window.location.search).get('pearl')
  if (q === 'css') return 'css'
  if (q === '3d' && webglAvailable()) return '3d'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'css'
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  if ((nav.deviceMemory ?? 8) <= 2 || (nav.hardwareConcurrency ?? 8) < 2 || nav.connection?.saveData) return 'css'
  return webglAvailable() ? '3d' : 'css'
}

/**
 * The pearl that travels with the reader. Uses a WebGL scene when the device can handle it, otherwise a
 * CSS version of the same object that glides between the same positions.
 */
export default function PearlBackdrop({ active }: { active: string }) {
  const [mode, setMode] = useState<Mode>('pending')
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    setMode(pickMode())
    const mq = window.matchMedia('(max-width: 767px)')
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const lite = mobile || ((navigator.hardwareConcurrency ?? 8) <= 4)

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {mode === '3d' && (
        <Suspense fallback={null}>
          <div className="h-full w-full animate-[fadein_1.2s_ease_both]">
            <PearlScene mobile={mobile} lite={lite} />
          </div>
        </Suspense>
      )}
      {mode === 'css' && <CssPearl active={active} mobile={mobile} />}
    </div>
  )
}

function CssPearl({ active, mobile }: { active: string; mobile: boolean }) {
  const slots = mobile ? mobileSlots : desktopSlots
  const slot = slots[active] ?? slots.home
  const size = `${slot.s * 100}vh` // radius = s * half-height  ->  diameter = s * vh
  return (
    <div
      className="css-pearl float absolute"
      style={{
        width: size, height: size,
        left: `${50 + slot.x * 50}%`, top: `${50 - slot.y * 50}%`,
        translate: '-50% -50%',
        transition: 'left 1.3s cubic-bezier(.2,.8,.2,1), top 1.3s cubic-bezier(.2,.8,.2,1), width 1.3s cubic-bezier(.2,.8,.2,1), height 1.3s cubic-bezier(.2,.8,.2,1)',
      }}
    />
  )
}
