import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 800,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core - diload pertama, di-cache lama
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // Animation library
          'vendor-motion': ['motion'],

          // Carousel - dipakai di Testimonials (Home)
          'vendor-carousel': ['embla-carousel-react', 'embla-carousel'],

          // TipTap editor - hanya dipakai di CreateBlog & EditBlog
          'vendor-tiptap': [
            '@tiptap/react',
            '@tiptap/starter-kit',
            '@tiptap/extension-placeholder',
            '@tiptap/extension-character-count',
          ],

          // Supabase & Contentful - dipakai di blog pages
          'vendor-backend': ['@supabase/supabase-js', 'contentful'],

          // Helmet untuk SEO
          'vendor-helmet': ['react-helmet-async'],

          // Icons
          'vendor-icons': ['react-icons'],
        },
      },
    },
  },
})