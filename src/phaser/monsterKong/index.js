import Load from './Load'
import Game from './Game'

// our game's configuration for vue-phaser control
export default {
  width: 360,
  height: 640,
  title: 'Virtual Pet',
  pixelArt: false,
  backgroundColor: '000000',
  scene: [new Load(), new Game()],
  physics: { default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: true
    }
  }
}
