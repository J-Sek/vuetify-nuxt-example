<template>
  <v-container class="fill-height d-flex align-center" max-width="900">
    <div>
      <v-img
        class="mb-4"
        height="150"
        src="/images/logo.png"
        alt="Placeholder logo"
      />

      <div class="mb-8 text-center">
        <div class="font-weight-light mb-n1">Welcome to</div>
        <h1 class="text-h1">Vuetify</h1>
      </div>

      <div class="d-flex flex-wrap ga-3">
        <v-card
          class="py-4 pr-sm-[120px] w-full bg-primary rounded-xl"
          color="surface-variant"
          image="https://cdn.vuetifyjs.com/docs/images/one/create/feature.png"
          variant="tonal"
        >
          <template #prepend>
            <v-avatar icon="$complete" size="60" variant="tonal" class="ml-2 mr-4" />
          </template>

          <template #image>
            <v-img class="d-none d-sm-block my-auto" height="120" position="top right" alt="Hero card supplemental image" />
          </template>

          <template #title>
            <h2 class="text-h5 font-weight-medium pt-1 translate-y-[2px]">
              Get started
            </h2>
          </template>

          <template #subtitle>
            <div class="text-subtitle-1 mt-2 line-height-[1]">
              Change this page by updating <v-code>{{ `<HelloWorld />` }}</v-code> in <v-code>components/HelloWorld.vue</v-code>.
            </div>
          </template>
        </v-card>

        <v-card
          v-for="link in links" :key="link.href"
          :append-icon="mdiArrowTopRight"
          class="
            rounded-xl
            flex-basis-sm-[40%] flex-grow-[1] h-[120px] d-flex align-center [&>.v-card-item]:w-100
          "
          color="surface-variant"
          :href="link.href"
          rel="noopener noreferrer"
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
