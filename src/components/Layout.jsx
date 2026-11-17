import { useCallback, useEffect, useRef, useState, ViewTransition } from 'react'
import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router'
import { Menu, Moon, Sun } from 'lucide-react'
import Logo from './Logo.jsx'
import Intro from './Intro.jsx'
import { toggleScheme, useScheme } from '../lib/scheme.js'
import s from './Layout.module.css'

export const NAV = [
  ['/pantau', 'Pantau udara'],
  ['/prakiraan', 'Prakiraan'],
  ['/berita', 'Berita'],
  ['/edukasi', 'Edukasi'],
  ['/tentang', 'Tentang'],
]

export default function Layout() {
  const { pathname } = useLocation()
  const menu = useRef(null)
  const firstRender = useRef(true)
  const [intro, setIntro] = useState(() => 'intro' in document.documentElement.dataset)
  const endIntro = useCallback(() => {
    delete document.documentElement.dataset.intro
    setIntro(false)
  }, [])

  // After a client-side navigation: close the mobile menu and move focus to the new page heading.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (menu.current?.matches(':popover-open')) menu.current.hidePopover()
    document.querySelector('main h1')?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <>
      <a className={s.skip} href="#konten">Langsung ke konten</a>
      <header className={s.header}>
        <div className={`container ${s.headerInner}`}>
          <Link to="/" className={s.brand} aria-label="KADAR, ke beranda">
            <Logo />
          </Link>
          <nav aria-label="Utama" className={s.nav}>
            <button type="button" className={s.menuButton} popoverTarget="menu-utama" aria-controls="menu-utama">
              <Menu size={20} aria-hidden="true" />
              Menu
            </button>
            <ul id="menu-utama" ref={menu} popover="auto" className={s.menu}>
              {NAV.map(([to, label]) => (
                <li key={to}>
                  <NavLink to={to} className={s.link}>{label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <ViewTransition>
        <main id="konten">
          <Outlet />
        </main>
      </ViewTransition>

      <Footer />
      <ScrollRestoration />
      {intro && <Intro onDone={endIntro} />}
    </>
  )
}

function Footer() {
  const scheme = useScheme()
  return (
    <footer className={s.footer}>
      <div className={`container ${s.footerGrid}`}>
        <div className={s.footerBrand}>
          <Logo tagline />
          <p>Informasi kualitas udara untuk keputusan sehari-hari.</p>
        </div>

        <nav aria-label="Halaman">
          <ul className={s.footerList}>
            {NAV.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}
          </ul>
        </nav>

        <ul className={s.footerList}>
          <li><a href="mailto:halo@kadarudara.demo">halo@kadarudara.demo</a></li>
          <li><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram @kadar.udara</a></li>
          <li><a href="https://tiktok.com/" target="_blank" rel="noopener">TikTok @kabarudara</a></li>
        </ul>

        <button type="button" className={`btn ${s.theme}`} onClick={toggleScheme}>
          {scheme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          {scheme === 'dark' ? 'Tampilan terang' : 'Tampilan gelap'}
        </button>
      </div>

      <div className={`container ${s.legal}`}>
        <p>
          Semua angka AQI, polutan, suhu, dan prakiraan di situs ini adalah data simulasi untuk
          prototipe, bukan hasil pengukuran dan bukan dasar diagnosis medis.
        </p>
        <p>© 2026 KADAR (Kabar Udara)</p>
      </div>
    </footer>
  )
}
