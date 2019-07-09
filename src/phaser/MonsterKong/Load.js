// create a new scene
import Phaser from 'phaser'

export default class LoadingScene extends Phaser.Scene {
  constructor () {
    super('Loading')
  }

  // Preload the logo for the loading screen

  preload () {
    this.load.image('goal', require('./images/gorilla.png'));
  }

  // Show the loading screen and load assets

  create () {
    const c = this.sys.game.config

    // Show loading screen
    this.textBackground = this.add.graphics() 
    this.textBackground.fillStyle('purple', 0.5)
    this.textBackground.fillRect(35, 180, 295, 75)

    this.text = this.add.text(c.width/2, c.height/2-100, '😊 Monster Kong!', {
      font: '40px Arial',
      fill: 'white'
    })
    this.text.setOrigin(0.5)

    this.pet = this.add.sprite(180, 360, 'goal', 0).setInteractive()

    this.progressBar = this.add.graphics()
    this.progressBar.fillStyle(0x992299, 1)

    // Load assets

    this.loadStuff()

    // Show progress!

    this.progressBar = this.add.graphics()
    this.load.on('progress', function(value) {
      this.progressBar.clear();
      this.progressBar.fillStyle(0xaaaaaa, 1)
      this.progressBar.fillRect(170, 185, 300, 70)
      this.progressBar.fillStyle(0x992299, 1)
      this.progressBar.fillRect(175, 190, value * 280, 60)
    }, this)
    this.load.on('complete', function(value) {
      this.scene.start('Game')
    }, this)
    this.load.start()
  }

  loadStuff() {
    // load images
    this.load.image('ground', require('./images/ground.png'));
    this.load.image('platform', require('./images/platform.png'));
    this.load.image('block', require('./images/block.png'));
    this.load.image('goal', require('./images/gorilla.png'));
    this.load.image('barrel', require('./images/barrel.png'));

    // load spritesheets
    this.load.spritesheet('player', require('./images/player_spritesheet.png'), {
      frameWidth: 28,
      frameHeight: 30,
      margin: 1,
      spacing: 1
    });

    this.load.spritesheet('fire', require('./images/fire_spritesheet.png'), {
      frameWidth: 20,
      frameHeight: 21,
      margin: 1,
      spacing: 1
    });
  }
}
