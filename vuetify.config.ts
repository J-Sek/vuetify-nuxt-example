import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
  // your Vuetify options here
  theme: {
    layers: true,
    defaultTheme: "dark",
    themes: {
      dark: {
        variables: {
          "medium-emphasis-opacity": 0.75,
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi-svg",
  },
  ssr: {
    clientWidth: 1920,
    clientHeight: 900,
  },
  defaults: {
    VCode: {
      class: "font-mono",
    },
  },
});
