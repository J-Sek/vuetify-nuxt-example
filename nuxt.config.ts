import presetWind4 from "@unocss/preset-wind4";
import * as breakpoints from './app/theme/breakpoints'

const targetDomain = import.meta.env.TARGET_DOMAIN
const appDescription = 'Boilerplate to kick-start your next project'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,

  app: {
    head: {
      htmlAttrs: { lang: 'en-US', style: 'overflow-y: auto', class: 'my-app' },
      titleTemplate: '%s | Vuetify + Nuxt Boilerplate',
      title: 'Loading...',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `https://${targetDomain}?utm_source=oglink` },
        { property: 'og:image', content: `https://${targetDomain}/images/screenshot.png` },
        { property: 'og:image:width', content: '1500' },
        { property: 'og:image:height', content: '1024' },
        { name: 'theme-color', content: '#1867C0' },
      ],
      link: [
        // { rel: 'manifest', href: '/manifest.webmanifest' },e
        { rel: 'apple-touch-icon', href: '/images/logo.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/images/logo.svg' },
      ],
    },
    pageTransition: { name: 'fade-transition', mode: 'out-in' },
    layoutTransition: { name: 'fade-transition', mode: 'out-in' },
  },

  // when enabling ssr option you need to disable inlineStyles and maybe devLogs
  features: {
    inlineStyles: false,
    devLogs: false,
  },

  runtimeConfig: {
    public: {
      targetDomain,
      appDescription,
    },
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
        dark: {
          dark: '.v-theme--dark',
          light: '.v-theme--light',
        },
      }),
    ],
    theme: {
      font: {
        sans: "Sen",
        serif: "sans-serif",
        mono: "Sometype Mono",
      },
      colors: {
        primary: {
          500: '#007bcc',
          800: '#003256',
        },
        secondary: {
          500: '#00829E',
          600: '#00677e',
          700: '#004e5f',
          800: '#003543',
        },
      },
      breakpoint: breakpoints.forTailwind,
    },
    shortcuts: {
      'text-h1': 'font-heading text-[6rem]     font-[300] leading-[1]     tracking-[-.015625em]',
      'text-h2': 'font-heading text-[3.75rem]  font-[300] leading-[1]     tracking-[-.0083333333em]',
      'text-h3': 'font-heading text-[3rem]     font-[400] leading-[1.05]  tracking-[normal]',
      'text-h4': 'font-heading text-[2.125rem] font-[400] leading-[1.175] tracking-[.0073529412em]',
      'text-h5': 'font-heading text-[1.5rem]   font-[400] leading-[1.333] tracking-[normal]',
      'text-h6': 'font-heading text-[1.25rem]  font-[500] leading-[1.6]   tracking-[.0125em]',
      'text-subtitle-1': 'font-body normal-case text-[1rem]    font-[400] leading-[1.75]  tracking-[.009375em]',
      'text-subtitle-2': 'font-body normal-case text-[.875rem] font-[500] leading-[1.6]   tracking-[.0071428571em]',
      'text-body-1':     'font-body normal-case text-[1rem]    font-[400] leading-[1.5]   tracking-[.03125em]',
      'text-body-2':     'font-body normal-case text-[.875rem] font-[400] leading-[1.425] tracking-[.0178571429em]',
      'text-button':     'font-body uppercase   text-[.875rem] font-[500] leading-[2.6]   tracking-[.0892857143em]',
      'text-caption':    'font-body normal-case text-[.75rem]  font-[400] leading-[1.667] tracking-[.0333333333em]',
      'text-overline':   'font-body uppercase   text-[.75rem]  font-[500] leading-[2.667] tracking-[.1666666667em]',
    },
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
    vuetifyOptions: {
      display: {
        mobileBreakpoint: "md",
        thresholds: breakpoints.forVuetify,
      },
    }
  },
});
