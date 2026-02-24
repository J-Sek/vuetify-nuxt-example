import { presetVuetify } from 'unocss-preset-vuetify'
import * as breakpoints from './app/theme/breakpoints'
import { typographyRules } from './config/typography'

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
    build: {
      cssMinify: 'lightningcss',
    },
  },

  css: [
    "assets/layers.css",
    "vuetify/styles",
    "assets/main.scss"
  ],
  modules: [
    "@unocss/nuxt",
    "@nuxt/fonts",
    "vuetify-nuxt-module",
    "@nuxt/eslint",
  ],

  unocss: {
    preflights: [
      {
        getCSS: () => `
          :root {
            --font-heading: 'Bricolage Grotesque', sans-serif;
            --font-body: Sen, sans-serif;
            --font-mono: 'Sometype Mono', monospace;
          }
        `,
      }
    ],
    presets: [
      presetVuetify({
        breakpoints: Object.fromEntries(
          Object.entries(breakpoints.forTailwind).filter(([k]) => k !== 'xs')
        ) as Record<string, string>,
      }),
    ],
    outputToCssLayers: {
      cssLayerName: (layer) => layer === 'properties' ? null : `uno.${layer}`
    },
    rules: [
      ...typographyRules,
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
      disableVuetifyStyles: true,
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
