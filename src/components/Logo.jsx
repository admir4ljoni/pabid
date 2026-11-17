import { Wind } from 'lucide-react'
import s from './Logo.module.css'

// Brand mark: Lucide's Wind icon on a brand tile, with a typeset wordmark.
export default function Logo({ tagline = false, className = '' }) {
  return (
    <span className={`${s.logo} ${className}`}>
      <span className={s.mark} aria-hidden="true">
        <Wind strokeWidth={2.25} />
      </span>
      <span className={s.text}>
        <span className={s.word}>KADAR</span>
        {tagline && <span className={s.tagline}>Kabar Udara</span>}
      </span>
    </span>
  )
}
