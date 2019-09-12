<template>
  <div id="gameParent">
    <p style="text-align: right;">Note: if the game doesn't "reload" after clicking awaywhen you click back, refresh the page.  Art is abandoned.</p>
    <div id="gameArea"></div>
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
    // This doesn't work.
    if (this.phaserInstance) {
      console.log('bye bye!')
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
