import { motion, type Variants } from 'motion/react'
import { Link } from 'react-router-dom'

const codeLines = [
  { text: '// GriviLabs 100% Custom Code', color: '#6b7280' },
  { text: 'const website = buildFrom("scratch")', color: '#9ca3af' },
  { text: '  .stack(["React", "TypeScript"])', color: '#9ca3af' },
  { text: '  .noWordPress(true)', color: '#2ad882' },
  { text: '  .performance  // 98 / 100', color: '#2ad882' },
  { text: '  .security     // bulletproof', color: '#2ad882' },
  { text: '  .scalable     // always', color: '#2ad882' },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0d1117]">

      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, #2ad882 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0d1117_80%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

        {/* ── Left: Text Content ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2ad882]/30 bg-[#2ad882]/10">
              <span className="w-2 h-2 rounded-full bg-[#2ad882] animate-pulse" />
              <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">
                Tech Studio · Jakarta
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="font-montserrat font-black uppercase tracking-tight">
            <span className="block text-5xl sm:text-6xl lg:text-7xl text-white leading-none">
              No Templates.
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl text-[#2ad882] leading-none mt-2">
              Just Results.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={itemVariants} className="font-inter text-sm sm:text-base leading-relaxed text-[#9ca3af] max-w-md">
            Kami membangun website bisnis Anda dari nol menggunakan kode murni, bukan
            template WordPress. Hasilnya: lebih cepat, lebih aman, dan siap tumbuh
            bersama bisnis Anda.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link
              to="/services"
              className="inline-block px-8 py-4 bg-[#2ad882] text-[#0d1117] font-montserrat font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-white transition-colors duration-300"
            >
              Lihat Layanan
            </Link>
            <a
              href="https://wa.me/628993157370"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border border-[#2ad882]/50 text-[#2ad882] font-montserrat font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-[#2ad882]/10 transition-colors duration-300"
            >
              Konsultasi Gratis
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: Browser Mockup ── */}
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
        >
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#161b22] shadow-[0_0_80px_rgba(42,216,130,0.08)]">

            {/* Browser chrome */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#1c2128] border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 mx-2 px-3 py-1.5 rounded-md bg-[#0d1117] border border-white/10">
                <span className="font-inter text-xs text-[#9ca3af]">grivilabs.com/your-website</span>
              </div>
            </div>

            {/* Code lines */}
            <div className="p-6 font-mono text-sm min-h-[260px]">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.18, duration: 0.4 }}
                  className="leading-8 flex gap-4"
                >
                  <span className="text-[#6b7280] select-none w-5 text-right shrink-0">
                    {i + 1}
                  </span>
                  <span style={{ color: line.color }}>{line.text}</span>
                </motion.div>
              ))}

              {/* Blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.7 + codeLines.length * 0.18,
                }}
                className="inline-block w-[9px] h-5 bg-[#2ad882] ml-9 mt-1 align-middle"
              />
            </div>

            {/* Status bar */}
            <div className="px-6 py-3 bg-[#1c2128] border-t border-white/10 flex items-center justify-between">
              <span className="font-inter text-xs text-[#9ca3af]">
                ✓ React + TypeScript + Tailwind
              </span>
              <span className="font-inter text-xs text-[#2ad882] font-semibold">
                Performance: 98/100
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default HeroSection