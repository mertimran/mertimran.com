// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  css: ["~/assets/styles.css"],

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/hints",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxtjs/device",
    "@nuxtjs/sitemap",
  ],

  site: {
    url: "https://mertimran.com",
    name: "Mert İmran",
  },

  app: {
    head: {
      title: "Mert İmran",
      titleTemplate: "%s | Mert İmran",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  content: {
    build: {
      markdown: {
        highlight: false,
        toc: {
          depth: 2,
        },
      },
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "tr", name: "Türkçe", file: "tr.json" },
    ],
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "language",
      redirectOn: "root",
    },
  },

  ui: {
    mdc: true,
    content: true,
  },

  icon: {
    clientBundle: {
      scan: true,
    },
    provider: "iconify",
  },

  telemetry: false,
});

