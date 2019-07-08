import Load from './Load'
import Home from './Home'
import Game from './Game'

// our game's configuration for vue-phaser control
export default {
  height: 360,
  width: 640,
  title: 'Spanish',
  pixelArt: false,
  backgroundColor: 'ffffff',
  scene: [new Load(), new Home()]
}
