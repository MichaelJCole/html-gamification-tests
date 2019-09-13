<template lang="pug">
    GameBoard(:theme="theme")
 
</template>

<script>
import GameBoard from '../components/GameBoard.vue'

export default {
  components: {
    GameBoard
  },
  data() {
    return {
      theme: 'hearthstone',
      themeOptions: {
        hearthstone: 'Hearthstone',
        pokemon: 'Pokemon'
      }
    }
  }
}
</script>

<style lang="scss"></style>
