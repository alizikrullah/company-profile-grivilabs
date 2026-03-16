import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useBlog } from '../store/BlogContext'
import { useAuth } from '../store/AuthContext'
import { supabase } from '../lib/supabase'

// ------------------------------------
// HELPERS
// ------------------------------------

const formatDate = (iso: string) => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const estimateReadTime = (content: string) => {
  const stripped = content.replace(/<[^>]*>/g, ' ')
  const words = stripped.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} menit baca`
}

// ------------------------------------
// DELETE CONFIRMATION MODAL
// ------------------------------------

const DeleteModal = ({
  title,
  deleting,
  onConfirm,
  onCancel,
}: {
  title: string
  deleting: boolean
  onConfirm: () => void
  onCancel: () => void
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center px-6"
  >
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      onClick={!deleting ? onCancel : undefined}
    />

    {/* Modal */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.2 }}
      className="relative bg-[#161b22] border border-white/10 rounded-2xl p-8 max-w-md w-full"
    >
      {/* Warning Icon */}
      <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </div>

      <h3 className="font-montserrat font-black text-xl text-white text-center uppercase tracking-tight mb-2">
        Hapus Artikel?
      </h3>

      <p className="font-inter text-sm text-[#8b949e] text-center leading-relaxed mb-2">
        Kamu akan menghapus artikel:
      </p>
      <p className="font-inter text-sm text-white text-center font-semibold mb-6">
        "{title}"
      </p>
      <p className="font-inter text-xs text-red-400/80 text-center mb-8">
        Tindakan ini tidak bisa dibatalkan.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={deleting}
          className="flex-1 px-6 py-3.5 border border-white/20 text-[#8b949e] font-montserrat font-bold uppercase tracking-widest text-xs rounded-lg hover:border-white/40 hover:text-white transition-all duration-300 disabled:opacity-50"
        >
          Batal
        </button>
        <button
          onClick={onConfirm}
          disabled={deleting}
          className="flex-1 px-6 py-3.5 bg-red-500 text-white font-montserrat font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-red-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {deleting ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Menghapus...
            </>
          ) : (
            'Ya, Hapus'
          )}
        </button>
      </div>
    </motion.div>
  </motion.div>
)

// ------------------------------------
// MAIN PAGE
// ------------------------------------

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { posts, loading, refetch } = useBlog()
  const { role } = useAuth()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const post = posts.find((p) => p.slug === slug)

  // ── Handle Delete ──
  const handleDelete = async () => {
    if (!post) return
    setDeleting(true)

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id)

      if (error) throw error

      refetch()
      navigate('/blog')
    } catch (err) {
      console.error('Delete failed:', err)
      setDeleting(false)
      setShowDeleteModal(false)
      alert('Gagal menghapus artikel. Coba lagi.')
    }
  }

  // ── Loading State ──
  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d1117] pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 animate-pulse space-y-6">
          <div className="h-4 w-20 bg-white/10 rounded" />
          <div className="h-10 bg-white/10 rounded w-3/4" />
          <div className="h-10 bg-white/10 rounded w-1/2" />
          <div className="h-64 bg-white/10 rounded-xl" />
          <div className="space-y-3 pt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`h-4 bg-white/10 rounded ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
            ))}
          </div>
        </div>
      </main>
    )
  }

  // ── Not Found ──
  if (!post) {
    return (
      <main className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center space-y-4 px-6">
          <p className="font-montserrat font-black text-6xl text-white">404</p>
          <p className="font-inter text-[#8b949e]">Artikel tidak ditemukan.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-montserrat font-bold uppercase tracking-widest text-xs text-[#2ad882] hover:text-white transition-colors duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali ke Blog
          </Link>
        </div>
      </main>
    )
  }

  const isAdminSupabase = role === 'admin' && post.source === 'supabase'

  return (
    <main className="min-h-screen bg-[#0d1117]">
      {/* ─── Delete Modal ─── */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteModal
            title={post.title}
            deleting={deleting}
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </AnimatePresence>

      {/* ─── HEADER ─── */}
      <section className="pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-inter text-xs text-[#6e7681] mb-8"
          >
            <Link to="/blog" className="hover:text-[#2ad882] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#8b949e] truncate max-w-[200px]">{post.title}</span>
          </motion.div>

          {/* Admin Actions */}
          {isAdminSupabase && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex items-center gap-3 mb-8"
            >
              <Link
                to={`/blog/edit/${post.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-[#8b949e] font-montserrat font-bold uppercase tracking-widest text-xs rounded-lg hover:border-[#2ad882] hover:text-[#2ad882] transition-all duration-300"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit Artikel
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-400 font-montserrat font-bold uppercase tracking-widest text-xs rounded-lg hover:border-red-500 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Hapus
              </button>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#8b949e] font-inter"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#2ad882]/20 text-[#2ad882] flex items-center justify-center text-xs font-bold uppercase">
                {post.author.charAt(0)}
              </span>
              <span>{post.author}</span>
            </div>
            <span className="text-[#30363d]">&middot;</span>
            <span>{formatDate(post.publishDate)}</span>
            <span className="text-[#30363d]">&middot;</span>
            <span>{estimateReadTime(post.content)}</span>
          </motion.div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-white/10 bg-white/5 font-inter text-xs text-[#8b949e]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── COVER IMAGE ─── */}
      {post.coverImage && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto px-6 lg:px-8 mb-12"
        >
          <div className="rounded-2xl overflow-hidden border border-white/10 h-64 sm:h-80 lg:h-96">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}

      {/* ─── CONTENT ─── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="pb-24"
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div
            className="prose-grivilabs"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back Button */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-montserrat font-bold uppercase tracking-widest text-xs text-[#8b949e] hover:text-[#2ad882] transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Kembali ke Blog
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  )
}

export default BlogDetail