import { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { motion } from 'motion/react'
import { supabase } from '../lib/supabase'
import SEO from '../components/seo/SEO'
import { useBlog } from '../store/BlogContext'
import { useAuth } from '../store/AuthContext'

// ------------------------------------
// TYPES
// ------------------------------------

interface FormData {
  title: string
  slug: string
  excerpt: string
  coverImage: string
  author: string
  publishDate: string
  tags: string
}

const STORAGE_KEY = 'grivilabs-draft-create'

// ------------------------------------
// MARKDOWN IMPORT
// ------------------------------------

const markdownToHtml = (md: string): string => {
  let html = md

  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/~~(.+?)~~/g, '<s>$1</s>')
  html = html.replace(/`(.+?)`/g, '<code>$1</code>')
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')

  const lines = html.split('\n')
  const result: string[] = []
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    if (
      trimmed.startsWith('<h') ||
      trimmed.startsWith('<ul') ||
      trimmed.startsWith('<ol') ||
      trimmed.startsWith('<li') ||
      trimmed.startsWith('<blockquote')
    ) {
      result.push(trimmed)
    } else {
      result.push(`<p>${trimmed}</p>`)
    }
  }
  return result.join('')
}

// ------------------------------------
// TOOLBAR BUTTON
// ------------------------------------

const ToolbarBtn = ({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-2 rounded-lg transition-all duration-200 font-inter text-sm ${
      active
        ? 'bg-[#2ad882]/20 text-[#2ad882]'
        : 'text-[#6e7681] hover:text-white hover:bg-white/10'
    }`}
  >
    {children}
  </button>
)

// ------------------------------------
// TOOLBAR
// ------------------------------------

const Toolbar = ({ editor }: { editor: ReturnType<typeof useEditor> }) => {
  if (!editor) return null

  return (
    <div className="flex items-center flex-wrap gap-1 px-4 py-3 border-b border-white/10 bg-[#0d1117]/50">
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        H1
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        H2
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })}
        title="Heading 3"
      >
        H3
      </ToolbarBtn>

      <div className="w-px h-5 bg-white/10 mx-1" />

      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="Bold"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
          <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        </svg>
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="Italic"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="19" y1="4" x2="10" y2="4" />
          <line x1="14" y1="20" x2="5" y2="20" />
          <line x1="15" y1="4" x2="9" y2="20" />
        </svg>
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
        title="Strikethrough"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M16 4H9a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H8" />
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive('code')}
        title="Inline Code"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </ToolbarBtn>

      <div className="w-px h-5 bg-white/10 mx-1" />

      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <circle cx="3" cy="6" r="1" fill="currentColor" />
          <circle cx="3" cy="12" r="1" fill="currentColor" />
          <circle cx="3" cy="18" r="1" fill="currentColor" />
        </svg>
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        title="Ordered List"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="10" y1="6" x2="21" y2="6" />
          <line x1="10" y1="12" x2="21" y2="12" />
          <line x1="10" y1="18" x2="21" y2="18" />
          <path d="M4 6h1v4H4zM4 10h2" />
          <path d="M4 16h2l-2 2h2" />
        </svg>
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        title="Blockquote"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z" />
        </svg>
      </ToolbarBtn>

      <div className="w-px h-5 bg-white/10 mx-1" />

      <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 7v6h6" />
          <path d="M3 13C5 7 12 4 18 8s7 14 1 18" />
        </svg>
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 7v6h-6" />
          <path d="M21 13C19 7 12 4 6 8S-1 22 5 26" />
        </svg>
      </ToolbarBtn>

      <span className="ml-auto font-inter text-xs text-[#6e7681]">
        {editor.storage.characterCount.characters()} karakter
      </span>
    </div>
  )
}

// ------------------------------------
// MAIN PAGE
// ------------------------------------

const CreateBlog = () => {
  const navigate = useNavigate()
  const { refetch } = useBlog()
  const { user } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [draftRestored, setDraftRestored] = useState(false)
  const [showMarkdownImport, setShowMarkdownImport] = useState(false)
  const [markdownInput, setMarkdownInput] = useState('')
  const formRef = useRef<FormData | null>(null)

  const [form, setForm] = useState<FormData>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          title: parsed.title ?? '',
          slug: parsed.slug ?? '',
          excerpt: parsed.excerpt ?? '',
          coverImage: parsed.coverImage ?? '',
          author: parsed.author ?? user?.user_metadata?.full_name ?? '',
          publishDate: parsed.publishDate ?? new Date().toISOString().slice(0, 10),
          tags: parsed.tags ?? '',
        }
      }
    } catch {}
    return {
      title: '',
      slug: '',
      excerpt: '',
      coverImage: '',
      author: user?.user_metadata?.full_name ?? '',
      publishDate: new Date().toISOString().slice(0, 10),
      tags: '',
    }
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Mulai tulis konten artikelmu di sini...',
      }),
      CharacterCount,
    ],
    editorProps: {
      attributes: {
        class: 'min-h-[400px] focus:outline-none font-inter text-sm text-[#e6edf3] leading-relaxed p-6',
      },
    },
    onUpdate: () => {
      saveDraft()
    },
  })

  // Restore editor content from draft
  useEffect(() => {
    if (!editor || draftRestored) return
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.content) {
          editor.commands.setContent(parsed.content)
          setDraftRestored(true)
        }
      }
    } catch {}
    setDraftRestored(true)
  }, [editor, draftRestored])

  // Keep formRef in sync
  useEffect(() => {
    formRef.current = form
  }, [form])

  const saveDraft = useCallback(() => {
    try {
      const content = editor?.getHTML() ?? ''
      const currentForm = formRef.current ?? form
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...currentForm, content })
      )
    } catch {}
  }, [editor, form])

  // Save draft on form changes
  useEffect(() => {
    saveDraft()
  }, [form, saveDraft])

  const clearDraft = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {}
  }

  const generateSlug = useCallback((title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }, [])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setForm((prev) => ({ ...prev, title, slug: generateSlug(title) }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleMarkdownImport = () => {
    if (!markdownInput.trim() || !editor) return
    const html = markdownToHtml(markdownInput)
    editor.commands.setContent(html)
    setMarkdownInput('')
    setShowMarkdownImport(false)
    saveDraft()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const content = editor?.getHTML() ?? ''

    if (!form.title || !form.slug || !form.excerpt || !content || !form.author) {
      setError('Harap isi semua field yang wajib diisi.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const { error: insertError } = await supabase.from('posts').insert({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content,
        cover_image: form.coverImage || null,
        author: form.author,
        publish_date: new Date(form.publishDate).toISOString(),
        tags: form.tags || null,
      })

      if (insertError) throw insertError

      clearDraft()
      setSuccess(true)
      refetch()
      setTimeout(() => navigate('/blog'), 2000)
    } catch (err) {
      console.error(err)
      setError(
        err instanceof Error
          ? `Gagal mempublikasikan artikel: ${err.message}`
          : 'Terjadi kesalahan. Coba lagi.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success State ──
  if (success) {
    return (
      <main className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4 p-8"
        >
          <div className="w-16 h-16 rounded-full bg-[#2ad882]/20 border border-[#2ad882]/40 flex items-center justify-center mx-auto">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2ad882" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-montserrat font-black text-2xl text-white uppercase">
            Artikel Dipublikasikan!
          </h2>
          <p className="font-inter text-sm text-[#8b949e]">Mengarahkan ke halaman blog...</p>
        </motion.div>
      </main>
    )
  }

  return (
    <>
      <SEO
        title="Buat Artikel Baru"
        description="Tulis dan publikasikan artikel baru di blog GriviLabs."
        canonical="/blog/create"
        noIndex={true}
      />
      <main className="min-h-screen bg-[#0d1117]">
      {/* ─── HERO ─── */}
      <section className="pt-32 pb-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-inter text-xs tracking-[0.3em] text-[#2ad882] uppercase">
              Buat Artikel
            </span>
            <h1 className="font-montserrat font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mt-3">
              Tulis Artikel Baru
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Error Banner */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-inter text-sm">
                {error}
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <label className="font-inter text-xs tracking-[0.3em] text-[#8b949e] uppercase">
                Judul Artikel *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleTitleChange}
                placeholder="Kenapa Website Lambat Membunuh Bisnis Kamu"
                className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-[#161b22] text-white font-inter text-sm placeholder:text-[#484f58] focus:outline-none focus:border-[#2ad882]/50 focus:ring-1 focus:ring-[#2ad882]/20 transition-all"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="font-inter text-xs tracking-[0.3em] text-[#8b949e] uppercase">
                Slug (URL)
              </label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-[#161b22] text-[#8b949e] font-inter text-sm focus:outline-none focus:border-[#2ad882]/50 focus:ring-1 focus:ring-[#2ad882]/20 transition-all"
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label className="font-inter text-xs tracking-[0.3em] text-[#8b949e] uppercase">
                Ringkasan *
              </label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="Tulis ringkasan singkat yang menarik pembaca..."
                className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-[#161b22] text-white font-inter text-sm placeholder:text-[#484f58] focus:outline-none focus:border-[#2ad882]/50 focus:ring-1 focus:ring-[#2ad882]/20 transition-all resize-none"
              />
            </div>

            {/* Cover Image + Author + Date Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="font-inter text-xs tracking-[0.3em] text-[#8b949e] uppercase">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  name="coverImage"
                  value={form.coverImage}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-[#161b22] text-white font-inter text-sm placeholder:text-[#484f58] focus:outline-none focus:border-[#2ad882]/50 focus:ring-1 focus:ring-[#2ad882]/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="font-inter text-xs tracking-[0.3em] text-[#8b949e] uppercase">
                  Penulis *
                </label>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-[#161b22] text-white font-inter text-sm focus:outline-none focus:border-[#2ad882]/50 focus:ring-1 focus:ring-[#2ad882]/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="font-inter text-xs tracking-[0.3em] text-[#8b949e] uppercase">
                  Tanggal Publish
                </label>
                <input
                  type="date"
                  name="publishDate"
                  value={form.publishDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-[#161b22] text-white font-inter text-sm focus:outline-none focus:border-[#2ad882]/50 focus:ring-1 focus:ring-[#2ad882]/20 transition-all"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="font-inter text-xs tracking-[0.3em] text-[#8b949e] uppercase">
                Tags (pisahkan dengan koma)
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="Tips, Web Development, UMKM"
                className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-[#161b22] text-white font-inter text-sm placeholder:text-[#484f58] focus:outline-none focus:border-[#2ad882]/50 focus:ring-1 focus:ring-[#2ad882]/20 transition-all"
              />
            </div>

            {/* Markdown Import */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setShowMarkdownImport(!showMarkdownImport)}
                className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl border border-white/10 bg-[#161b22] text-[#8b949e] font-inter text-sm hover:border-white/20 transition-all"
              >
                <span className="uppercase tracking-[0.2em] text-xs">Import dari Markdown</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform duration-200 ${showMarkdownImport ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {showMarkdownImport && (
                <div className="space-y-3">
                  <textarea
                    value={markdownInput}
                    onChange={(e) => setMarkdownInput(e.target.value)}
                    rows={6}
                    placeholder="Paste konten markdown di sini... (# Heading, **bold**, *italic*, - list)"
                    className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-[#0d1117] text-white font-mono text-sm placeholder:text-[#484f58] focus:outline-none focus:border-[#2ad882]/50 transition-all resize-none"
                  />
                  <button
                    type="button"
                    onClick={handleMarkdownImport}
                    className="px-4 py-2 bg-[#2ad882] text-[#0d1117] font-montserrat font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-white transition-colors"
                  >
                    Convert & Import
                  </button>
                </div>
              )}
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <label className="font-inter text-xs tracking-[0.3em] text-[#8b949e] uppercase">
                Konten Artikel *
              </label>
              <div className="rounded-xl border border-white/10 bg-[#161b22] overflow-hidden focus-within:border-[#2ad882]/50 focus-within:ring-1 focus-within:ring-[#2ad882]/20 transition-all">
                <Toolbar editor={editor} />
                <EditorContent editor={editor} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#2ad882] text-[#0d1117] font-montserrat font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-white transition-colors duration-300 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Mempublikasikan...
                  </>
                ) : (
                  <>
                    Publikasikan Artikel
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  clearDraft()
                  navigate('/blog')
                }}
                className="font-montserrat font-bold uppercase tracking-widest text-xs px-6 py-4 border border-white/20 text-[#8b949e] rounded-lg hover:border-white/40 hover:text-white transition-all duration-300"
              >
                Batal
              </button>
              <span className="ml-auto font-inter text-xs text-[#484f58]">
                Draft otomatis tersimpan
              </span>
            </div>
          </motion.form>
        </div>
      </section>
    </main>
    </>
  )
}

export default CreateBlog