import { motion } from 'motion/react'

const CTASection = () => {
  return (
    <section className="py-24 bg-[#0d1117] relative overflow-hidden">

      {/* Glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[500px] rounded-full bg-[#2ad882]"
          style={{ filter: 'blur(120px)', opacity: 0.06 }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">
            Siap Mulai?
          </span>

          <h2 className="font-montserrat font-black uppercase text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            Bisnis Anda Layak<br />
            <span className="text-[#2ad882]">Website Terbaik.</span>
          </h2>

          <p className="font-inter text-sm text-[#9ca3af] leading-relaxed max-w-lg mx-auto">
            Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan bisnis Anda,
            dan kami bantu carikan solusi yang paling tepat.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/628993157370"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#2ad882] text-[#0d1117] font-montserrat font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-white transition-colors duration-300"
            >
              💬 Konsultasi via WhatsApp
            </a>
            <a
              href="mailto:hello@grivilabs.id"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-montserrat font-bold uppercase tracking-widest text-sm rounded-lg hover:border-[#2ad882] hover:text-[#2ad882] transition-colors duration-300"
            >
              ✉ hello@grivilabs.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection