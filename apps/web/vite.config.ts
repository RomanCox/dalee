import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    // ВАЖНО: строго перед react()
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': import.meta.dirname + '/src',
    },
  },
  server: { port: 3000 },
})