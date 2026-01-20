import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({

app: {
  head: {
    title: 'Plataforma Municipal de Juventudes de Mosquera',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content: 'La Plataforma Municipal de Juventudes de Mosquera promueve la participación, representación y fortalecimiento de las juventudes en el municipio.'
      },
      { name: 'format-detection', content: 'telephone=no' },

      // Open Graph (Facebook, WhatsApp, LinkedIn)
      {
        property: 'og:title',
        content: 'Plataforma Municipal de Juventudes de Mosquera'
      },
      {
        property: 'og:description',
        content: 'Espacio de participación, articulación y representación juvenil en el municipio de Mosquera.'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:locale',
        content: 'es_CO'
      },
      {
        property: 'og:image',
        content: '/og-plataforma-juventudes-mosquera.png'
      },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:title',
        content: 'Plataforma Municipal de Juventudes de Mosquera'
      },
      {
        name: 'twitter:description',
        content: 'Participación y representación juvenil en Mosquera.'
      }
    ]
  }
},

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});