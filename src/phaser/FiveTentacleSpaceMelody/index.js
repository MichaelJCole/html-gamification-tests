import Load from './Load'
import Game from './Game'

// our game's configuration for vue-phaser control
export default {
  width: 1024,
  height: 768,
  title: '5💪🌌🎼 (5-Tentacle Space Melody)',
  pixelArt: false,
  backgroundColor: '#ffffff',
  scene: [new Load(), new Game()],
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      debugBodyColor: 0xffffff
    }
  }
}
