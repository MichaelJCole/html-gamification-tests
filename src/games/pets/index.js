import Load from './Load'
import Home from './Home'
import Game from './Game'

// our game's configuration for vue-phaser control
export default {
  height: 640,
  width: 360,
  title: 'Virtual Pet',
  pixelArt: false,
  backgroundColor: 'ffffff',
  scene: [new Load(), new Home(), new Game()]
}
