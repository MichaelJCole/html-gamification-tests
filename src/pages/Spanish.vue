<template>
  <q-page class="flex flex-center">
    <vue-phaser :game="game"></vue-phaser>
  </q-page>
</template>

<style>
</style>

<script>

import vuePhaser from '../components/vue-phaser'

import game from '../phaser/Spanish'

export default {
  name: 'Spanish',
  components: {
    vuePhaser
  },
  computed: {
    game() {
      return game
    }
  }
}
</script>
