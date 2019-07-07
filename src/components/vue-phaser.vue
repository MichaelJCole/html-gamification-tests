<template>
  <div id="gameParent">
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
  data() {
    return {
      phaserInstance: false
    }
  },
  mounted() {
    // Custom game stuff
    const { width, height, physics, scene, callbacks } = this.game;

    // Configuration specific to Vue integration
    // https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
    var config = {
      type: Phaser.AUTO,
      scale: {
        parent: 'gameArea',
        mode: Phaser.Scale.FIT,
        width,
        height,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      physics,
      scene,
      callbacks
    };

    this.phaserInstance = new Phaser.Game(config);
  }
}
</script>

<style>
body {
  height: 100vh;
  background-color: purple;
}
#gameArea {
  margin-top: 0px;
}
</style>
