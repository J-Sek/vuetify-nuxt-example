import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
  // your Vuetify options here
  theme: {
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
  display: {
    mobileBreakpoint: "sm",
    thresholds: {
      xs: 0,
      sm: 400,
      md: 800,
      lg: 1280,
      xl: 1920,
      xxl: 2560,
    },
  },
  defaults: {
    VCode: {
      class: "font-mono",
    },
  },
});
