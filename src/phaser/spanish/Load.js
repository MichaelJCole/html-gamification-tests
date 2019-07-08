// create a new scene
import Phaser from 'phaser'

export default class LoadingScene extends Phaser.Scene {
  constructor () {
    super('Loading')
  }

  // Preload the logo for the loading screen

  preload () {
    this.load.spritesheet('pet', require('./images/house.png'), { frameWidth: 97, frameHeight: 83, margin: 1, spacing: 1 })
  }

  // Show the loading screen and load assets

  create () {
    const c = this.sys.game.config

    // Show loading screen
    this.text = this.add.text(c.width/2, c.height/2-100, '😊 Spanish Game!', {
      font: '40px Arial',
      fill: 'purple'
    })
    this.text.setOrigin(0.5)

    // Load assets
    this.load.image('background', require('./images/background-city.png'))
    this.load.image('building', require('./images/building.png'))
    this.load.image('car', require('./images/car.png'))
    this.load.image('house', require('./images/house.png'))
    this.load.image('tree', require('./images/tree.png'))

    this.load.audio('wrong', require('./audio/wrong.mp3'))
    this.load.audio('tree', require('./audio/arbol.mp3'))
    this.load.audio('car', require('./audio/auto.mp3'))
    this.load.audio('house', require('./audio/casa.mp3'))
    this.load.audio('building', require('./audio/edificio.mp3'))
    this.load.audio('correct', require('./audio/correct.mp3'))
    
    this.progressBar = this.add.graphics()
    this.load.on('progress', function(value) {
      this.progressBar.clear();
      this.progressBar.fillStyle(0xaaaaaa, 1)
      this.progressBar.fillRect(170, 185, 300, 70)
      this.progressBar.fillStyle(0x992299, 1)
      this.progressBar.fillRect(175, 190, value * 280, 60)
    }, this)
    this.load.on('complete', function(value) {
      this.scene.stop()
      this.scene.start('Home')
    }, this)
    this.load.start()
  }
}
