import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-free/css/all.min.css'
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});