/**
 * The most Awesome Button.
 * 
 * 
 * 
 * Example: 
        new AwesomeButton(this, c.width/2, c.height/2+35, 300, 100,
          {
            // Config object

            // Awesome buttons are in one of 4 states: rest|hover|active|disabled

            // The sprite "key" to use (required)
            spriteKey: 'btn',  // => btn_[state].png

            // Sounds played on enter state (optional)
            sounds: {
              active: 'beep'
            },

            // Text and location (optional)
            text: 'Start!',
            originY: 0.6,

            // Text styling (optional)
            default: {
              font: '60px Freckle Face',
              color: 'white',
            },
            active: {
              color: 'yellow'
            }
          },

          // Callback on active
          () => {
            this.scene.start('Game', 'level01')
          }
        )
 */
export default class AwesomeButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, w, h, config, callback) {
    // Get configuration
    const { spriteKey, text } = config
    
    // Create two child GameObjects
    const btn = scene.add.sprite(0, 0, 'multiatlas', `${spriteKey}_rest.png`)
    const txt = scene.add.text(0, 0, text || 'Awesome!', config.default)
    
    // Super this Container and configure
    super(scene, x, y, [btn, txt]);
    this.setSize(btn.width, btn.height)
    this.config = config

    // Configure button
    this.btn = btn
    this.btn.setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.enterButtonHoverState();
        callback();
      })

    // Configure text
    this.txt = txt
    this.txt.setOrigin(config.originX || 0.5, config.originY || 0.5)
    this.styleOrig = txt.style

    // Configure sounds
    config.sounds = config.sounds || {}
    this.sounds = Object.keys(config.sounds).reduce((total, key) => {
      total[key] = scene.sound.add(config.sounds[key])
      return total
    }, {})
  }

  enterButtonHoverState() {
    this.btn.setFrame(`${this.config.spriteKey}_hover.png`);
    // TODO FIXME see performance note here: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Text.html#toc1__anchor
    this.txt.setStyle(Object.assign({}, this.config.default, this.config.hover))
    if (this.sounds.hover) this.sounds.hover.play()
  }

  enterButtonRestState() {
    this.btn.setFrame(`${this.config.spriteKey}_rest.png`)
    this.txt.setStyle(Object.assign({}, this.config.default, this.config.rest))
    if (this.sounds.rest) this.sounds.rest.play()
  }

  enterButtonActiveState() {
    this.btn.setFrame(`${this.config.spriteKey}_active.png`);
    this.txt.setStyle(Object.assign({}, this.config.default, this.config.active))
    if (this.sounds.active) this.sounds.active.play()
  }

  enterButtonDisabledState() {
    this.btn.setFrame(`${this.config.spriteKey}_disabled.png`);
    this.txt.setStyle(Object.assign({}, this.config.default, this.config.disabled))
    if (this.sounds.disabled) this.sounds.disabled.play()
  }
}