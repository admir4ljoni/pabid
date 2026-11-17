import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { news } from '../data/news.js'
import { Chips, PageHeader } from '../components/ui.jsx'
import s from './Content.module.css'

const CATEGORIES = ['Semua', ...new Set(news.map((n) => n.category))].map((c) => [c, c])

export default function News() {
  const [category, setCategory] = useState('Semua')
  const items = news.filter((n) => category === 'Semua' || n.category === category)

  return (
    <div className="container">
      <title>Berita · KADAR</title>
      <PageHeader title="Berita udara bersih">
        Isu kualitas udara dan lingkungan, dengan tautan langsung ke lembaga sumbernya.
      </PageHeader>

      <Chips label="Saring menurut topik" options={CATEGORIES} value={category} onChange={setCategory} />

      <ul className={s.news}>
        {items.map((n, i) => (
          <li key={n.title} className={i === 0 && category === 'Semua' ? s.lead : undefined}>
            <article className={s.article}>
              <p className={s.meta}>
                <span className={s.category}>{n.category}</span>
                <span>{n.minutes} menit baca</span>
              </p>
              <h2>
                <a href={n.url} target="_blank" rel="noopener" className={s.articleLink}>
                  {n.title}
                  <span className="sr-only"> (membuka tab baru)</span>
                </a>
              </h2>
              <p className={s.summary}>{n.summary}</p>
              <p className={s.source}>
                <ExternalLink size={16} aria-hidden="true" />
                Sumber: {n.source}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
