import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt", "shadcn-nuxt"],
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./app/components/ui",
  },
  css: ["~/assets/css/main.css"],
  router: {
    options: {
      hashMode: false,
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: "https://dealenx.github.io/dokployfile/", // Adjust to your actual URL
    },
  },
});
