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
