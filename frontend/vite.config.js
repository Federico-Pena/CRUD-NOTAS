import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'network-first',
      manifest: {
        name: 'Lista Tareas',
        short_name: 'Lista Tareas',
        theme_color: '#242424',
        background_color: '#242424',
        display: 'standalone',
        scope: '/',
        start_url: '.',
        lang: 'es',
        icons: [
          {
            src: '/assets/favicon.ico',
            type: 'image/x-icon',
            sizes: '16x16 32x32'
          },
          {
            src: '/assets/icon-192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: '/assets/icon-512.png',
            type: 'image/png',
            sizes: '512x512'
          },
          {
            src: '/assets/icon-192-maskable.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable'
          },
          {
            src: '/assets/icon-512-maskable.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable'
          }
        ]
      }
    })
  ]
})
