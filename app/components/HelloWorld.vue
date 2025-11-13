<template>
  <v-container class="h-full flex items-center" max-width="900">
    <div>
      <v-img
        class="mb-4"
        height="150"
        src="/images/logo.png"
        alt="Placeholder logo"
      />

      <div class="mb-8 text-center">
        <div class="font-light -mb-1">Welcome to</div>
        <h1 class="text-h1">Vuetify</h1>
      </div>

      <div class="flex flex-wrap gap-3">
        <v-card
          class="py-4 sm:pr-[120px] w-full"
          color="surface-variant"
          image="https://cdn.vuetifyjs.com/docs/images/one/create/feature.png"
          rounded="lg"
          variant="tonal"
        >
          <template #prepend>
            <v-avatar icon="$complete" size="60" variant="tonal" class="ml-2 mr-4" />
          </template>

          <template #image>
            <v-img class="hidden sm:block my-auto" height="120" position="top right" alt="Hero card supplemental image" />
          </template>

          <template #title>
            <h2 class="text-h5 font-medium pt-1 translate-y-1">
              Get started
            </h2>
          </template>

          <template #subtitle>
            <div class="text-subtitle-1 mt-2 leading-4">
              Change this page by updating <v-code>{{ `<HelloWorld />` }}</v-code> in <v-code>components/HelloWorld.vue</v-code>.
            </div>
          </template>
        </v-card>

        <v-card
          v-for="link in links" :key="link.href"
          :append-icon="mdiArrowTopRight"
          class="sm:basis-[40%] flex-grow-1 h-[120px] flex items-center [&>.v-card-item]:w-full"
          color="surface-variant"
          :href="link.href"
          rel="noopener noreferrer"
          rounded="lg"
          :subtitle="link.subtitle"
          target="_blank"
          :title="link.title"
          variant="tonal"
        >
          <template #prepend>
            <v-avatar :icon="link.icon" size="60" variant="tonal" class="ml-2 mr-4" />
          </template>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { mdiAccountGroupOutline, mdiArrowTopRight, mdiText, mdiWidgetsOutline } from '@mdi/js'

  const links = [
    {
      href: 'https://vuetifyjs.com/',
      icon: mdiText,
      subtitle: 'Learn about all things Vuetify in our documentation.',
      title: 'Documentation',
    },
    {
      href: 'https://vuetifyjs.com/introduction/why-vuetify/#feature-guides',
      icon: '$ratingFull',
      subtitle: 'Explore available framework Features.',
      title: 'Features',
    },
    {
      href: 'https://vuetifyjs.com/components/all',
      icon: mdiWidgetsOutline,
      subtitle: 'Discover components in the API Explorer.',
      title: 'Components',
    },
    {
      href: 'https://discord.vuetifyjs.com',
      icon: mdiAccountGroupOutline,
      subtitle: 'Connect with Vuetify developers.',
      title: 'Community',
    },
  ]
</script>
