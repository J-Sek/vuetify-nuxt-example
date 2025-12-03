<template>
  <v-app>
    <v-main style="--v-layout-bottom: 40px">
      <slot />
    </v-main>

    <v-btn
      :icon="`svg:${mdiThemeLightDark}`"
      position="absolute"
      location="top right"
      class="ma-2"
      aria-label="Toggle theme"
      @click="$vuetify.theme.cycle()"
    />

    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import { mdiThemeLightDark } from '@mdi/js'
</script>
