import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import SEO from '../components/seo/SEO'
import { useBlog, type BlogPost } from '../store/BlogContext'
import { useAuth } from '../store/AuthContext'

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
  return `${minutes} menit`
}

// ------------------------------------
// SKELETON CARD
// ------------------------------------

const SkeletonCard = () => (
  <div className="rounded-xl border border-white/10 bg-[#161b22] overflow-hidden animate-pulse">
    <div className="h-52 bg-white/5" />
    <div className="p-6 space-y-3">
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-white/10 rounded-full" />
        <div className="h-5 w-20 bg-white/10 rounded-full" />
      </div>
      <div className="h-6 bg-white/10 rounded w-4/5" />
      <div className="h-4 bg-white/10 rounded w-full" />
      <div className="h-4 bg-white/10 rounded w-3/4" />
      <div className="flex justify-between pt-2">
        <div className="h-4 w-24 bg-white/10 rounded" />
        <div className="h-4 w-20 bg-white/10 rounded" />
      </div>
    </div>
  </div>
)

// ------------------------------------
// FEATURED CARD (first article)
// ------------------------------------

const FeaturedCard = ({ post }: { post: BlogPost }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="group"
  >
    <Link to={`/blog/${post.slug}`} className="block">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl border border-white/10 bg-[#161b22] overflow-hidden hover:border-[#2ad882]/30 transition-all duration-500">
        {/* Image */}
        <div className="relative h-64 lg:h-full min-h-[280px] overflow-hidden">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-[#0d1117] flex items-center justify-center">
              <span className="font-montserrat font-black text-6xl text-white/5">GL.</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#161b22]/30 lg:bg-gradient-to-r lg:from-transparent lg:to-[#161b22]" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 rounded-full bg-[#2ad882] text-[#0d1117] font-montserrat font-bold uppercase tracking-widest text-[10px]">
              Terbaru
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-inter text-xs tracking-wider px-2.5 py-1 rounded-full bg-[#2ad882]/10 text-[#2ad882] border border-[#2ad882]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2 className="font-montserrat font-black text-2xl sm:text-3xl text-white uppercase tracking-tight leading-tight mb-4 group-hover:text-[#2ad882] transition-colors duration-300">
            {post.title}
          </h2>

          <p className="font-inter text-sm text-[#8b949e] leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-[#6e7681] font-inter">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#2ad882]/20 text-[#2ad882] flex items-center justify-center text-[10px] font-bold uppercase">
                {post.author.charAt(0)}
              </span>
              <span className="text-[#8b949e]">{post.author}</span>
            </div>
            <span className="text-[#30363d]">&middot;</span>
            <span>{formatDate(post.publishDate)}</span>
            <span className="text-[#30363d]">&middot;</span>
            <span>{estimateReadTime(post.content)}</span>
          </div>

          <div className="mt-6">
            <span className="inline-flex items-center gap-2 font-montserrat font-bold uppercase tracking-widest text-xs text-[#2ad882] group-hover:gap-3 transition-all duration-300">
              Baca Selengkapnya
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  </motion.article>
)

// ------------------------------------
// BLOG CARD
// ------------------------------------

const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.07, duration: 0.5 }}
    className="group rounded-xl border border-white/10 bg-[#161b22] overflow-hidden hover:border-[#2ad882]/30 hover:-translate-y-1 transition-all duration-500 flex flex-col"
  >
    {/* Cover Image */}
    <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
      <div className="relative h-52 bg-[#0d1117] overflow-hidden">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-montserrat font-black text-5xl text-white/5">GL.</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent opacity-60" />
      </div>
    </Link>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-inter text-[10px] tracking-wider px-2 py-1 rounded-full bg-[#2ad882]/10 text-[#2ad882] border border-[#2ad882]/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <Link to={`/blog/${post.slug}`}>
        <h3 className="font-montserrat font-black text-lg text-white uppercase tracking-tight leading-snug mb-3 group-hover:text-[#2ad882] transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
      </Link>

      {/* Excerpt */}
      <p className="font-inter text-sm text-[#8b949e] leading-relaxed mb-4 line-clamp-2 flex-1">
        {post.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#2ad882]/20 text-[#2ad882] flex items-center justify-center text-[9px] font-bold uppercase">
            {post.author.charAt(0)}
          </span>
          <span className="font-inter text-xs text-[#6e7681]">{post.author}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#484f58] font-inter">
          <span>{formatDate(post.publishDate)}</span>
          <span>&middot;</span>
          <span>{estimateReadTime(post.content)}</span>
        </div>
      </div>
    </div>
  </motion.article>
)

// ------------------------------------
// MAIN PAGE
// ------------------------------------

const BlogList = () => {
  const { posts, loading, error, refetch } = useBlog()
  const { role } = useAuth()
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort()
  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts

  const featuredPost = filtered.length >= 2 ? filtered[0] : null
  const restPosts = featuredPost ? filtered.slice(1) : filtered

  return (
    <>
      <SEO
        title="Blog"
        description="Baca artikel dan insight seputar web development, strategi digital, dan tips bisnis online dari tim GriviLabs. Update rutin untuk UMKM Indonesia yang ingin berkembang secara digital."
        canonical="/blog"
      />
      <main className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="pt-32 pb-20 bg-[#0d1117] relative overflow-hidden">
        {/* Decorative Blurs */}
        <div
          className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#2ad882] pointer-events-none"
          style={{ filter: 'blur(160px)', opacity: 0.04 }}
        />
        <div
          className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#2ad882] pointer-events-none"
          style={{ filter: 'blur(120px)', opacity: 0.03 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">
              Insight & Artikel
            </span>
            <h1 className="font-montserrat font-black uppercase text-4xl sm:text-5xl lg:text-7xl text-white mt-4 mb-6 leading-tight">
              Blog<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9ca3af]">
                GriviLabs.
              </span>
            </h1>
            <p className="font-inter text-sm sm:text-base text-[#8b949e] leading-relaxed max-w-xl">
              Kumpulan insight, tips teknis, dan studi kasus seputar web development,
              digitalisasi UMKM, dan pertumbuhan bisnis digital di Indonesia.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-8 mt-10"
          >
            <div>
              <p className="font-montserrat font-black text-2xl text-white">{posts.length}</p>
              <p className="font-inter text-xs tracking-[0.2em] text-[#6e7681] uppercase">Artikel</p>
            </div>
            <div>
              <p className="font-montserrat font-black text-2xl text-white">{allTags.length}</p>
              <p className="font-inter text-xs tracking-[0.2em] text-[#6e7681] uppercase">Topik</p>
            </div>
            {role === 'admin' && (
              <div className="ml-auto">
                <Link
                  to="/blog/create"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#2ad882] text-[#0d1117] font-montserrat font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-white transition-colors duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Tulis Artikel
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── FILTER + CONTENT ─── */}
      <section className="py-20 bg-[#161b22]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Filter Tags */}
          {!loading && allTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-12 flex-wrap"
            >
              <span className="font-inter text-xs tracking-[0.3em] text-[#484f58] uppercase mr-2">
                Topik:
              </span>
              <button
                onClick={() => setActiveTag(null)}
                className={`font-inter text-xs tracking-wider px-4 py-2 rounded-full border transition-all duration-200 ${
                  activeTag === null
                    ? 'bg-[#2ad882] text-[#0d1117] border-[#2ad882] font-bold'
                    : 'bg-transparent text-[#8b949e] border-white/10 hover:border-[#2ad882]/40 hover:text-white'
                }`}
              >
                Semua
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                  className={`font-inter text-xs tracking-wider px-4 py-2 rounded-full border transition-all duration-200 ${
                    activeTag === tag
                      ? 'bg-[#2ad882] text-[#0d1117] border-[#2ad882] font-bold'
                      : 'bg-transparent text-[#8b949e] border-white/10 hover:border-[#2ad882]/40 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          )}

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-16">
              <p className="font-inter text-sm text-red-400 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="font-montserrat font-bold uppercase tracking-widest text-xs px-6 py-3 border border-[#2ad882] text-[#2ad882] rounded-lg hover:bg-[#2ad882] hover:text-[#0d1117] transition-all"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#484f58" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <p className="font-montserrat font-black text-xl text-white uppercase mb-2">
                Belum Ada Artikel
              </p>
              <p className="font-inter text-sm text-[#8b949e]">
                {activeTag
                  ? `Tidak ada artikel dengan topik "${activeTag}".`
                  : 'Artikel pertama sedang dalam persiapan.'}
              </p>
            </div>
          )}

          {/* Featured Post */}
          {!loading && !error && featuredPost && (
            <div className="mb-12">
              <FeaturedCard post={featuredPost} />
            </div>
          )}

          {/* Rest of Posts Grid */}
          {!loading && !error && restPosts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
    </>
  )
}

export default BlogList