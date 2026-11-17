import { Link } from 'react-router'
import { PageHeader } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <div className="container">
      <title>Halaman tidak ditemukan · KADAR</title>
      <PageHeader title="Halaman tidak ditemukan">
        Alamat ini tidak ada di KADAR. Periksa ejaannya, atau mulai lagi dari beranda.
      </PageHeader>
      <Link className="btn btn-primary" to="/">Ke beranda</Link>
    </div>
  )
}
