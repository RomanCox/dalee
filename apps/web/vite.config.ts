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
  css: {
    preprocessorOptions: {
      scss: {
        // vars.scss ($переменные и @mixin) доступен без явного @import в каждом *.module.scss —
        // так было настроено в исходном Next-проекте (sassOptions.prependData).
        // Сам vars.scss из этого правила исключаем, иначе получится самоимпорт.
        additionalData: (source: string, filename: string) => {
          const varsPath = (import.meta.dirname + '/src/styles/vars').replace(/\\/g, '/');
          if (filename.replace(/\\/g, '/').endsWith('/src/styles/vars.scss')) {
            return source;
          }
          return `@import "${varsPath}";\n${source}`;
        },
        silenceDeprecations: ['import'],
      },
    },
  },
  server: { port: 3000 },
})
