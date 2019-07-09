// create a new scene
import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game')
  }

  // some parameters for our scene
  init() {
  }

  preload() {
    // Level 01
    this.load.json('level01', require('./level/level1.json'))
  }

  create () {
    this.add.sprite(0,0,'logo').setOrigin(0)
  }
}
