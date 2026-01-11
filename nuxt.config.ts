import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: "/Dokployfile/",
    head: {
      title: "Dokploy Template Generator",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Effortlessly generate Base64 import strings for your Dokploy templates from GitHub or manual input. A must-have tool for Dokploy users.",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/Dokployfile/favicon.ico" },
      ],
    },
  },
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
      baseUrl: "https://dealenx.github.io/Dokployfile/", // Adjust to your actual URL
    },
  },
});
