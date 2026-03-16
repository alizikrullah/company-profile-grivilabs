import { motion } from 'motion/react'
import SEO from '../components/seo/SEO'
import { VscCode } from 'react-icons/vsc'
import { MdOutlineSpeed, MdHandshake } from 'react-icons/md'
import { TbStack2 } from 'react-icons/tb'

// ------------------------------------
// DATA
// ------------------------------------

const milestones = [
  {
    year: 'Feb 2026',
    title: 'Studio Didirikan',
    desc: 'GriviLabs resmi berdiri sebagai independent tech studio berbasis di Indonesia.',
  },
  {
    year: 'Mar 2026',
    title: 'Portofolio Pertama',
    desc: 'Project company profile pertama berhasil meraih skor PageSpeed 95+ di semua kategori.',
  },
  {
    year: '2026+',
    title: 'Tujuan Akhir',
    desc: 'Membangun sistem perusahaan mandiri dengan tim developer dan operasional sendiri.',
  },
]

const values = [
  {
    icon: <VscCode size={32} color="#2ad882" />,
    tag: 'Prinsip #01',
    title: 'Anti-WordPress',
    subtitle: '100% Custom Code',
    desc: 'Website dijahit dari nol menggunakan framework JavaScript modern. Bebas bloatware, bebas plugin crash, bebas Error 500 yang memalukan.',
  },
  {
    icon: <MdOutlineSpeed size={32} color="#2ad882" />,
    tag: 'Prinsip #02',
    title: 'Speed is Money',
    subtitle: 'Performa Konversi',
    desc: 'Loading di bawah 2 detik bukan sekadar angka teknis. Di bisnis B2C, kecepatan adalah perbedaan antara pelanggan yang stay dan yang kabur ke kompetitor.',
  },
  {
    icon: <TbStack2 size={32} color="#2ad882" />,
    tag: 'Prinsip #03',
    title: 'Scalable Architecture',
    subtitle: 'Arsitektur Masa Depan',
    desc: 'Pondasi kode disiapkan untuk tumbuh bersama bisnis kamu. Ketika UMKM kamu membesar, kamu tinggal tambahkan modul baru di atas fondasi yang sudah ada.',
  },
  {
    icon: <MdHandshake size={32} color="#2ad882" />,
    tag: 'Prinsip #04',
    title: 'Transparansi & Edukasi',
    subtitle: 'Transparent Tech Partner',
    desc: 'Tidak ada bahasa alien IT untuk mengecoh klien. Setiap keputusan teknis dijelaskan dengan bahasa yang manusiawi karena kamu berhak tahu apa yang kamu beli.',
  },
]

const founders = [
  {
    initials: 'AZ',
    name: 'Aliyu Zikrullah',
    role: 'Tech Lead & Fullstack Developer',
    bio: 'Memegang kendali penuh atas arsitektur sistem, logika back-end, manajemen server, dan deployment. Bertanggung jawab atas arah project, negosiasi kontrak, dan keamanan infrastruktur digital klien.',
  },
  {
    initials: 'BP',
    name: 'Bagus Pratama',
    role: 'Creative Lead & UI/UX Designer',
    bio: 'Bertanggung jawab atas seluruh wajah visual produk mulai dari wireframing di Figma, kurasi estetika aset klien, slicing desain ke kode, hingga quality control tampilan di semua ukuran layar.',
  },
]

// COMPONENT

const About = () => {
  return (
    <>
      <SEO
        title="Tentang Kami"
        description="Kenali GriviLabs lebih dekat. Tech studio independen yang didirikan untuk membantu UMKM Indonesia memiliki aset digital yang cepat, aman, dan scalable tanpa bergantung pada template WordPress."
        canonical="/about"
      />
      <main>

      {/* ==============================
          HERO - bg primary
      ============================== */}
      <section className="pt-32 pb-24 bg-[#0d1117] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[600px] h-[600px] rounded-full bg-[#2ad882]"
            style={{ filter: 'blur(140px)', opacity: 0.05 }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">
              Tentang Kami
            </span>
            <h1 className="font-montserrat font-black uppercase tracking-tight text-5xl sm:text-6xl lg:text-8xl text-white leading-none mt-4">
              Kami Bukan <br />
              <span className="text-[#2ad882]">Sekedar Vendor.</span>
            </h1>
            <p className="font-inter text-sm sm:text-base leading-relaxed text-[#9ca3af] mt-6 max-w-2xl">
              Kami adalah mitra bisnis yang tidak datang untuk sekadar menyelesaikan pesanan.<br></br>
              Setiap project yang kami pegang adalah tanggung jawab penuh dari arsitektur
              kode <br></br> sampai pertumbuhan bisnis kamu jangka panjang.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==============================
          OUR STORY - bg secondary
      ============================== */}
      <section className="py-24 bg-[#161b22]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">
                Awal Mula
              </span>
              <h2 className="font-montserrat font-black uppercase text-3xl sm:text-4xl lg:text-5xl text-white mt-4 leading-tight">
                Lahir dari <br />Sebuah Keresahan
              </h2>
            </motion.div>

            <div className="space-y-5">
              {[
                'Semuanya bermula dari keresahan yang sama, yaitu terlalu banyak UMKM yang terjebak dalam ekosistem WordPress yang menjanjikan kemudahan tapi menghadirkan masalah. Website lambat di atas 5 detik, rentan diretas, plugin yang crash tiba-tiba, dan sistem yang langsung mentok begitu bisnis ingin menambahkan satu fitur baru.',
                'Vendor IT yang ada seringkali memperumit masalah dengan bahasa teknis yang tidak perlu, seolah kerumitan adalah tanda keahlian. Klien tidak paham apa yang mereka bayar, dan tidak punya kendali atas aset digital mereka sendiri.',
                'Dari keresahan inilah GriviLabs lahir pada awal 2026 sebagai Tech Studio yang menolak shortcut, menolak template pasaran, dan berpihak penuh pada klien. Kami hadir untuk membuktikan bahwa solusi digital yang cepat, aman, dan skalabel bukan hanya milik perusahaan korporat besar.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="font-inter text-sm sm:text-base leading-relaxed text-justify text-[#9ca3af]"
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="p-6 rounded-xl border border-white/10 bg-[#0d1117]"
              >
                <span className="font-inter text-xs tracking-[0.2em] text-[#2ad882] uppercase">
                  {m.year}
                </span>
                <h4 className="font-montserrat font-bold text-white text-base mt-2 mb-2">
                  {m.title}
                </h4>
                <p className="font-inter text-xs text-[#9ca3af] leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          MISI & VISI - bg primary
      ============================== */}
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
              Arah & Tujuan
            </span>
            <h2 className="font-montserrat font-black uppercase text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
              Misi & <span className="text-[#2ad882]">Visi</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.5 }}
              className="p-8 rounded-xl border border-[#2ad882]/30 bg-[#2ad882]/5"
            >
              <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">
                Misi
              </span>
              <h3 className="font-montserrat font-black uppercase text-white text-2xl sm:text-3xl mt-4 mb-4">
                Demokratisasi <br />Aset Digital
              </h3>
              <p className="font-inter text-sm leading-relaxed text-[#9ca3af]">
                Menyediakan solusi web berbasis custom code berkualitas korporat yang bisa
                dijangkau oleh UMKM dan bisnis menengah Indonesia. Membuktikan bahwa website
                yang cepat, aman, dan skalabel bukan privilege eksklusif perusahaan besar.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="p-8 rounded-xl border border-white/10 bg-[#161b22]"
            >
              <span className="font-inter text-xs tracking-[0.3em] text-[#9ca3af] uppercase">
                Visi
              </span>
              <h3 className="font-montserrat font-black uppercase text-white text-2xl sm:text-3xl mt-4 mb-4">
                Studio Mandiri <br />Kelas Dunia
              </h3>
              <p className="font-inter text-sm leading-relaxed text-[#9ca3af]">
                Membangun Tech Studio Indonesia yang memiliki sistem operasional mandiri dengan
                tim developer dan desainer yang solid. Menjadi pilihan pertama bisnis B2C di
                Indonesia yang serius ingin memiliki aset digital berkualitas tinggi.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==============================
          NILAI PERUSAHAAN - bg secondary
      ============================== */}
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
              DNA Kami
            </span>
            <h2 className="font-montserrat font-black uppercase text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
              Prinsip yang Tidak Bisa <span className="text-[#2ad882]">Dikompromikan</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-8 rounded-xl border border-white/10 bg-[#0d1117] hover:border-[#2ad882]/40 hover:bg-[#2ad882]/5 transition-all duration-300"
              >
                <div className="mb-4">{val.icon}</div>
                <span className="font-inter text-[10px] tracking-[0.25em] text-[#9ca3af] uppercase">
                  {val.tag}
                </span>
                <h4 className="font-montserrat font-black uppercase text-white text-lg mt-2 mb-0.5">
                  {val.title}
                </h4>
                <p className="font-inter text-xs text-[#2ad882] mb-3">{val.subtitle}</p>
                <p className="font-inter text-sm text-[#9ca3af] leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          TIM FOUNDERS - bg primary
      ============================== */}
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
              Di Balik Studio
            </span>
            <h2 className="font-montserrat font-black uppercase text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
              Dua Pilar <span className="text-[#2ad882]">GriviLabs</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {founders.map((founder, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="p-8 rounded-xl border border-white/10 bg-[#161b22] hover:border-[#2ad882]/40 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#2ad882]/10 border border-[#2ad882]/30 flex items-center justify-center">
                    <span className="font-montserrat font-black text-xl text-[#2ad882]">
                      {founder.initials}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-montserrat font-bold text-white text-lg leading-tight">
                      {founder.name}
                    </h4>
                    <p className="font-inter text-xs text-[#2ad882] mt-0.5 mb-3">
                      {founder.role}
                    </p>
                    <p className="font-inter text-sm text-[#9ca3af] leading-relaxed">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          CTA - bg primary
      ============================== */}
      <section className="py-24 bg-[#161b22] relative overflow-hidden">
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
              Siap Mulai <br />
              <span className="text-[#2ad882]">Bersama Kami?</span>
            </h2>
            <p className="font-inter text-sm text-[#9ca3af] leading-relaxed max-w-lg mx-auto">
              Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan bisnis kamu dan
              kami akan siapkan solusinya.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://wa.me/628993157370?text=Halo%20GriviLabs%2C%20saya%20ingin%20konsultasi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#2ad882] text-[#0d1117] font-montserrat font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-white transition-colors duration-300"
              >
                💬 Konsultasi via WhatsApp
              </a>
              <a
                href="mailto:hello@grivilabs.com"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-montserrat font-bold uppercase tracking-widest text-sm rounded-lg hover:border-[#2ad882] hover:text-[#2ad882] transition-colors duration-300"
              >
                ✉ hello@grivilabs.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
    </>
  )
}

export default About