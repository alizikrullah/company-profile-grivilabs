import logoAgro from '../../assets/logo/logo-agro.webp'
import logoBeautybar from '../../assets/logo/logo-beautybar.webp'
import logoButik from '../../assets/logo/logo-butik.webp'
import logoCatering from '../../assets/logo/logo-catering.webp'
import logoCoffee from '../../assets/logo/logo-coffee.webp'
import logoFlorist from '../../assets/logo/logo-florist.webp'
import logoKlinik from '../../assets/logo/logo-klinik.webp'
import logoPadang from '../../assets/logo/logo-padang.webp'
import logoPadimas from '../../assets/logo/logo-padimas.webp'
import logoTechgear from '../../assets/logo/logo-techgear.webp'

const logos = [
  { src: logoPadimas, alt: 'Padimas Cake' },
  { src: logoKlinik, alt: 'Klinik Cantik Bersama' },
  { src: logoCoffee, alt: 'Nusantara Coffee' },
  { src: logoButik, alt: 'Butik Sari Mode' },
  { src: logoAgro, alt: 'Agro Nusantara' },
  { src: logoBeautybar, alt: 'Beauty Bar Jakarta' },
  { src: logoPadang, alt: 'Padang Express' },
  { src: logoFlorist, alt: 'Florist by Nita' },
  { src: logoTechgear, alt: 'TechGear Store' },
  { src: logoCatering, alt: 'Catering Bu Lestari' },
]

const LogoStrip = () => {
  const doubled = [...logos, ...logos]

  return (
    <section className="py-10 border-b border-white/10 bg-[#0d1117]">
      <div className="flex items-center gap-4 mb-8 px-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="font-inter text-xs tracking-[0.3em] text-[#9ca3af] uppercase whitespace-nowrap">
          Dipercaya oleh brand-brand pilihan
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Satu wrapper overflow-hidden, tidak nested */}
      <div className="overflow-hidden w-full">
        <div
          className="flex items-center"
          style={{
            gap: '1.5rem',
            width: 'max-content',
            animation: 'marquee 40s linear infinite',
            willChange: 'transform',
          }}
        >
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center bg-white rounded-xl"
              style={{
                width: '120px',
                height: '72px',
                padding: '8px 10px',
                opacity: 0.75,
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={56}
                className="object-contain"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LogoStrip
