import { createContext, useContext, useEffect, useState } from 'react'

// ------------------------------------
// TYPES
// ------------------------------------

export interface TeamMember {
  id: string
  name: string
  email: string
  photo: string
  role: string
  bio: string
  experience: string
  department: string
}

interface TeamsContextType {
  members: TeamMember[]
  loading: boolean
  error: string | null
  refetch: () => void
}

// ------------------------------------
// STATIC POOLS
// ------------------------------------

const rolePools: Record<string, string[]> = {
  Engineering: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'Mobile Developer', 'DevOps Engineer'],
  Design: ['UI/UX Designer', 'Product Designer', 'Visual Designer'],
  Product: ['Project Manager', 'Digital Strategist', 'Tech Lead', 'QA Engineer'],
}

const departmentSequence = [
  'Engineering', 'Engineering', 'Engineering', 'Engineering', 'Engineering', 'Engineering',
  'Design', 'Design', 'Design',
  'Product', 'Product', 'Product',
]

// Urutan bio SESUAI urutan role hasil kalkulasi departmentSequence + rolePools:
// 0=Frontend Dev, 1=Backend Dev, 2=Fullstack Dev, 3=Mobile Dev, 4=DevOps Eng, 5=Frontend Dev(2),
// 6=UI/UX Designer, 7=Product Designer, 8=Visual Designer, 9=Digital Strategist, 10=Tech Lead, 11=QA Engineer
const bios: string[] = [
  'Spesialis membangun antarmuka yang cepat, aksesibel, dan memiliki konversi tinggi. Percaya bahwa kode yang bersih adalah karya seni.',
  'Membangun sistem back-end yang andal dan skalabel. Kalau ada bug di production jam 3 pagi, dialah yang pertama bangun.',
  'Membangun solusi end-to-end dari database hingga tampilan UI. Paling nyaman saat punya kendali penuh atas seluruh stack teknologi.',
  'Membangun aplikasi mobile yang terasa native di setiap platform. Pengalaman di layar kecil harus sama premiumnya dengan desktop.',
  'Menjaga server tetap hidup, pipeline deployment berjalan lancar, dan semua orang bisa tidur nyenyak setiap malam.',
  'Mengubah desain Figma menjadi komponen interaktif yang presisi. Perfeksionis dalam urusan piksel dan konsistensi antarmuka.',
  'Merancang pengalaman pengguna yang intuitif dari wireframe sampai pixel final. Obsesi terhadap detail yang tidak terlihat tapi sangat terasa.',
  'Menjembatani kebutuhan pengguna dengan kemungkinan teknis melalui desain yang terukur dan berbasis data riset.',
  'Memastikan setiap elemen visual memiliki tujuan, hierarki, dan estetika yang konsisten dari brand guidelines hingga aset final.',
  'Spesialis strategi digital yang membantu klien menemukan posisi yang tepat di ruang online yang semakin ramai dan kompetitif.',
  'Memimpin tim secara teknis dan memastikan standar kode terjaga tinggi di setiap pull request yang masuk ke repository.',
  'Mengurus kualitas setiap fitur sebelum sampai ke tangan klien. Kalau ada bug yang lolos dari reviewnya, itu memang disengaja.',
]

const experiences: string[] = [
  '2 Tahun', '3 Tahun', '3 Tahun', '4 Tahun', '4 Tahun',
  '5 Tahun', '5 Tahun', '6 Tahun', '6 Tahun', '7 Tahun',
  '2 Tahun', '8 Tahun',
]

// ------------------------------------
// CONTEXT
// ------------------------------------

const TeamsContext = createContext<TeamsContextType | undefined>(undefined)

export function TeamsProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTeams = async (force = false) => {
    if (!force && members.length > 0) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('https://randomuser.me/api/?results=12&nat=us,gb,au&seed=grivilabs')
      if (!res.ok) throw new Error('Gagal mengambil data tim dari server')
      const json = await res.json()

      const mapped: TeamMember[] = json.results.map(
        (
          user: {
            login: { uuid: string }
            name: { first: string; last: string }
            email: string
            picture: { large: string }
          },
          i: number
        ) => {
          const dept = departmentSequence[i]
          const roleList = rolePools[dept]
          const role = roleList[i % roleList.length]

          return {
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            photo: user.picture.large,
            role,
            bio: bios[i],
            experience: experiences[i],
            department: dept,
          }
        }
      )

      setMembers(mapped)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan tak terduga')
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => fetchTeams(true)

  useEffect(() => {
    fetchTeams()
  }, [])

  return (
    <TeamsContext.Provider value={{ members, loading, error, refetch }}>
      {children}
    </TeamsContext.Provider>
  )
}

export function useTeams() {
  const ctx = useContext(TeamsContext)
  if (!ctx) throw new Error('useTeams harus digunakan di dalam TeamsProvider')
  return ctx
}