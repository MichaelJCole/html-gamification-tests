import Load from './Load'
import Game from './Game'

// our game's configuration for vue-phaser control
export default {
  title: '5💪🌌🎼 (5-Tentacle Space Melody)',
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  backgroundColor: '#ffffff',
  scene: [new Load(), new Game()],
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      debugBodyColor: 0xaaaaaa,
      gravity: { x: 0, y: 0 }
    }
  }
}

