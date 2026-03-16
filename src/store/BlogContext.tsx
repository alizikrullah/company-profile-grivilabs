import { createContext, useContext, useEffect, useState } from 'react'
import { deliveryClient } from '../lib/contentful'
import { supabase } from '../lib/supabase'

// ------------------------------------
// TYPES
// ------------------------------------

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  publishDate: string
  tags: string[]
  source: 'contentful' | 'supabase'
}

interface BlogContextType {
  posts: BlogPost[]
  loading: boolean
  error: string | null
  refetch: () => void
}

// ------------------------------------
// CONTEXT
// ------------------------------------

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async (force = false) => {
    if (!force && posts.length > 0) return

    setLoading(true)
    setError(null)

    try {
      // FETCH CONTENTFUL (boleh gagal)
      let contentfulPosts: BlogPost[] = []
      try {
        const contentfulRes = await deliveryClient.getEntries({
          content_type: 'blogPost',
          order: ['-fields.publishDate'],
        })

        contentfulPosts = contentfulRes.items.map((item) => {
          const f = item.fields as Record<string, unknown>
          const rawTags = f.tags
          let tags: string[] = []
          if (typeof rawTags === 'string') {
            tags = rawTags.split(',').map((t) => t.trim()).filter(Boolean)
          } else if (Array.isArray(rawTags)) {
            tags = rawTags as string[]
          }
          return {
            id: item.sys.id,
            title: String(f.title ?? ''),
            slug: String(f.slug ?? ''),
            excerpt: String(f.excerpt ?? ''),
            content: String(f.content ?? ''),
            coverImage: String(f.coverImage ?? ''),
            author: String(f.author ?? ''),
            publishDate: String(f.publishDate ?? ''),
            tags,
            source: 'contentful' as const,
          }
        })
      } catch {
        // Contentful gagal, lanjutkan dengan Supabase saja
      }

      // FETCH SUPABASE
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('posts')
        .select('*')
        .order('publish_date', { ascending: false })

      if (supabaseError) throw supabaseError

      const supabasePosts: BlogPost[] = (supabaseData ?? []).map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        coverImage: p.cover_image ?? '',
        author: p.author,
        publishDate: p.publish_date,
        tags: p.tags
          ? p.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
          : [],
        source: 'supabase' as const,
      }))

      // GABUNGKAN & SORT
      const combined = [...contentfulPosts, ...supabasePosts].sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      )

      setPosts(combined)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengambil data artikel')
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => fetchPosts(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <BlogContext.Provider value={{ posts, loading, error, refetch }}>
      {children}
    </BlogContext.Provider>
  )
}

export function useBlog() {
  const ctx = useContext(BlogContext)
  if (!ctx) throw new Error('useBlog harus digunakan di dalam BlogProvider')
  return ctx
}