import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BsLightningCharge } from 'react-icons/bs'
import { MdStorefront, MdOutlineSupport } from 'react-icons/md'
import { TbEngine, TbLifebuoy } from 'react-icons/tb'

interface PricingTier {
  name: string
  badge?: string
  price: string
  priceNote?: string
  desc: string
  features: string[]
  cta: string
  highlighted?: boolean
}

interface ServicePackage {
  id: string
  label: string
  shortLabel: string
  icon: React.ReactNode
  tagline: string
  tiers: PricingTier[]
  single?: boolean
}

const packages: ServicePackage[] = [
  {
    id: 'hook', label: 'The Hook', shortLabel: 'Landing Page',
    icon: <BsLightningCharge size={20} />,
    tagline: 'Satu halaman, satu tujuan: konversi.',
    tiers: [
      {
        name: 'Starter', price: 'Rp 1.300.000',
        priceNote: 'Termasuk domain .my.id & Cloudflare 1 tahun',
        desc: 'Cocok untuk bisnis yang baru mulai go-digital dengan 1 produk atau event.',
        features: ['1 Halaman long-scroll', '1 CTA utama (WA / Form)', 'Domain .my.id gratis 1 tahun', 'Hosting Cloudflare Pages (gratis selamanya)', 'Mobile responsive', 'Basic SEO setup'],
        cta: 'Pilih Starter',
      },
      {
        name: 'Standard', badge: 'Paling Diminati', price: 'Rp 1.700.000',
        priceNote: 'Termasuk domain .my.id & Cloudflare 1 tahun',
        desc: 'Untuk bisnis yang ingin tampil lebih meyakinkan dengan konten lebih lengkap.',
        features: ['Semua fitur Starter', 'Hingga 5 section konten', 'Integrasi pixel tracking (Meta/Google)', 'Form kontak dengan notifikasi email', 'Animasi scroll modern', 'Basic copywriting konsultasi'],
        cta: 'Pilih Standard', highlighted: true,
      },
      {
        name: 'Pro', price: 'Rp 2.300.000',
        priceNote: 'Termasuk domain .my.id & Cloudflare 1 tahun',
        desc: 'Solusi lengkap untuk kampanye digital dan peluncuran produk serius.',
        features: ['Semua fitur Standard', 'Integrasi WhatsApp Chat langsung', 'Galeri produk / portofolio', 'Countdown timer (untuk event/promo)', 'Google Analytics terintegrasi', 'Revisi hingga 3 kali'],
        cta: 'Pilih Pro',
      },
    ],
  },
  {
    id: 'storefront', label: 'Digital Storefront', shortLabel: 'Company Profile',
    icon: <MdStorefront size={20} />,
    tagline: 'Wajah digital perusahaan yang tidak bisa dilupakan.',
    tiers: [
      {
        name: 'Essential', price: 'Rp 3.500.000',
        priceNote: 'Termasuk domain .my.id & Cloudflare 1 tahun',
        desc: 'Company profile 4 halaman untuk bisnis yang ingin hadir secara profesional di web.',
        features: ['4 Halaman (Home, About, Services, Contact)', 'Domain .my.id gratis 1 tahun', 'Hosting Cloudflare Pages', 'Desain UI/UX eksklusif (bukan template)', 'Mobile & tablet responsive', 'SEO on-page dasar'],
        cta: 'Pilih Essential',
      },
      {
        name: 'Growth', badge: 'Best Choice', price: 'Rp 4.500.000',
        priceNote: 'Termasuk domain .my.id & Cloudflare 1 tahun',
        desc: 'Untuk bisnis yang butuh kehadiran digital lengkap dengan kemampuan update konten mandiri.',
        features: ['5 Halaman (+ Halaman Blog/Portfolio)', 'Semua fitur Essential', 'Integrasi Headless CMS (kelola konten sendiri)', 'Form kontak dengan notifikasi email', 'Google Maps terintegrasi', 'Optimasi PageSpeed 90+ score'],
        cta: 'Pilih Growth', highlighted: true,
      },
      {
        name: 'Premium', price: 'Rp 6.000.000',
        priceNote: 'Termasuk domain .my.id & Cloudflare 1 tahun',
        desc: 'Company profile kelas korporat dengan fitur lengkap dan arsitektur yang siap scale.',
        features: ['6 Halaman + Blog sistem penuh', 'Semua fitur Growth', 'SEO setup komprehensif (meta, schema, sitemap)', 'Integrasi media sosial & WhatsApp Business', 'Custom animasi interaktif', 'Revisi hingga 3 kali, garansi bug 30 hari'],
        cta: 'Pilih Premium',
      },
    ],
  },
  {
    id: 'engine', label: 'The Engine', shortLabel: 'Web App / E-Commerce',
    icon: <TbEngine size={20} />,
    tagline: 'Sistem digital kompleks yang siap menopang pertumbuhan bisnis.',
    tiers: [
      {
        name: 'Starter', price: 'Rp 10.000.000',
        priceNote: 'Termasuk domain .com & VPS 1 tahun',
        desc: 'Untuk bisnis yang butuh fitur dinamis: sistem login, database, dan panel admin mandiri.',
        features: ['Sistem autentikasi (login/register)', 'Database PostgreSQL / MySQL', 'Panel admin custom', 'Domain .com gratis 1 tahun', 'VPS server Linux (setup & konfigurasi)', 'Keamanan SSL & firewall dasar'],
        cta: 'Konsultasi Dulu',
      },
      {
        name: 'Business', badge: 'Most Popular', price: 'Rp 15.000.000',
        priceNote: 'Termasuk domain .com & VPS 1 tahun',
        desc: 'Solusi e-commerce atau web app lengkap dengan payment gateway dan manajemen produk.',
        features: ['Semua fitur Starter', 'Integrasi payment gateway (Midtrans / Xendit)', 'Manajemen produk & katalog', 'Sistem order & notifikasi', 'Dashboard analitik penjualan', 'Staging server untuk testing'],
        cta: 'Konsultasi Dulu', highlighted: true,
      },
      {
        name: 'Enterprise', price: 'Custom',
        priceNote: 'Harga sesuai spesifikasi fitur',
        desc: 'Untuk kebutuhan khusus: booking system, multi-role, multi-bahasa, atau fitur yang tidak ada di paket standar.',
        features: ['Semua fitur Business', 'Fitur custom sesuai kebutuhan spesifik', 'Arsitektur microservice (jika diperlukan)', 'Integrasi third-party API', 'Dedicated support selama development', 'Dokumentasi teknis lengkap'],
        cta: 'Diskusi Scope',
      },
    ],
  },
  {
    id: 'rescue', label: 'Digital Rescue', shortLabel: 'Rescue & Revamp',
    icon: <TbLifebuoy size={20} />,
    tagline: 'Website kamu bermasalah? Kami perbaiki dari akar masalahnya.',
    single: true,
    tiers: [{
      name: 'Digital Rescue & Revamp', price: 'Mulai dari Diagnosa',
      priceNote: 'Harga menyesuaikan tingkat kerusakan dan scope perombakan',
      desc: 'Layanan penyelamatan dan perombakan total untuk website yang sudah tidak bisa diselamatkan dengan patch biasa.',
      features: ['Diagnosa mendalam: audit kode, keamanan, performa', 'Ekstraksi data dari sistem lama (konten, database, aset)', 'Perombakan total ke Custom Code modern', 'Eliminasi semua sisa kode WordPress / template lama', 'Optimasi performa: target PageSpeed 90+', 'Jaminan bebas dari celah keamanan yang sama'],
      cta: 'Ceritakan Masalahmu', highlighted: true,
    }],
  },
  {
    id: 'guardian', label: 'Digital Guardian', shortLabel: 'Retainer',
    icon: <MdOutlineSupport size={20} />,
    tagline: 'Biarkan kami jaga, kamu fokus berbisnis.',
    single: true,
    tiers: [{
      name: 'Digital Guardian', price: 'Rp 500.000 – 1.000.000',
      priceNote: 'Per bulan, harga menyesuaikan paket asalnya',
      desc: 'Paket maintenance bulanan purnajual setelah website Go-Live. Website sehat tanpa harus mikir teknis.',
      features: ['Monitoring server & uptime 24/7', 'Backup database rutin (mingguan)', 'Perbaikan bug minor tanpa biaya tambahan', 'Update dependensi & keamanan', 'Laporan performa bulanan', 'Prioritas respons untuk perubahan kecil'],
      cta: 'Daftar Sekarang', highlighted: true,
    }],
  },
]

