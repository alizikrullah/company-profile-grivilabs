import { motion } from 'motion/react'

const problems = [
  {
    title: 'Website Lambat',
    desc: 'Loading di atas 5 detik. Pelanggan kabur sebelum halaman terbuka, konversi turun drastis.',
  },
  {
    title: 'Rawan Diretas',
    desc: 'WordPress dan plugin pihak ketiga membuka celah keamanan yang tidak ada habisnya.',
  },
  {
    title: 'Mentok Saat Scale',
    desc: 'Template pasaran tidak bisa berkembang. Ingin tambah fitur? Siap-siap Error 500.',
  },
]

const solutions = [
  {
    title: 'Sub-2 Second Load',
    desc: 'Deploy di Cloudflare Pages atau Vercel. Static-first architecture yang tidak bisa dikalahkan hosting biasa.',
  },
  {
    title: 'Zero Plugin Vulnerabilities',
    desc: '100% custom code. Tidak ada plugin pihak ketiga, tidak ada celah tersembunyi.',
  },
  {
    title: 'Infinite Scalability',
    desc: 'Arsitektur modular yang bisa dikembangkan kapanpun tanpa harus membuang fondasi yang ada.',
  },
]

const ProblemSolutionSection = () => {
  return (
    <section className="py-24 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">
            Mengapa Custom Code?
          </span>
          <h2 className="font-montserrat font-black uppercase text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
            Masalah yang{' '}
            <span className="text-[#2ad882]">Kami Selesaikan</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Problems */}
          <div>
            <p className="font-inter text-xs tracking-[0.3em] text-[#9ca3af] uppercase mb-8">
              Masalah Umum Website UMKM
            </p>
            <div className="space-y-5">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex gap-4 p-5 rounded-xl border border-red-500/20 bg-red-500/5"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-400 text-sm font-bold">✕</span>
                  </div>
                  <div>
                    <div className="font-montserrat font-bold text-white text-sm mb-1">
                      {p.title}
                    </div>
                    <div className="font-inter text-xs text-[#9ca3af] leading-relaxed">
                      {p.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <p className="font-inter text-xs tracking-[0.3em] text-[#9ca3af] uppercase mb-8">
              Solusi GriviLabs
            </p>
            <div className="space-y-5">
              {solutions.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.2, duration: 0.5 }}
                  className="flex gap-4 p-5 rounded-xl border border-[#2ad882]/20 bg-[#2ad882]/5"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#2ad882]/20 flex items-center justify-center">
                    <span className="text-[#2ad882] text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-montserrat font-bold text-white text-sm mb-1">
                      {s.title}
                    </div>
                    <div className="font-inter text-xs text-[#9ca3af] leading-relaxed">
                      {s.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ProblemSolutionSection