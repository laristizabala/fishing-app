import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Mi App Vue Offline',
        short_name: 'AppOffline',
        description: 'Mi proyecto Vue 3 que funciona offline',
        theme_color: '#42b883',
        icons: [
          {
            src: 'fishing-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'fishing-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'fishing-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/fishing-app',
})