const testimonials = [
  { text: 'Tim GriviLabs menyelesaikan website company profile kami dalam waktu kurang dari sebulan. Hasilnya jauh melampaui ekspektasi cepat, estetik, dan bisa kami kelola sendiri.', name: 'Ahmad Fauzan', role: 'Owner, Toko Batik Sejati', paket: 'Digital Storefront' },
  { text: 'Sistem e-commerce kami sekarang bisa handle ratusan order per hari tanpa downtime. Investasinya sebanding dengan peningkatan konversi yang kami rasakan bulan pertama.', name: 'Dewi Anggraini', role: 'CEO, Skincare Organik ID', paket: 'The Engine' },
  { text: 'Website kami diserang dan down total. GriviLabs berhasil melakukan Digital Rescue dan meluncurkan versi baru yang jauh lebih kencang dalam 3 hari kerja.', name: 'Rendi Kusuma', role: 'Founder, F&B Brand Bandung', paket: 'Digital Rescue' },
]

const PricingCard = ({ tier, index }: { tier: PricingTier; index: number }) => {
  const waText = encodeURIComponent(`Halo GriviLabs, saya tertarik dengan paket ${tier.name}. Boleh saya konsultasi lebih lanjut?`)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative flex flex-col p-8 rounded-xl border transition-all duration-300 ${tier.highlighted ? 'border-[#2ad882] bg-[#2ad882]/5' : 'border-white/10 bg-[#0d1117] hover:border-white/25'}`}
    >
      {tier.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 bg-[#2ad882] text-[#0d1117] font-montserrat font-bold text-xs uppercase tracking-widest rounded-full whitespace-nowrap">{tier.badge}</span>
        </div>
      )}
      <h4 className="font-montserrat font-black uppercase text-white text-lg mb-2">{tier.name}</h4>
      <p className="font-inter text-xs text-[#9ca3af] leading-relaxed mb-5">{tier.desc}</p>
      <div className="mb-5 pb-5 border-b border-white/10">
        <p className={`font-montserrat font-black text-2xl sm:text-3xl ${tier.highlighted ? 'text-[#2ad882]' : 'text-white'}`}>{tier.price}</p>
        {tier.priceNote && <p className="font-inter text-[11px] text-[#9ca3af] mt-1">{tier.priceNote}</p>}
      </div>
      <ul className="space-y-2.5 mb-7 flex-1">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="text-[#2ad882] mt-0.5 shrink-0">✓</span>
            <span className="font-inter text-sm text-[#9ca3af] leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={`https://wa.me/628993157370?text=${waText}`}
        target="_blank" rel="noopener noreferrer"
        className={`block text-center py-3 px-6 rounded-lg font-montserrat font-bold uppercase tracking-widest text-sm transition-all duration-300 ${tier.highlighted ? 'bg-[#2ad882] text-[#0d1117] hover:bg-white' : 'border border-white/20 text-white hover:border-[#2ad882] hover:text-[#2ad882]'}`}
      >
        {tier.cta}
      </a>
    </motion.div>
  )
}

