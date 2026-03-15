import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

const stats = [
  { value: 96, suffix: '', label: 'PageSpeed Score', sublabel: 'rata-rata semua project' },
  { value: 2, prefix: '< ', suffix: ' detik', label: 'Loading Speed', sublabel: 'target setiap project' },
  { value: 100, suffix: '%', label: 'Custom Code', sublabel: 'zero template, zero WordPress' },
  { value: 0, suffix: '', label: 'Template Dipakai', sublabel: 'dijahit dari nol semua' },
]

const Counter = ({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 1800
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

const StatsSection = () => {
  return (
    <section className="py-16 border-y border-white/10 bg-[#161b22]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="font-montserrat font-black text-4xl sm:text-5xl text-white mb-2">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="font-montserrat font-bold text-sm text-[#2ad882] uppercase tracking-widest mb-1">
                {stat.label}
              </div>
              <div className="font-inter text-xs text-[#9ca3af]">
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection