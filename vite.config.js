import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        }
      }
    },
    // Copy _redirects file for SPA routing on Render
    copyPublicDir: true
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ["all", "3000-ivvp0ok8ujkuep8i15rhi-2ace44c8.manusvm.computer"],
    hmr: {
      port: 3001
    }
  },
  preview: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    allowedHosts: 'all'
  },
  // Add SPA fallback for development
  appType: 'spa'
})

