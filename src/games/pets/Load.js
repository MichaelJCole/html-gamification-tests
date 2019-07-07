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

    const images = {
      // Files in this directory will be packed with webpack.
      backyard: require('./images/backyard.png'),
      apple: require('./images/apple.png'),
      candy: require('./images/candy.png'),
      rotate: require('./images/rotate.png'),
      toy: require('./images/rubber_duck.png')
    }

    Object.keys(images).forEach(name => {
      if (!this.textures.list[name]) {
        if (images[name].indexOf('data:') === 0) {
          this.textures.addBase64(name, images[name]) // add string directly to texture cache if webpack changed to data uri
        } else {
          this.load.image(name, images[name]) // elsewise, add through XHR
        }
      }
    })

    this.load.on('progress', function(value) {
      console.log(value)
      this.progressBar.clear();
      this.progressBar.fillRect(170, 385, 20, (1-value) * 140)
    }, this)
    this.load.on('complete', function(value) {
      console.log(value)
      this.scene.stop()
      this.scene.start('Home')
    }, this)
    this.load.start()
  }
}
