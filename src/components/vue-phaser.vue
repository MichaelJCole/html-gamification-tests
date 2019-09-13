<template>
  <div id="gameParent">
    <div id="gameArea"></div>
    <p>
      <a href="https://phaser.io" target="_blank">Phaser.io</a> (the HTML game engine)
      doesn't like WebPack, which packages 
      <a href="https://quasar.dev" target="_blank">Quaser</a> (the navbar)
      and 
      <a href="https://vuejs.org/" target="_blank">Vue</a> - and is a problem I don't care to solve.  
    <br>If the screen is black reload the page.  Art must be abandoned.</p>
  </div>
</template>

<script>
import Phaser from 'phaser'

export default {
  props: {
    game: Object
  },
  components: {
  },
  data () {
    return {
      phaserInstance: false
    }
  },
  mounted () {
    // Custom game stuff

    // Configuration specific to Vue integration
    // https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
    var config = {
      type: Phaser.AUTO,
      scale: {
        parent: 'gameArea',
        mode: Phaser.Scale.FIT,
        width: this.game.width,
        height: this.game.height,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    }

    if (!this.phaserInstance) this.phaserInstance = new Phaser.Game(Object.assign(config, this.game))
  },

  destroyed () {
    if (this.phaserInstance) {
      console.log('bye bye!', this.phaserInstance)
      this.phaserInstance.destroy(true)
      delete this.phaserInstance
    }
  }
}
</script>

<style>
#gameParent {
  width: 100%;
  height: 80vh;
}
#gameArea {
  margin-top: 0px;
}
</style>
