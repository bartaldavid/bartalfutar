import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import Icons from 'unplugin-icons/vite';
export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      srcDir: './src',
      registerType: 'autoUpdate',
      manifest: {
        name: 'BartalFUTÁR',
        short_name: 'BartalFUTÁR',
        start_url: '/',
        theme_color: '#334155',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        display: 'standalone'
      },
      filename: 'service-worker.js',
      devOptions: {
        enabled: true,
        type: 'module'
      },
      workbox: {
        globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
      },
      injectRegister: null
    }),
    Icons({ compiler: 'svelte' })
  ]
});
