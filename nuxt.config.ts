// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],

  // Nuxt automatically checks inside the app folder, so we use the clean path format from your image
  css: [
    '~/assets/scss/main.scss'
  ],

  compatibilityDate: '2024-04-04',

  app: {
    baseURL: '/',
    pageTransition: { 
      name: 'page', 
      mode: 'out-in' 
    },
  },

  build: {
    transpile: ['swiper']
  },

  // Ensures Server-Side Rendering for high performance and SEO
  ssr: true,
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 3001 // Change to any available port
  },
})