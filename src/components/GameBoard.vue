// WTF? https://codepen.io/jackrugile/pen/zqJdXM
<template lang="pug">
.game-board.hearthstone
  .game-board-after
  InfiniCard(show-back v-on:loop-volume="loopVolume" v-on:play-sound="playSound")
</template>

<script>
/* 
  GameBoard is responsible for holding all the visual and audio elements of the game.

  See also:  InfiniCard

  A GameBoard can also be used to contain HTML and is responsible for sounds and theming
*/
import debounce from 'lodash/debounce'

import InfiniCard from './InfiniCard.vue'

import { Howl, Howler } from 'howler'
Howler.volume(0.5) // set global volume

// These sounds all loop.  Turn volume up/down to interact.  See methods.fadeLoop
const loops = {
  sparkle: new Howl({
    src: [
      'statics/hearthstone-majesty.webm',
      'statics/hearthstone-majesty.mp4',
      'statics/hearthstone-majesty.ogg'
    ],
    autoplay: true,
    loop: true,
    volume: 0
  }),
  whoosh: new Howl({
    src: [
      'statics/hearthstone-whoosh.webm',
      'statics/hearthstone-whoosh.mp4',
      'statics/hearthstone-whoosh.ogg'
    ],
    autoplay: true,
    loop: true,
    volume: 0
  })
}
Object.keys(loops).forEach(key => {
  loops[key].debounceVolume = debounce(loops[key].volume, 70, {
    leading: true,
    maxWait: 70
  })
})

export default {
  components: {
    InfiniCard
  },
  props: {
    theme: {
      type: String,
      default: 'hearthstone'
    }
  },
  data() {
    return {}
  },
  methods: {
    loopFade(options) {
      const name = options.name || options
      if (loops[name])
        loops[name].fade(loops[name].volume(), options.to, options.duration)
    },
    loopVolume(options) {
      const name = options.name || options
      if (loops[name]) loops[name].debounceVolume(options.to)
    },
    playSound(options) {
      console.log('playSound')
    }
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

/* Layout */
.game-board {
  position: relative;
  background: #000;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
.game-board-after {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  bottom: 0;
  filter: blur(8px);
  left: 0;
  opacity: 0.8;
  position: absolute;
  right: 0;
  top: 0;
}

/* default theme */

.game-board.hearthstone {
  cursor: url(/statics/hearthstone-cursor.png) 10 2, auto;
  &:active {
    cursor: url(/statics/hearthstone-click.png) 10 2, auto;
  }
  .game-board-after {
    background-image: url(/statics/hearthstone-battlefield.jpg);
  }

  .infini-card:active {
    cursor: url(/statics/hearthstone-grab.png) 10 2, auto;
  }
}
</style>
