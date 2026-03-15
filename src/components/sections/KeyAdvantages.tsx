import { motion } from 'motion/react'
import { VscCode } from 'react-icons/vsc'
import { MdOutlineSpeed, MdHandshake } from 'react-icons/md'
import { TbStack2 } from 'react-icons/tb'
import { advantages } from '../../data/homeData'

const icons = [
  <VscCode size={32} color="#2ad882" />,
  <MdOutlineSpeed size={32} color="#2ad882" />,
  <TbStack2 size={32} color="#2ad882" />,
  <MdHandshake size={32} color="#2ad882" />,
]

const KeyAdvantages = () => {
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
            Kenapa GriviLabs?
          </span>
          <h2 className="font-montserrat font-black uppercase text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
            Keunggulan <span className="text-[#2ad882]">Kami</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 rounded-xl border border-white/10 bg-[#161b22] hover:border-[#2ad882]/40 hover:bg-[#2ad882]/5 transition-all duration-300"
            >
              <div className="mb-5">{icons[i]}</div>
              <h3 className="font-montserrat font-black uppercase text-white text-lg mb-3">
                {adv.title}
              </h3>
              <p className="font-inter text-sm text-[#9ca3af] leading-relaxed">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KeyAdvantages