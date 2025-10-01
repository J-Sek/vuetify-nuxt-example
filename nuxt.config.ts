import presetWind4 from "@unocss/preset-wind4";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,

  // when enabling ssr option you need to disable inlineStyles and maybe devLogs
  features: {
    inlineStyles: false,
    devLogs: false,
  },

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
  },

  css: ["assets/main.scss"],
  modules: [
    "@unocss/nuxt",
    "@nuxt/fonts",
    "vuetify-nuxt-module",
    "@nuxt/eslint",
  ],

  unocss: {
    presets: [
      presetWind4({
        preflights: {
          reset: false,
        },
        theme: {
          fontFamily: {
            sans: "Sen",
            serif: "sans-serif",
            mono: "Sometype Mono",
          },
        },
      }),
    ],
  },

  fonts: {
    defaults: {
      weights: [300, 400, 500, 700],
      styles: ["normal", "italic"],
      subsets: ["latin"],
    },
  },

  vuetify: {
    moduleOptions: {
      // check https://nuxt.vuetifyjs.com/guide/server-side-rendering.html
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
        prefersColorScheme: false,

        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
      },

      disableVuetifyStyles: true,
      styles: {
        configFile: "assets/settings.scss",
      },
    },
  },
});
