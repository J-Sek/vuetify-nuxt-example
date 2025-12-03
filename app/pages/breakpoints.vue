<template>
  <v-container ref="container" class="mt-12 outline-dashed">
    <v-sheet class="mx-auto pa-6" max-width="400">
      <v-table>
        <tbody>
          <tr>
            <td>Viewport width</td>
            <td class="text-right">
              <v-code>{{ $vuetify.display.width }}px</v-code>
            </td>
          </tr>
          <tr>
            <td>Breakpoint</td>
            <td class="text-right">
              <v-code>{{ $vuetify.display.name }}</v-code>
            </td>
          </tr>
          <tr>
            <td>VContainer width</td>
            <td class="text-right">
              <v-code v-if="container">{{ container.$el.clientWidth }}px</v-code>
            </td>
          </tr>
        </tbody>
      </v-table>
      <br>
      <v-row wrap dense>
        <v-col
          v-for="i in 12"
          :key="i"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          xxl="1"
        >
          <div
            class="
              bg-red-500/50
              sm:bg-lime-500/50
              md:bg-sky-500/50
              lg:bg-amber-500/50
              xl:bg-teal-500/50
              xxl:bg-pink-500/50
              text-white/80
              xxl:text-transparent
              text-center
            "
          >VCol</div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
const container = useTemplateRef('container')
</script>
