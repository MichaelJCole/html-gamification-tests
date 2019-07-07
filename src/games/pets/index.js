import LoadingScene from './LoadingScene'
import HomeScene from './HomeScene'
import GameScene from './GameScene'

// our game's configuration for vue-phaser control
export default {
  height: 640,
  width: 360,
  title: 'Virtual Pet',
  pixelArt: false,
  backgroundColor: 'ffffff',
  scene: [new LoadingScene(), new HomeScene(), new GameScene()]
}
