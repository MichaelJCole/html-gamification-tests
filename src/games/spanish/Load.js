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
    this.textBackground = this.add.graphics() 
    this.textBackground.fillStyle('purple', 0.5)
    this.textBackground.fillRect(35, 180, 295, 75)

    this.text = this.add.text(c.width/2, c.height/2-100, '😊 Spanish Game!', {
      font: '40px Arial',
      fill: 'white'
    })
    this.text.setOrigin(0.5)

    this.progressBar = this.add.graphics()
    this.progressBar.fillStyle(0x992299, 1)

    // Load assets

    const images = {
      // Files in this directory will be packed with webpack.
      background: require('./images/background-city.png'),
      building: require('./images/building.png'),
      car: require('./images/car.png'),
      house: require('./images/house.png'),
      tree: require('./images/tree.png')
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

    console.log(require('./audio/wrong.mp3'))
    console.log(require('./audio/arbol.mp3'))
    

    this.load.audio('wrong', require('./audio/wrong.mp3'))
    this.load.audio('tree', require('./audio/arbol.mp3'))
    this.load.audio('car', require('./audio/auto.mp3'))
    this.load.audio('house', require('./audio/casa.mp3'))
    this.load.audio('building', require('./audio/edificio.mp3'))
    this.load.audio('correct', require('./audio/correct.mp3'))
    
    this.load.on('progress', function(value) {
      this.progressBar.clear();
      this.progressBar.fillRect(170, 385, 20, (1-value) * 140)
    }, this)
    this.load.on('complete', function(value) {
      this.scene.stop()
      this.scene.start('Home')
    }, this)
    this.load.start()
  }
}
