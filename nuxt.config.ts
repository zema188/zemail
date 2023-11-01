// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@pinia/nuxt',],
  supabase: {
    "redirect": false,
  },
  css: ['vuetify/lib/styles/main.sass', "@/assets/styles/reset.scss", "@/assets/styles/main.scss"],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