const Services = () => {
  const [activePackage, setActivePackage] = useState<string>('hook')
  const current = packages.find((p) => p.id === activePackage)!

  return (
    <main>
      <section className="pt-32 pb-24 bg-[#0d1117] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#2ad882]" style={{ filter: 'blur(140px)', opacity: 0.05 }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">Layanan Kami</span>
            <h1 className="font-montserrat font-black uppercase tracking-tight text-5xl sm:text-6xl lg:text-8xl text-white leading-none mt-4">
              Investasi, <br /><span className="text-[#2ad882]">Bukan Biaya.</span>
            </h1>
            <p className="font-inter text-sm sm:text-base leading-relaxed text-[#9ca3af] mt-6 max-w-2xl">
              Semua paket sudah mencakup domain dan hosting untuk tahun pertama. Tidak ada biaya tersembunyi. Tidak ada template pasaran. Semua dibuat khusus untuk kamu.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#161b22]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">Pilih Paket</span>
            <h2 className="font-montserrat font-black uppercase text-3xl sm:text-4xl lg:text-5xl text-white mt-4 mb-10">
              Paket <span className="text-[#2ad882]">Layanan Kami</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setActivePackage(pkg.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-montserrat font-bold uppercase tracking-widest text-xs transition-all duration-200 ${activePackage === pkg.id ? 'bg-[#2ad882] text-[#0d1117]' : 'border border-white/20 text-[#9ca3af] hover:border-[#2ad882]/40 hover:text-white'}`}
                >
                  <span>{pkg.icon}</span>{pkg.shortLabel}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={current.id + '-header'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mb-8 text-center">
              <h3 className="font-montserrat font-black uppercase text-2xl sm:text-3xl text-white">{current.label}</h3>
              <p className="font-inter text-sm text-[#9ca3af] mt-1">{current.tagline}</p>
            </motion.div>
          </AnimatePresence>

          <div className={`grid gap-6 ${current.single ? 'grid-cols-1 max-w-lg mx-auto' : 'grid-cols-1 md:grid-cols-3'}`}>
            {current.tiers.map((tier, i) => <PricingCard key={tier.name} tier={tier} index={i} />)}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8 flex items-start gap-3 p-5 rounded-xl border border-white/10 bg-[#0d1117]">
            <span className="text-[#2ad882] shrink-0 mt-0.5">ℹ</span>
            <p className="font-inter text-xs text-[#9ca3af] leading-relaxed">
              Semua paket menggunakan skema pembayaran <span className="text-white font-semibold">3 termin (40% – 30% – 30%)</span>. Development dimulai setelah DP diterima dan minimal 50% aset dari klien sudah diserahkan. Garansi bug fixing 30 hari setelah Go-Live.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#0d1117] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">Social Proof</span>
            <h2 className="font-montserrat font-black uppercase text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
              Hasil yang <span className="text-[#2ad882]">Nyata</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }} className="p-8 rounded-xl border border-white/10 bg-[#161b22] flex flex-col">
                <span className="inline-block self-start px-3 py-1 bg-[#2ad882]/10 text-[#2ad882] font-inter text-[10px] tracking-[0.2em] uppercase rounded-full mb-4">{t.paket}</span>
                <div className="text-[#2ad882] text-4xl font-serif leading-none mb-4">"</div>
                <p className="font-inter text-sm text-[#9ca3af] leading-relaxed flex-1 mb-6">{t.text}</p>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-montserrat font-bold text-white text-sm">{t.name}</div>
                  <div className="font-inter text-xs text-[#9ca3af] mt-1">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#161b22] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-[#2ad882]" style={{ filter: 'blur(120px)', opacity: 0.06 }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-8">
            <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">Gratis, Tanpa Komitmen</span>
            <h2 className="font-montserrat font-black uppercase text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Bingung Pilih <br /><span className="text-[#2ad882]">Paket yang Mana?</span>
            </h2>
            <p className="font-inter text-sm text-[#9ca3af] leading-relaxed max-w-lg mx-auto">
              Ceritakan dulu kebutuhan dan anggaran kamu. Kami bantu identifikasi solusi terbaik dalam 10 menit konsultasi tanpa basa-basi.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={`https://wa.me/628993157370?text=${encodeURIComponent('Halo GriviLabs, saya ingin konsultasi untuk menentukan paket yang tepat untuk bisnis saya.')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-[#2ad882] text-[#0d1117] font-montserrat font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-white transition-colors duration-300">
                💬 Konsultasi via WhatsApp
              </a>
              <a href="mailto:hello@grivilabs.com" className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-montserrat font-bold uppercase tracking-widest text-sm rounded-lg hover:border-[#2ad882] hover:text-[#2ad882] transition-colors duration-300">
                ✉ hello@grivilabs.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default Services