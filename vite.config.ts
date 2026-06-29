import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    manifest: {
      "short_name": "Points Calculator",
      "name": "Game Points Calculator",
      "description": "An application that allows you to keep track of the points and view the statistics of your current and past games",
      "icons": [
        {
          "src": "logo64.png",
          "type": "image/png",
          "sizes": "64x64"
        },
        {
          "src": "logo256.png",
          "type": "image/png",
          "sizes": "256x256"
        },
        {
          "src": "logo512.png",
          "type": "image/png",
          "sizes": "512x512"
        }
      ],
      "start_url": ".",
      "display": "standalone",
      "theme_color": "#4F6367",
      "background_color": "#ffffff"
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})