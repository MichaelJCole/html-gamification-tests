// create a new scene
import Phaser from 'phaser'


export default class HomeScene extends Phaser.Scene {
  constructor () {
    super('Home')
  }

  // executed once, after assets were loaded
  create () {
    const c = this.sys.game.config

    // Controls 

    this.background = this.add.sprite(0,0, 'backyard').setInteractive()
    this.background.setOrigin(0, 0)

    this.textBackground = this.add.graphics() 
    this.textBackground.fillStyle('purple', 0.5)
    this.textBackground.fillRect(35, 180, 295, 75)

    this.text = this.add.text(c.width/2, c.height/2-100, '😊 Virtual Pet!', {
      font: '40px Arial',
      fill: 'white'
    })
    this.text.setOrigin(0.5)

    this.pet = this.add.sprite(200, 400, 'pet', 0).setInteractive()

    // Interact to start the game

    this.background.on('pointerdown', this.startGame, this)
    this.text.on('pointerdown', this.startGame, this)
    this.pet.on('pointerdown', this.startGame, this)

    // Teaser

    this.pet.play('funnyfaces')
    this.timedEventStats = this.time.addEvent({
      delay: 10000,
      repeat: -1,
      callbackScope: this,
      callback: function() {
        this.pet.play('funnyfaces')
      }
    })
  }

  startGame() {
    console.log(this)
    this.scene.start('Game')
  }
}

