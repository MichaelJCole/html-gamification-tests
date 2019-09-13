<template lang="pug">
  .stuff
    GameBoard(:theme="theme")
    p.words 
      | This was a fun experience converting a 
      a(href="https://codepen.io/jackrugile/pen/zqJdXM") codepen
      br 
      | to a Vue component and learning 
      br
      | to use requestAnimationFrame() for JavaScript driven animation. 
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

<style lang="scss">
.stuff {
  position: relative;
}
.words {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font-weight: bold;
  font-size: 26px;

  a {
    color: white
  }
}
</style>
