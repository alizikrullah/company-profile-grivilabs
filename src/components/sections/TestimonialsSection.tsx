import { useCallback } from 'react'
import { motion } from 'motion/react'
import useEmblaCarousel from 'embla-carousel-react'
import { testimonials } from '../../data/homeData'

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="py-24 bg-[#161b22] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">
              Apa Kata Klien Kami
            </span>
            <h2 className="font-montserrat font-black uppercase text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
              Testimoni <span className="text-[#2ad882]">Klien</span>
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#2ad882] hover:text-[#2ad882] transition-all duration-300"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#2ad882] hover:text-[#2ad882] transition-all duration-300"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </motion.div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-none w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="p-8 rounded-xl border border-white/10 bg-[#0d1117] h-full flex flex-col">
                  <div className="text-[#2ad882] text-4xl font-serif leading-none mb-4">"</div>
                  <p className="font-inter text-sm text-[#9ca3af] leading-relaxed flex-1 mb-6">
                    {t.text}
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <div className="font-montserrat font-bold text-white text-sm">{t.name}</div>
                    <div className="font-inter text-xs text-[#9ca3af] mt-1">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection