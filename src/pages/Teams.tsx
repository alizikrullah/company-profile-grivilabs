import { motion } from 'motion/react'
import SEO from '../components/seo/SEO'
import { HiOutlineMail } from 'react-icons/hi'
import { MdOutlineWorkHistory } from 'react-icons/md'
import { TbRefresh } from 'react-icons/tb'
import { useTeams } from '../store/TeamsContext'
import type { TeamMember } from '../store/TeamsContext'

// ------------------------------------
// DEPARTMENT COLOR MAP
// ------------------------------------

const deptConfig: Record<string, { label: string; color: string; bg: string }> = {
  Engineering: {
    label: 'Engineering',
    color: 'text-[#2ad882]',
    bg: 'bg-[#2ad882]/10 border-[#2ad882]/30',
  },
  Design: {
    label: 'Design',
    color: 'text-[#60a5fa]',
    bg: 'bg-[#60a5fa]/10 border-[#60a5fa]/30',
  },
  Product: {
    label: 'Product',
    color: 'text-[#f59e0b]',
    bg: 'bg-[#f59e0b]/10 border-[#f59e0b]/30',
  },
}

// ------------------------------------
// SKELETON CARD
// ------------------------------------

const SkeletonCard = () => (
  <div className="rounded-xl border border-white/10 bg-[#0d1117] p-6 animate-pulse">
    <div className="flex items-center gap-4 mb-5">
      <div className="w-16 h-16 rounded-full bg-white/10 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
      </div>
    </div>
    <div className="space-y-2 mb-5">
      <div className="h-3 bg-white/10 rounded" />
      <div className="h-3 bg-white/10 rounded w-5/6" />
      <div className="h-3 bg-white/10 rounded w-4/6" />
    </div>
    <div className="flex gap-2">
      <div className="h-6 bg-white/10 rounded-full w-20" />
      <div className="h-6 bg-white/10 rounded-full w-28" />
    </div>
  </div>
)

// ------------------------------------
// MEMBER CARD
// ------------------------------------

const MemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const dept = deptConfig[member.department]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group rounded-xl border border-white/10 bg-[#0d1117] p-6 hover:border-[#2ad882]/40 hover:bg-[#2ad882]/5 transition-all duration-300"
    >
      {/* Header: foto + nama + dept badge */}
      <div className="flex items-start gap-4 mb-5">
        <div className="relative flex-shrink-0">
          <img
            src={member.photo}
            alt={member.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white/10 group-hover:border-[#2ad882]/40 transition-colors duration-300"
            loading="lazy"
          />
          {/* dot indikator departemen */}
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-[#0d1117] ${
              member.department === 'Engineering'
                ? 'bg-[#2ad882]'
                : member.department === 'Design'
                ? 'bg-[#60a5fa]'
                : 'bg-[#f59e0b]'
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-montserrat font-bold text-white text-base leading-tight truncate">
            {member.name}
          </h3>
          <p className={`font-inter text-xs mt-0.5 ${dept.color}`}>
            {member.role}
          </p>
          <span
            className={`inline-block font-inter text-[10px] tracking-wider uppercase mt-2 px-2 py-0.5 rounded-full border ${dept.bg} ${dept.color}`}
          >
            {dept.label}
          </span>
        </div>
      </div>

      {/* Bio */}
      <p className="font-inter text-xs leading-relaxed text-[#9ca3af] mb-5">
        {member.bio}
      </p>

      {/* Footer: pengalaman + email */}
      <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-[#9ca3af]">
          <MdOutlineWorkHistory size={14} className="flex-shrink-0" />
          <span className="font-inter text-xs">
            Pengalaman{' '}
            <span className="text-white font-medium">{member.experience}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#9ca3af]">
          <HiOutlineMail size={14} className="flex-shrink-0" />
          <span className="font-inter text-xs truncate">{member.email}</span>
        </div>
      </div>
    </motion.div>
  )
}

// ------------------------------------
// MAIN COMPONENT
// ------------------------------------

const Teams = () => {
  const { members, loading, error, refetch } = useTeams()

  return (
    <>
      <SEO
        title="Tim Kami"
        description="Kenali tim profesional di balik GriviLabs. 12 talenta dari divisi Engineering, Design, dan Product yang berdedikasi membangun solusi digital terbaik untuk bisnis Anda."
        canonical="/teams"
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
              Tim Kami
            </span>
            <h1 className="font-montserrat font-black uppercase tracking-tight text-5xl sm:text-6xl lg:text-8xl text-white leading-none mt-4">
              Orang-Orang di <br />
              <span className="text-[#2ad882]">Balik Layar.</span>
            </h1>
            <p className="font-inter text-sm sm:text-base leading-relaxed text-[#9ca3af] mt-6 max-w-2xl">
              Ini adalah tim yang berkomitmen penuh, di mana setiap anggota punya peran dan tanggung jawab
              yang jelas terhadap kualitas akhir setiap produk yang kami kirimkan.
            </p>
          </motion.div>

          {/* Stats tim */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            {[
              { number: '12', label: 'Tim Member' },
              { number: '3', label: 'Departemen' },
              { number: '100%', label: 'Remote-First' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-montserrat font-black text-3xl text-[#2ad882]">
                  {stat.number}
                </span>
                <span className="font-inter text-xs tracking-[0.2em] text-[#9ca3af] uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==============================
          LEGENDA DEPARTEMEN
      ============================== */}
      <section className="py-8 bg-[#161b22] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-6">
            <span className="font-inter text-xs tracking-[0.2em] text-[#9ca3af] uppercase">
              Departemen:
            </span>
            {Object.entries(deptConfig).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    key === 'Engineering'
                      ? 'bg-[#2ad882]'
                      : key === 'Design'
                      ? 'bg-[#60a5fa]'
                      : 'bg-[#f59e0b]'
                  }`}
                />
                <span className={`font-inter text-xs ${val.color}`}>{val.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          GRID TIM - bg secondary
      ============================== */}
      <section className="py-24 bg-[#161b22]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="font-montserrat font-bold text-white text-xl mb-2">
                Koneksi Terputus
              </h3>
              <p className="font-inter text-sm text-[#9ca3af] mb-6 max-w-sm">
                {error}. Pastikan koneksi internet kamu aktif lalu coba lagi.
              </p>
              <button
                onClick={refetch}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2ad882] text-[#0d1117] font-montserrat font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-white transition-colors duration-300"
              >
                <TbRefresh size={16} />
                Coba Lagi
              </button>
            </div>
          )}

          {/* Success State: grid member */}
          {!loading && !error && members.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.map((member, i) => (
                <MemberCard key={member.id} member={member} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==============================
          CTA - bg primary
      ============================== */}
      <section className="py-24 bg-[#0d1117] relative overflow-hidden">
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
              Bergabung
            </span>
            <h2 className="font-montserrat font-black uppercase text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Mau Jadi Bagian <br />
              <span className="text-[#2ad882]">dari Tim Ini?</span>
            </h2>
            <p className="font-inter text-sm text-[#9ca3af] leading-relaxed max-w-lg mx-auto">
              Kami selalu terbuka untuk developer dan desainer berbakat yang serius
              ingin mengerjakan produk berkualitas. Tidak ada formalitas berlebihan,
              langsung tunjukkan kemampuanmu.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:hello@grivilabs.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#2ad882] text-[#0d1117] font-montserrat font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-white transition-colors duration-300"
              >
                ✉ Kirim Portofolio
              </a>
              <a
                href="https://wa.me/628993157370?text=Halo%20GriviLabs%2C%20saya%20tertarik%20bergabung%20ke%20tim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-montserrat font-bold uppercase tracking-widest text-sm rounded-lg hover:border-[#2ad882] hover:text-[#2ad882] transition-colors duration-300"
              >
                💬 Chat via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
    </>
  )
}

export default Teams