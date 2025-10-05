<template>
  <HelloWorld />
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
const { targetDomain, appDescription } = config.public

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