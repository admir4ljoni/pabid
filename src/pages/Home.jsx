import { useState } from 'react'
import { Link } from 'react-router'
import { BookOpen, ChartLine, MapPinned, Newspaper } from 'lucide-react'
import { cities, findCity } from '../data/cities.js'
import { hourly } from '../data/forecast.js'
import { bestSlot, currentSlot, level, num, slotLabel, windowLabel } from '../lib/aqi.js'
import { aqiColor, Dot } from '../components/ui.jsx'
import s from './Home.module.css'

const FEATURES = [
  ['/pantau', MapPinned, 'Pantau udara', 'Peta AQI delapan kota, lengkap dengan saran aktivitas.'],
  ['/prakiraan', ChartLine, 'Prakiraan', 'Pola AQI hari ini per dua jam dan waktu terbaik untuk keluar rumah.'],
  ['/berita', Newspaper, 'Berita', 'Kabar kualitas udara dari WHO, UNEP, dan lembaga lainnya.'],
  ['/edukasi', BookOpen, 'Edukasi', 'Arti angka AQI, jenis polutan, dan siapa yang paling rentan.'],
]

export default function Home() {
  const [name, setName] = useState('Jakarta')
  // If the intro is playing, the forecast bars wait for it to finish (read once, on mount).
  const [delay] = useState(() => ('intro' in document.documentElement.dataset ? 1100 : 0))
  const city = findCity(name)
  const lv = level(city.aqi)
  const values = hourly[name]
  const best = bestSlot(values)
  const now = currentSlot()
  const scaleMax = Math.max(100, ...values)

  return (
    <>
      <title>KADAR · Kabar Udara</title>
      <section className={`container ${s.hero}`} aria-labelledby="judul">
        <div className={s.statement} aria-live="polite">
          <h1 id="judul" tabIndex={-1}>
            Udara di {name} sekarang {lv.label.toLowerCase()}.
          </h1>
          <p className={s.lede}>{lv.advice}</p>
        </div>

        <dl className={s.facts}>
          <div><dt>AQI</dt><dd className="num">{city.aqi}</dd></div>
          <div><dt>PM2.5</dt><dd className="num">{num.format(city.pm25)} <small>µg/m³</small></dd></div>
          <div><dt>PM10</dt><dd className="num">{num.format(city.pm10)} <small>µg/m³</small></dd></div>
          <div><dt>Suhu</dt><dd className="num">{city.temp} <small>°C</small></dd></div>
        </dl>

        <div className={s.picker} role="group" aria-label="Pilih kota">
          {cities.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-pressed={c.name === name}
              onClick={() => setName(c.name)}
            >
              <Dot aqi={c.aqi} />
              {c.name}
              <span className="num">{c.aqi}</span>
            </button>
          ))}
        </div>

        <figure className={s.forecast}>
          <ol
            key={name}
            className={s.bars}
            style={{ '--delay': `${delay}ms` }}
            aria-label={`Prakiraan AQI ${name} hari ini, per dua jam`}
          >
            {values.map((v, i) => (
              <li
                key={i}
                aria-current={i === now ? 'time' : undefined}
                style={{ '--i': i, '--h': v / scaleMax, '--c': aqiColor(v) }}
              >
                <span className={s.time}>{slotLabel(i)}</span>
                <span className={s.track}>
                  <span className={`${s.value} num`}>{v}</span>
                  <span className={s.bar} aria-hidden="true" />
                  <span className="sr-only">{level(v).label}{i === now && ', sekarang'}</span>
                </span>
              </li>
            ))}
          </ol>
          <figcaption className={s.caption}>
            <span>
              Waktu terbaik keluar rumah hari ini: <strong className="num">{windowLabel(best)}</strong>
            </span>
            <span className={s.actions}>
              <Link className="btn btn-primary" to={`/pantau?kota=${name}`}>Buka peta kota</Link>
              <Link className="btn" to={`/prakiraan?kota=${name}`}>Lihat prakiraan lengkap</Link>
            </span>
          </figcaption>
        </figure>
      </section>

      <section className={`container ${s.section}`} aria-labelledby="fitur">
        <h2 id="fitur">Yang bisa kamu lakukan di KADAR</h2>
        <ul className={s.features}>
          {FEATURES.map(([to, Icon, title, text]) => (
            <li key={to}>
              <Link to={to} className={s.feature}>
                <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                <span className={s.featureTitle}>{title}</span>
                <span className={s.featureText}>{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${s.section} ${s.about}`} aria-labelledby="tentang">
        <h2 id="tentang">Cek udara dulu, baru beraktivitas.</h2>
        <div className={s.aboutCopy}>
          <p>
            Udara yang buruk tidak selalu terlihat, tetapi dampaknya nyata bagi pernapasan. KADAR
            membantumu melihat kondisi udara sebelum berolahraga, berangkat kerja, atau mengantar anak
            ke sekolah.
          </p>
          <Link to="/tentang">Tentang KADAR</Link>
        </div>
      </section>
    </>
  )
}
