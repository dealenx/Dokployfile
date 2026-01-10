// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  router: {
    options: {
      hashMode: true,
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: "https://dealenx.github.io/dokployfile/", // Adjust to your actual URL
    },
  },
});
