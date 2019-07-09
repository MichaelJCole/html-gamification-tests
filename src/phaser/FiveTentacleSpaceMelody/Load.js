// create a new scene
import Phaser from 'phaser'
import AwesomeButton from '../lib/AwesomeButton'

export default class LoadingScene extends Phaser.Scene {
  constructor () {
    super('Loading')
  }

  init() {
    this.googleFonts = { families: [ 'Freckle Face', 'Finger Paint', 'Nosifer' ] },
    this.fontsReady = false
    this.assetsReady = false
    this.buttonReady = false
  }

  // Preload the logo for the loading screen

  preload () {
    // Something to show
    this.load.image('background-splash', require('./images/background-splash.jpg'));
    // Need this to load fonts
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  // Show the loading screen and load assets

  create () {
    const c = this.sys.game.config

    // Space is great isn't it
    this.background = this.add.sprite(0,0,'background-splash').setOrigin(0).setScale(1.5)

    // Show loading screen text
    this.text = this.add.text(c.width/2, c.height/2-100, '5💪🌌🎼 (5-Tentacle Space Melody)', {
      font: '40px Arial',
      fill: 'white'
    })
    this.text.setOrigin(0.5)

    // Load assets

    this.loadStuff()
    const self = this
    WebFont.load({
      google: this.googleFonts,
      active: function () {
        self.fontsReady = true
      }
    });

    // Show progress!

    this.progressBar = this.add.graphics()
    this.load.on('progress', function(value) {
      this.progressBar.clear();
      this.progressBar.fillStyle(0xaaaaff, 1)
      this.progressBar.fillRect(c.width/2-150, c.height/2, 300, 70)
      this.progressBar.fillStyle(0x992299, 1)
      this.progressBar.fillRect(c.width/2-150+3, c.height/2+3, value * 294, 64)
      const pct = Math.ceil(value * 100)
      this.progressText.setText(`Loading ... ${pct}%`)
    }, this)
    this.load.on('complete', function(value) {
      this.assetsReady = true
    }, this)

    this.progressText = this.add.text(c.width/2, c.height/2+35, 'Loading ...', {
      font: '20px Arial',
      fill: 'white'
    })
    this.progressText.setOrigin(0.5)

    this.load.start()
  }

  update() {
    const c = this.sys.game.config
    if (this.fontsReady && this.assetsReady && !this.buttonReady) {
      this.progressBar.visible = false
      this.progressText.visible = false
      this.startButton = this.add.existing(
        new AwesomeButton(this, c.width/2, c.height/2+35, 300, 100,
          {
            spriteKey: 'btn',  // => btn_[rest|hover|active|disabled].png

            text: 'Start!',
            originY: 0.6,
            sounds: {
              active: 'beep'
            },
            default: {
              font: '60px Freckle Face',
              color: 'white',
            },
            active: {
              color: 'yellow'
            }
          },
          () => {
            this.scene.start('Game', 'level01')
          }
        )
      )
      this.buttonReady = true
    }
  }

  loadStuff() {
    // Single images

    this.load.image('background', require('./images/background.jpg'));

    // Sounds

    this.load.audio('beep', require('./audio/beep.mp3'))

    // Sprites 

    // Webpack sprites.png to [hash]/sprites.png
    const spriteFile = require('!!file-loader?name=[hash]/[name].[ext]!./sprites.png')
    // Use [hash] as last param to multiatlas loader
    this.load.multiatlas('multiatlas', require('./sprites.json'), spriteFile.split('/').shift());
  }
}
