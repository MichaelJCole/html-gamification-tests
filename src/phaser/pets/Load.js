// create a new scene
import Phaser from 'phaser'

export default class LoadingScene extends Phaser.Scene {
  constructor () {
    super('Loading')
  }

  // Preload the logo for the loading screen

  preload () {
    this.load.spritesheet('pet', require('./images/pet.png'), { frameWidth: 97, frameHeight: 83, margin: 1, spacing: 1 })
  }

  // Show the loading screen and load assets

  create () {
    const c = this.sys.game.config

    // Create animations
    this.anims.create({
      key: 'funnyfaces',
      frames: this.anims.generateFrameNames('pet', { frames: [0,1,2,3] }),
      frameRate: 7,
      yoyo: true,
      repeat: 0
    })
    
    // Show loading screen
    this.textBackground = this.add.graphics() 
    this.textBackground.fillStyle('purple', 0.5)
    this.textBackground.fillRect(35, 180, 295, 75)

    this.text = this.add.text(c.width/2, c.height/2-100, '😊 Virtual Pet!', {
      font: '40px Arial',
      fill: 'white'
    })
    this.text.setOrigin(0.5)

    this.pet = this.add.sprite(180, 360, 'pet', 0).setInteractive()
    this.pet.play('funnyfaces')
    this.pet.on('animationcomplete', function() {
      this.pet.play('funnyfaces')
    }, this)
    this.progressBar = this.add.graphics()
    this.progressBar.fillStyle(0x992299, 1)

    // Load assets

    this.load.image('backyard', require('./images/backyard.png'))
    this.load.image('apple', require('./images/apple.png'))
    this.load.image('candy', require('./images/candy.png'))
    this.load.image('rotate', require('./images/rotate.png'))
    this.load.image('toy', require('./images/rubber_duck.png'))

    this.load.on('progress', function(value) {
      this.progressBar.clear();
      this.progressBar.fillRect(170, 385, 20, (1-value) * 140)
    }, this)
    this.load.on('complete', function(value) {
      this.scene.start('Home')
    }, this)
    this.load.start()
  }
}
