// create a new scene
import Phaser from 'phaser'

export default class LoadingScene extends Phaser.Scene {
  constructor () {
    super('Loading')
  }

  // load asset files for our game
  preload () {
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

    this.load.spritesheet('pet', require('./images/pet.png'), { frameWidth: 97, frameHeight: 83, margin: 1, spacing: 1 })
  }

  // executed once, after assets were loaded
  create () {

    // Create animations

    this.anims.create({
      key: 'funnyfaces',
      frames: this.anims.generateFrameNames('pet', { frames: [0,1,2,3] }),
      frameRate: 7,
      yoyo: true,
      repeat: 0
    })
    
    //this.scene.start('Home')
  }
}
