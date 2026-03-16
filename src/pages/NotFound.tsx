import { Link } from 'react-router-dom'
import SEO from '../components/seo/SEO'

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 - Halaman Tidak Ditemukan"
        description="Halaman yang kamu cari tidak ada atau sudah dipindahkan."
        noIndex={true}
      />
      <main className="min-h-screen bg-[#0d1117] flex items-center justify-center px-6">
        <div className="text-center">

          {/* Big 404 watermark */}
          <p
            aria-hidden="true"
            className="font-montserrat font-black text-[140px] sm:text-[200px] text-white leading-none select-none"
            style={{ opacity: 0.05 }}
          >
            404
          </p>

          {/* Content */}
          <div className="-mt-6 sm:-mt-10 space-y-4">
            <h1 className="font-montserrat font-black uppercase tracking-tight text-3xl sm:text-5xl text-white leading-tight">
              Halaman Tidak<br />
              <span className="text-[#2ad882]">Ditemukan.</span>
            </h1>
            <p className="font-inter text-[#9ca3af] text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              URL yang kamu akses tidak ada atau sudah dipindahkan ke lokasi lain.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-[#2ad882] text-[#0d1117] font-montserrat font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-white transition-colors duration-300"
            >
              Kembali ke Home
            </Link>
            <Link
              to="/blog"
              className="inline-block px-8 py-4 border border-[#2ad882]/50 text-[#2ad882] font-montserrat font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-[#2ad882]/10 transition-colors duration-300"
            >
              Baca Blog
            </Link>
          </div>

        </div>
      </main>
    </>
  )
}

export default NotFound
