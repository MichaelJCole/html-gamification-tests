import Load from './Load'
import Game from './Game'

// our game's configuration for vue-phaser control
export default {
  width: 1024,
  height: 768,
  title: '5💪🌌🎼 (5-Tentacle Space Melody)',
  pixelArt: false,
  backgroundColor: '000000',
  scene: [new Load(), new Game()],
  physics: { default: 'arcade',
    arcade: {
      debug: true
    }
  }
}
