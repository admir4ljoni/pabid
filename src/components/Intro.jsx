import { useEffect } from 'react'
import { Wind } from 'lucide-react'
import s from './Intro.module.css'

const SEEN = 'kadar-intro'

// Decided once, before React renders, so Home can delay its own entrance to follow it.
export function shouldPlayIntro() {
  if (location.pathname !== '/') return false
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    if (sessionStorage.getItem(SEEN)) return false
    sessionStorage.setItem(SEEN, '1')
    return true
  } catch {
    return false
  }
}

// ~1.3s logo reveal over the already-rendered page. Click or any key skips it.
export default function Intro({ onDone }) {
  useEffect(() => {
    addEventListener('keydown', onDone, { once: true })
    return () => removeEventListener('keydown', onDone)
  }, [onDone])

  return (
    <div
      className={s.intro}
      aria-hidden="true"
      onClick={onDone}
      onAnimationEnd={(e) => e.target === e.currentTarget && onDone()}
    >
      <div className={s.logo}>
        <span className={s.mark}><Wind strokeWidth={2.25} /></span>
        <span className={s.word}>KADAR</span>
      </div>
    </div>
  )
}
