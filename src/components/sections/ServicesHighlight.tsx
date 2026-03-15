import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { services } from '../../data/homeData'
import { BsLightningCharge } from 'react-icons/bs'
import { MdStorefront } from 'react-icons/md'
import { TbEngine } from 'react-icons/tb'

const ServicesHighlight = () => {
  return (
    <section className="py-24 bg-[#161b22]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">
            Apa yang Kami Tawarkan
          </span>
          <h2 className="font-montserrat font-black uppercase text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
            Pilih <span className="text-[#2ad882]">Paket Layanan</span>
          </h2>
          <p className="font-inter text-sm text-[#9ca3af] mt-4 max-w-xl mx-auto leading-relaxed">
            Setiap paket dirancang untuk kebutuhan bisnis yang berbeda. Semua sudah
            include domain dan hosting tahun pertama.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative rounded-xl p-8 border flex flex-col transition-all duration-300 ${
                service.featured
                  ? 'border-[#2ad882] bg-[#2ad882]/5'
                  : 'border-white/10 bg-[#0d1117] hover:border-white/25'
              }`}
            >
              {service.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-[#2ad882] text-[#0d1117] font-montserrat font-bold text-xs uppercase tracking-widest rounded-full">
                    Paling Populer
                  </span>
                </div>
              )}

              <div className="mb-5">
                {i === 0 && <BsLightningCharge size={32} color="#2ad882" />}
                {i === 1 && <MdStorefront size={32} color="#2ad882" />}
                {i === 2 && <TbEngine size={32} color="#2ad882" />}
              </div>
              <div className="font-montserrat font-black uppercase text-white text-xl mb-1">
                {service.name}
              </div>
              <div className="font-inter text-xs text-[#2ad882] tracking-wider mb-4">
                {service.subtitle}
              </div>
              <p className="font-inter text-sm text-[#9ca3af] leading-relaxed mb-6 flex-1">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 font-inter text-xs text-[#9ca3af]">
                    <span className="text-[#2ad882]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mb-6">
                <div className="font-montserrat font-black text-white text-xl">
                  {service.price}
                </div>
                {service.priceMax && (
                  <div className="font-inter text-xs text-[#9ca3af] mt-0.5">
                    sampai {service.priceMax}
                  </div>
                )}
                <div className="font-inter text-xs text-[#9ca3af] mt-1">
                  Estimasi: {service.duration}
                </div>
              </div>

              <Link
                to={`/services#${service.id}`}
                className={`block w-full text-center py-3 rounded-lg font-montserrat font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                  service.featured
                    ? 'bg-[#2ad882] text-[#0d1117] hover:bg-white'
                    : 'border border-white/20 text-white hover:border-[#2ad882] hover:text-[#2ad882]'
                }`}
              >
                Lihat Detail
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesHighlight