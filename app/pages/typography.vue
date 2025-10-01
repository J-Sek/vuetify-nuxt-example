<template>
  <v-container max-width="800">
    <div class="flex flex-wrap sm:justify-center gap-6 mt-12">
      <div class="flex-grow-1">
        <div v-for="[name, cls] in headings" :key="name" class="my-1 pa-2 hover:bg-gray-500/20">
          <div :class="[cls, 'py-2']">{{ name }}</div>
          <div class="pb-2">
            <v-code class="font-medium px-2 bg-gray-500/20">{{ cls }}</v-code>
          </div>
        </div>
      </div>
      <div class="flex-grow-1">
        <div v-for="[name, cls] in bodyText" :key="name" class="my-1 pa-2 hover:bg-gray-500/20">
          <div :class="[cls, 'py-2']">{{ name }}</div>
          <div class="pb-2">
            <v-code class="font-medium px-2 bg-gray-500/20">{{ cls }}</v-code>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const headings = [
  ['Heading 1', 'text-h1'],
  ['Heading 2', 'text-h2'],
  ['Heading 3', 'text-h3'],
  ['Heading 4', 'text-h4'],
  ['Heading 5', 'text-h5'],
  ['Heading 6', 'text-h6'],
]
const bodyText = [
  ['Subtitle 1', 'text-subtitle-1'],
  ['Subtitle 2', 'text-subtitle-2'],
  ['Body 1', 'text-body-1'],
  ['Body 2', 'text-body-2'],
  ['Button', 'text-button'],
  ['Caption', 'text-caption'],
  ['Overline', 'text-overline'],
]
</script>
