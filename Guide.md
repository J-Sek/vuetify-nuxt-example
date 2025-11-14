# Vuetify + Nuxt Project Evolution Guide

This document outlines all the steps and changes made to transform the initial `npx create vuetify` boilerplate into the current state of the project.

## Table of Contents

1. [Initial Setup](#1-initial-setup)
2. [Enhanced Nuxt Configuration](#2-enhanced-nuxt-configuration)
3. [Vuetify Configuration](#3-vuetify-configuration)
4. [UnoCSS Integration](#4-unocss-integration)
5. [Custom SCSS Styling](#5-custom-scss-styling)
6. [Layout Enhancements](#6-layout-enhancements)
7. [Custom Error Page](#7-custom-error-page)
8. [App Footer Component](#8-app-footer-component)
9. [Enhanced Home Page](#9-enhanced-home-page)
10. [Utility Functions](#10-utility-functions)
11. [TypeScript Configuration](#11-typescript-configuration)
12. [ESLint Configuration](#12-eslint-configuration)
13. [SEO and Meta Tags](#13-seo-and-meta-tags)
14. [Public Assets](#14-public-assets)

---

## 1. Initial Setup

### Step 1.1: Create the Project

The project was initialized using the Vuetify CLI:

```bash
npx create vuetify
```

This creates a basic Nuxt 3 project with Vuetify integration, including:
- Basic Nuxt configuration
- Vuetify module setup
- Simple app structure with `app.vue`, `pages/index.vue`, and basic components
- Minimal styling

### Step 1.2: Project Structure Overview

The initial boilerplate structure:
```
/
├── app/
│   ├── app.vue
│   ├── components/
│   │   └── HelloWorld.vue
│   ├── layouts/
│   │   └── default.vue
│   ├── pages/
│   │   └── index.vue
│   └── plugins/
│       └── vuetify.ts
├── nuxt.config.ts
├── package.json
└── public/
```

---

## 2. Enhanced Nuxt Configuration

### Step 2.1: Update `nuxt.config.ts`

The `nuxt.config.ts` file was significantly enhanced SEO configuration, and additional modules.

**Changes Made:**

```typescript
import presetWind4 from "@unocss/preset-wind4";

const targetDomain = import.meta.env.TARGET_DOMAIN
const appDescription = 'Boilerplate to kick-start your next project'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en-US', style: 'overflow-y: auto', class: 'my-app' },
      titleTemplate: '%s | Vuetify + Nuxt Boilerplate',  // ✅ Added: Title template
      title: 'Loading...',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        // ✅ Added: Open Graph meta tags
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `https://${targetDomain}?utm_source=oglink` },
        { property: 'og:image', content: `https://${targetDomain}/images/screenshot.png` },
        { property: 'og:image:width', content: '1500' },
        { property: 'og:image:height', content: '1024' },
        { name: 'theme-color', content: '#1867C0' },
      ],
      link: [
        { rel: 'apple-touch-icon', href: '/images/logo.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/images/logo.svg' },
      ],
    },
    // ✅ Added: Page and layout transitions
    pageTransition: { name: 'fade-transition', mode: 'out-in' },
    layoutTransition: { name: 'fade-transition', mode: 'out-in' },
  },

  // ✅ Added: SSR-specific feature flags
  features: {
    inlineStyles: false,
    devLogs: false,
  },

  // ✅ Added: Runtime configuration for environment variables
  runtimeConfig: {
    public: {
      targetDomain,
      appDescription,
    },
  },

  vite: {
    ssr: {
      noExternal: ["vuetify"],  // ✅ Added: Ensure Vuetify is bundled for SSR
    },
  },

  css: ["assets/main.scss"],  // ✅ Added: Custom SCSS file
  modules: [
    "@unocss/nuxt",           // ✅ Added: UnoCSS module
    "@nuxt/fonts",            // ✅ Added: Font optimization module
    "vuetify-nuxt-module",
    "@nuxt/eslint",           // ✅ Added: ESLint module
  ],

  // ✅ Added: UnoCSS configuration
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

  // ✅ Added: Font configuration
  fonts: {
    defaults: {
      weights: [300, 400, 500, 700],
      styles: ["normal", "italic"],
      subsets: ["latin"],
    },
  },

  // ✅ Added: Enhanced Vuetify module configuration
  vuetify: {
    moduleOptions: {
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
        prefersColorScheme: false,
        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
      },
      disableVuetifyStyles: true,  // Use custom SCSS instead
      styles: {
        configFile: "assets/settings.scss",
      },
    },
  },
});
```

**Key Additions:**
- Vuetify transpilation
- SEO meta tags (Open Graph, theme color)
- UnoCSS integration with custom font families
- Font optimization module
- ESLint module
- Runtime configuration for environment variables
- Page and layout transitions
- Custom SCSS configuration

---

## 3. Vuetify Configuration

### Step 3.1: Create `vuetify.config.ts`

A dedicated Vuetify configuration file was created to customize theme, display, and component defaults.

**File Created:** `vuetify.config.ts`

```typescript
import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
  // ✅ Added: Dark theme as default
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
  // ✅ Added: Material Design Icons configuration
  icons: {
    defaultSet: "mdi-svg",
  },
  // ✅ Added: SSR-specific display configuration
  ssr: {
    clientWidth: 1920,
    clientHeight: 900,
  },
  // ✅ Added: Custom breakpoints
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
  // ✅ Added: Component defaults
  defaults: {
    VCode: {
      class: "font-mono",
    },
  },
});
```

**Key Features:**
- Dark theme as default with custom opacity variables
- Custom breakpoints matching UnoCSS configuration
- SSR viewport dimensions
- Component-level defaults (e.g., `VCode` with monospace font)

---

## 4. UnoCSS Integration

### Step 4.1: Install UnoCSS Dependencies

```bash
pnpm add -D @unocss/nuxt @unocss/preset-wind4 unocss
```

### Step 4.2: Configure UnoCSS in `nuxt.config.ts`

UnoCSS was integrated to provide utility classes while disabling Vuetify's default utilities (configured in SCSS).

**Configuration:**
```typescript
unocss: {
  presets: [
    presetWind4({
      preflights: {
        reset: false,  // Disable reset since Vuetify handles it
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
```

**Benefits:**
- Utility classes for layout (flex, gap, etc.)
- Custom font families
- No CSS reset conflicts with Vuetify

---

## 5. Custom SCSS Styling

### Step 5.1: Create `app/assets/main.scss`

A comprehensive SCSS file was created to customize Vuetify's default styling.

**File Created:** `app/assets/main.scss`

```scss
@use 'sass:string';

$heading-font: 'Bricolage Grotesque';
$body-font: 'Sen';

@use 'vuetify' with (
  $heading-font-family: $heading-font,
  $body-font-family: $body-font,
  $layers: true,
  $color-pack: false,
  // ✅ Added: Custom breakpoints matching vuetify.config.ts
  $grid-breakpoints: (
    'xs': 0,
    'sm': 400px,
    'md': 800px,
    'lg': 1280px,
    'xl': 1920px,
    'xxl': 2560px,
  ),
  // ✅ Added: Disable Vuetify utilities (using UnoCSS instead)
  $utilities: (
    "align-content": false,
    "align-items": false,
    "align-self": false,
    "border-bottom": false,
    "border-current": false,
    "border-end": false,
    "border-opacity": false,
    "border-start": false,
    "border-style": false,
    "border-top": false,
    "border": false,
    "bottom": false,
    "cursor": false,
    "display": false,
    "fill-height": false,
    "flex-direction": false,
    "flex-grow": false,
    "flex-shrink": false,
    "flex-wrap": false,
    "flex": false,
    "float:ltr": false,
    "float:rtl": false,
    "float": false,
    "font-italic": false,
    "font-weight": false,
    "gap-column": false,
    "gap-row": false,
    "gap": false,
    "height-screen": false,
    "height": false,
    "justify-content": false,
    "left": false,
    "margin-bottom": false,
    "margin-end": false,
    "margin-left": false,
    "margin-right": false,
    "margin-start": false,
    "margin-top": false,
    "margin-x": false,
    "margin-y": false,
    "margin": false,
    "negative-margin-bottom": false,
    "negative-margin-end": false,
    "negative-margin-left": false,
    "negative-margin-right": false,
    "negative-margin-start": false,
    "negative-margin-top": false,
    "negative-margin-x": false,
    "negative-margin-y": false,
    "negative-margin": false,
    "opacity": false,
    "order": false,
    "overflow-wrap": false,
    "overflow-x": false,
    "overflow-y": false,
    "overflow": false,
    "padding-bottom": false,
    "padding-end": false,
    "padding-left": false,
    "padding-right": false,
    "padding-start": false,
    "padding-top": false,
    "padding-x": false,
    "padding-y": false,
    "padding": false,
    "position": false,
    "right": false,
    "rounded-bottom-end": false,
    "rounded-bottom-start": false,
    "rounded-bottom": false,
    "rounded-end": false,
    "rounded-start": false,
    "rounded-top-end": false,
    "rounded-top-start": false,
    "rounded-top": false,
    "rounded": false,
    "text-align": false,
    "text-decoration": false,
    "text-mono": false,
    "text-opacity": false,
    "text-overflow": false,
    "text-transform": false,
    "top": false,
    "white-space": false,
    "width": false,
  ),
  // ✅ Added: Custom typography settings
  $typography: (
    'h1': (
      'size': 3rem,
      'weight': 300,
      'line-height': 1,
      'letter-spacing': -.015625em,
    ),
    'h2': (
      'size': 2rem,
      'weight': 300,
      'line-height': 1,
      'letter-spacing': -.0083333333em,
    ),
    'h3': (
      'size': 1.5rem,
      'line-height': 1.05,
    ),
    'h4': (
      'size': 2.125rem,
      'line-height': 1.175,
      'letter-spacing': .0073529412em,
    ),
    'h5': (
      'size': 1.5rem,
      'line-height': 1.333,
    ),
    'h6': (
      'size': 1.25rem,
      'weight': 500,
      'line-height': 1.6,
      'letter-spacing': .0125em,
    ),
    'subtitle-1': (
      'size': 1rem,
      'line-height': 1.75,
      'letter-spacing': .009375em,
    ),
    'subtitle-2': (
      'size': .875rem,
      'weight': 500,
      'line-height': 1.6,
      'letter-spacing': .0071428571em,
    ),
    'body-1': (
      'size': 1rem,
      'line-height': 1.5,
      'letter-spacing': .03125em,
    ),
    'body-2': (
      'size': .875rem,
      'line-height': 1.425,
      'letter-spacing': .0178571429em,
    ),
    'button': (
      'size': .875rem,
      'weight': 500,
      'line-height': 2.6,
      'letter-spacing': .0892857143em
    ),
    'caption': (
      'size': .75rem,
      'line-height': 1.667,
      'letter-spacing': .0333333333em,
    ),
    'overline': (
      'size': .75rem,
      'weight': 500,
      'line-height': 2.667,
      'letter-spacing': .1666666667em,
      'text-transform': uppercase
    ),
  ),
);
```

### Step 5.2: Create `app/assets/settings.scss`

A settings file for additional Vuetify configuration.

**File Created:** `app/assets/settings.scss`

```scss
@use 'vuetify/settings' with (
  $layers: true,
  $kbd-font-family: monospace,
  $code-font-size: .875rem,
  $card-subtitle-header-padding: 0 0 .125rem,
  $card-subtitle-white-space: normal,
  // ✅ Added: Breakpoints matching other configurations
  $grid-breakpoints: (
    'xs': 0,
    'sm': 400px,
    'md': 800px,
    'lg': 1280px,
    'xl': 1920px,
    'xxl': 2560px,
  ),
);
```

**Key Features:**
- Custom font families (Bricolage Grotesque for headings, Sen for body)
- Disabled Vuetify utilities to use UnoCSS instead
- Custom typography scale
- Consistent breakpoints across all configuration files
- Custom card and code styling

---

## 6. Layout Enhancements

### Step 6.1: Update `app/layouts/default.vue`

The default layout was enhanced to include the footer and proper Vuetify app structure.

**Before (typical boilerplate):**
```vue
<template>
  <v-app>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
```

**After:**
```vue
<template>
  <v-app>
    <v-main style="--v-layout-bottom: 40px">
      <slot />
    </v-main>

    <AppFooter />
  </v-app>
</template>
```

**Changes:**
- ✅ Added footer component
- ✅ Added bottom padding to account for fixed footer (40px)
- ✅ Proper Vuetify app structure maintained

### Step 6.2: Update `app/app.vue`

The root app component was simplified to use Nuxt's layout system.

**File:** `app/app.vue`

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

This is the standard Nuxt 3 structure that allows for multiple layouts and proper page routing.

---

## 7. Custom Error Page

### Step 7.1: Create `app/error.vue`

A custom error page was created to provide a better user experience when errors occur.

**File Created:** `app/error.vue`

```vue
<template>
  <v-app>
    <v-main>
      <v-container class="flex h-screen">
        <v-progress-circular v-if="reloading" indeterminate size="200" width="3" />
        <v-card v-else class="error-card ma" variant="tonal" width="900">
          <template #title>
            <span class="text-h1">Oops!</span>
          </template>
          <template #text>
            <strong>{{ error?.statusCode ?? '?' }} | {{ error?.statusMessage || 'Unknown Error' }}</strong>
            <p class="text-sm">It looks like something went wrong.</p>
            <pre v-show="showMore" class="mt-6 raw-error">{{ rawError }}</pre>
          </template>
          <template #actions>
            <v-btn color="primary" prepend-icon="$arrowleft" text="Back" to="/" />
            <v-btn
              :text="`${showMore ? 'Hide' : 'Show'} Details`"
              class="ml-auto"
              @click="showMore = !showMore"
            />
          </template>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const showMore = shallowRef(false)
const rawError = computed(() => cleanErrorStack(props.error?.stack))

// ✅ Added: Clean error stack for better readability
function cleanErrorStack(stack?: string) {
  return stack?.split('\n')
    .filter((line) => !/(@vue)|(\$fetch)/.test(line))
    .map((line) => line.replace(/\([^_ ]+_nuxt/gi, '(~'))
    .map((line) => line.replace(/[^_ ]+_nuxt/gi, '~'))
    .map((line) => line.replace(/\(.+node_modules/gi, '(node_modules'))
    .map((line) => line.replace(/\?t=\d+/gi, ''))
    .map((line) => line.trimStart())
    .join('\n')
}

// ✅ Added: Auto-reload on dynamic import failures
const reloading = shallowRef(false)
const reloadCount = computed({
  get: () => Number(localStorage['dev:reload-count'] || 0),
  set: (v) => localStorage['dev:reload-count'] = v
})
watch(rawError, (v) => {
  if ((v ?? '').includes('Failed to fetch dynamically imported module')) {
    if (reloadCount.value > 2) {
      return /* stop auto-reload */
    }
    reloading.value = true
    reloadCount.value++
    setTimeout(() => location.reload(), 1000)
  } else {
    reloadCount.value = 0
  }
}, { immediate: true })
</script>

<style scoped>
.error-card {
  transition: max-width .3s ease-in-out;
}

.raw-error {
  color: rgb(var(--v-theme-error));
  font-size: .8rem;
  scrollbar-width: none;
  overflow-x: scroll;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  -webkit-line-clamp: 12;
  line-clamp: 12;
}
</style>
```

**Key Features:**
- ✅ User-friendly error display with status code and message
- ✅ Expandable error details
- ✅ Error stack cleaning for readability
- ✅ Auto-reload on dynamic import failures (development)
- ✅ Back button to return home
- ✅ Vuetify-styled error card

---

## 8. App Footer Component

### Step 8.1: Create `app/components/AppFooter.vue`

A footer component was created with social links and copyright information.

**File Created:** `app/components/AppFooter.vue`

```vue
<script setup lang="ts">
  import { mdiGithub, mdiShieldStarOutline, mdiReddit } from '@mdi/js'

  const items = shallowRef([
    {
      title: 'Vuetify Documentation',
      icon: `$vuetify`,
      href: 'https://vuetifyjs.com/',
    },
    {
      title: 'Vuetify Support',
      icon: mdiShieldStarOutline,
      href: 'https://support.vuetifyjs.com/',
    },
    {
      title: 'Vuetify X',
      icon: ['M2.04875 3.00002L9.77052 13.3248L1.99998 21.7192H3.74882L10.5519 14.3697L16.0486 21.7192H22L13.8437 10.8137L21.0765 3.00002H19.3277L13.0624 9.76874L8.0001 3.00002H2.04875ZM4.62054 4.28821H7.35461L19.4278 20.4308H16.6937L4.62054 4.28821Z'],
      href: 'https://x.com/vuetifyjs',
    },
    {
      title: 'Vuetify GitHub',
      icon: mdiGithub,
      href: 'https://github.com/vuetifyjs/vuetify',
    },
    {
      title: 'Vuetify Discord',
      icon: ['M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z'],
      href: 'https://community.vuetifyjs.com/',
    },
    {
      title: 'Vuetify Reddit',
      icon: mdiReddit,
      href: 'https://reddit.com/r/vuetifyjs',
    },
  ])
</script>

<template>
  <v-footer
    app
    height="40"
  >
    <NuxtLink
      v-for="item in items"
      :key="item.title"
      class="d-inline-block mx-2 social-link"
      :href="item.href"
      rel="noopener noreferrer"
      target="_blank"
      :title="item.title"
    >
      <v-icon
        :icon="item.icon"
        :size="item.icon === '$vuetify' ? 24 : 16"
      />
    </NuxtLink>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
      &copy; 2016-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">Vuetify, LLC</span>
      —
      <NuxtLink
        class="text-decoration-none on-surface"
        href="https://vuetifyjs.com/about/licensing/"
        rel="noopener noreferrer"
        target="_blank"
      >
        MIT License
      </NuxtLink>
    </div>
  </v-footer>
</template>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
```

**Key Features:**
- ✅ Fixed footer with social media links
- ✅ Dynamic copyright year
- ✅ Hover effects on social icons
- ✅ Responsive copyright text (hidden on mobile)
- ✅ Links to Vuetify resources (Documentation, Support, GitHub, Discord, Reddit, X)

---

## 9. Enhanced Home Page

### Step 9.1: Update `app/pages/index.vue`

The home page was enhanced with SEO meta tags and utility function usage.

**File:** `app/pages/index.vue`

```vue
<template>
  <HelloWorld />
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
const { targetDomain, appDescription } = config.public

// ✅ Added: SEO meta tags using Nuxt's useSeoMeta
useSeoMeta({
  title: 'Home Page',
  ogUrl: `https://${targetDomain}`,
  ogTitle: 'Home | Vuetify + Nuxt Boilerplate',
  description: () => truncate(appDescription, 160),
  ogDescription: () => truncate(appDescription, 300),
  twitterDescription: () => truncate(appDescription, 200),
  twitterCard: 'summary_large_image',
})
</script>
```

**Changes:**
- ✅ Added SEO meta tags using `useSeoMeta` composable
- ✅ Dynamic descriptions using `truncate` utility function
- ✅ Open Graph and Twitter Card support
- ✅ Uses runtime config for domain

### Step 9.2: Enhanced `app/components/HelloWorld.vue`

The HelloWorld component was enhanced with better styling and structure.

**Key Features:**
- Uses UnoCSS utility classes (`flex`, `gap-3`, `items-center`, etc.)
- Responsive design with custom breakpoints
- Vuetify cards with images and icons
- Links to Vuetify resources
- Material Design Icons integration

**Notable Code Snippets:**

```vue
<template>
  <v-container class="h-full flex items-center" max-width="900">
    <!-- Logo and heading -->
    <v-img
      class="mb-4"
      height="150"
      src="/images/logo.png"
      alt="Placeholder logo"
    />

    <!-- Cards with links -->
    <v-card
      v-for="link in links" :key="link.href"
      :append-icon="mdiArrowTopRight"
      class="sm:flex-basis-[40%] flex-grow-1 h-[120px] flex items-center"
      <!-- ... -->
    >
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { mdiAccountGroupOutline, mdiArrowTopRight, mdiText, mdiWidgetsOutline } from '@mdi/js'
  // ...
</script>
```

---

## 10. Utility Functions

### Step 10.1: Create `app/utils/string.ts`

A utility function for text truncation was created.

**File Created:** `app/utils/string.ts`

```typescript
export function truncate(text?: string, limit?: number) {
  const line = (text ?? '').replace(/\n/g, ' ');
  return line.length < (limit ?? 9999)
    ? line
    : line.substring(0, limit) + '...'
}
```

**Usage:**
This function is used in `app/pages/index.vue` to truncate descriptions for different meta tag requirements:
- 160 characters for standard description
- 300 characters for Open Graph description
- 200 characters for Twitter description

**Benefits:**
- Prevents meta tag content from being too long
- Handles undefined/null values gracefully
- Replaces newlines with spaces for cleaner output

---

## 11. TypeScript Configuration

### Step 11.1: Update `tsconfig.json`

The TypeScript configuration was set up to work with Nuxt 3's auto-generated type definitions.

**File:** `tsconfig.json`

```json
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "files": [],
  "references": [
    {
      "path": "./.nuxt/tsconfig.app.json"
    },
    {
      "path": "./.nuxt/tsconfig.server.json"
    },
    {
      "path": "./.nuxt/tsconfig.shared.json"
    },
    {
      "path": "./.nuxt/tsconfig.node.json"
    }
  ]
}
```

**Key Features:**
- ✅ Project references for proper type checking
- ✅ Separates app, server, shared, and node types
- ✅ Leverages Nuxt's auto-generated type definitions
- ✅ Supports TypeScript in Vue components, composables, and utilities

---

## 12. ESLint Configuration

### Step 12.1: Create `eslint.config.mjs`

ESLint was configured using Nuxt's ESLint module.

**File Created:** `eslint.config.mjs`

```javascript
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
)
```

**Installation:**
```bash
pnpm add -D @nuxt/eslint eslint
```

**Configuration:**
- ✅ Uses Nuxt's recommended ESLint rules
- ✅ Extensible for custom rules
- ✅ Integrated with Nuxt's build process
- ✅ TypeScript support enabled

**Usage:**
```bash
pnpm lint        # Check for linting errors
pnpm lint:fix    # Auto-fix linting errors
```

---

## 13. SEO and Meta Tags

### Step 13.1: Enhanced Meta Tags in `nuxt.config.ts`

Comprehensive SEO configuration was added to the Nuxt config.

**Key Additions:**

```typescript
app: {
  head: {
    htmlAttrs: { lang: 'en-US', style: 'overflow-y: auto', class: 'my-app' },
    titleTemplate: '%s | Vuetify + Nuxt Boilerplate',
    title: 'Loading...',
    meta: [
      // Basic meta tags
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: appDescription },

      // Open Graph tags
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `https://${targetDomain}?utm_source=oglink` },
      { property: 'og:image', content: `https://${targetDomain}/images/screenshot.png` },
      { property: 'og:image:width', content: '1500' },
      { property: 'og:image:height', content: '1024' },

      // Theme color
      { name: 'theme-color', content: '#1867C0' },
    ],
    link: [
      { rel: 'apple-touch-icon', href: '/images/logo.png' },
      { rel: 'icon', type: 'image/svg+xml', href: '/images/logo.svg' },
    ],
  },
}
```

### Step 13.2: Page-Level SEO in `app/pages/index.vue`

Page-specific SEO was added using `useSeoMeta`:

```typescript
useSeoMeta({
  title: 'Home Page',
  ogUrl: `https://${targetDomain}`,
  ogTitle: 'Home | Vuetify + Nuxt Boilerplate',
  description: () => truncate(appDescription, 160),
  ogDescription: () => truncate(appDescription, 300),
  twitterDescription: () => truncate(appDescription, 200),
  twitterCard: 'summary_large_image',
})
```

**Benefits:**
- ✅ Improved search engine visibility
- ✅ Better social media sharing (Open Graph, Twitter Cards)
- ✅ Dynamic meta tags based on runtime config
- ✅ Proper title templating

---

## 14. Public Assets

### Step 14.1: Add Public Assets

Various public assets were added to support the application.

**Files Added:**
- `public/favicon.ico` - Browser favicon
- `public/images/logo.png` - Logo image (used in header and as Apple touch icon)
- `public/images/logo.svg` - SVG logo (used as favicon)
- `public/images/screenshot.png` - Screenshot for Open Graph images (1500x1024px)
- `public/robots.txt` - Search engine crawler instructions

**robots.txt:**
```
User-Agent: *
Disallow:
```

This allows all search engines to crawl all pages.

**Usage:**
- Logo images are referenced in `HelloWorld.vue` and meta tags
- Screenshot is used for Open Graph preview images
- Favicon and Apple touch icon improve browser integration

---

## Summary of Dependencies

### Production Dependencies
```json
{
  "@nuxt/eslint": "1.9.0",
  "@unocss/nuxt": "^66.5.2",
  "eslint": "^9.36.0",
  "nuxt": "^4.1.2",
  "vue": "^3.5.21",
  "vue-router": "^4.5.1",
  "vuetify": "^3.9.1"
}
```

### Development Dependencies
```json
{
  "@mdi/js": "^7.4.47",
  "@nuxt/fonts": "^0.11.4",
  "@unocss/preset-wind4": "^66.5.2",
  "sass-embedded": "^1.89.2",
  "typescript": "^5.8.3",
  "unocss": "^66.5.2",
  "vue-tsc": "^3.0.1",
  "vuetify-nuxt-module": "^0.18.7"
}
```

---

## Key Configuration Files Summary

1. **`nuxt.config.ts`** - Main Nuxt configuration with SSR, SEO, modules, and UnoCSS
2. **`vuetify.config.ts`** - Vuetify theme, display, and component defaults
3. **`app/assets/main.scss`** - Custom Vuetify SCSS with disabled utilities and custom typography
4. **`app/assets/settings.scss`** - Additional Vuetify settings
5. **`tsconfig.json`** - TypeScript project references
6. **`eslint.config.mjs`** - ESLint configuration using Nuxt's module

---

## Development Workflow

### Running the Project
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm generate     # Generate static site
pnpm preview      # Preview production build
pnpm typecheck    # Type check the project
pnpm lint         # Lint the code
pnpm lint:fix     # Fix linting issues
```

### Environment Variables
Create a `.env` file (or set environment variables) with:
```
TARGET_DOMAIN=yourdomain.com
```

This is used for Open Graph URLs and other SEO-related configurations.

---

## Architecture Decisions

1. **UnoCSS over Vuetify Utilities**: Vuetify utilities are disabled in favor of UnoCSS for better performance and consistency.

2. **Custom Breakpoints**: All breakpoints are consistently defined across `nuxt.config.ts`, `vuetify.config.ts`, and SCSS files.

3. **SSR-First Approach**: The project is configured for server-side rendering with proper Vuetify transpilation and SSR client hints.

4. **Dark Theme Default**: The application uses dark theme by default with custom opacity variables.

5. **Custom Typography**: Typography scale is customized to match design requirements.

6. **Modular Configuration**: Separate configuration files for Vuetify, TypeScript, and ESLint for better maintainability.

---

## Next Steps

To continue development:

1. Add more pages in `app/pages/`
2. Create additional components in `app/components/`
3. Add composables in `app/composables/` (auto-imported)
4. Configure additional Nuxt modules as needed
5. Customize the theme further in `vuetify.config.ts`
6. Add more utility functions in `app/utils/`
7. Configure additional SEO settings per page
8. Add middleware for authentication/routing logic

---

## Conclusion

This project has evolved from a basic Vuetify + Nuxt boilerplate into a production-ready starter with:
- ✅ Server-side rendering support
- ✅ Comprehensive SEO configuration
- ✅ Custom styling and typography
- ✅ Error handling
- ✅ Utility functions
- ✅ TypeScript support
- ✅ ESLint integration
- ✅ UnoCSS for utility classes
- ✅ Custom breakpoints and responsive design
- ✅ Dark theme with custom configuration

All changes maintain compatibility with Nuxt 3 and Vuetify 3 best practices while providing a solid foundation for building modern web applications.


---

Switching to TailwindCSS
- nuxt module vs vite plugin vs PostCSS plugin
- fonts
- breakpoints
- `@apply`
- Dev Tools
- [ ] theme colors