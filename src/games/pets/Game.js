// create a new scene
import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game')
  }

  // some parameters for our scene
  init() {
    this.stats = {
      health: 10,
      fun: 100,
    }
    this.scoreDecay = {
      health: -5,
      fun: -2
    }
    this.uiBlocked = false
    this.dead = false
  }

  // executed once, after assets were loaded
  create () {

    this.background = this.add.sprite(0,0, 'backyard').setInteractive()
    this.background.setOrigin(0, 0)
    this.background.on('pointerdown', this.placeItem, this)

    this.pet = this.add.sprite(200, 400, 'pet', 0).setInteractive()

    this.input.setDraggable(this.pet)
    this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX
      gameObject.y = dragY
    })

    this.appleBtn = this.add.sprite(72, 560, 'apple').setInteractive()
    this.appleBtn.scoreChange = { health: 20, fun: 0 }
    this.appleBtn.on('pointerdown', this.pickItem)

    this.candyBtn = this.add.sprite(144, 560, 'candy').setInteractive()
    this.candyBtn.scoreChange = { health: -10, fun: 10 }
    this.candyBtn.on('pointerdown', this.pickItem)

    this.toyBtn = this.add.sprite(216, 560, 'toy').setInteractive()
    this.toyBtn.scoreChange = { health: 0, fun: 15 }
    this.toyBtn.on('pointerdown', this.pickItem)

    this.rotateBtn = this.add.sprite(288, 560, 'rotate').setInteractive()
    this.rotateBtn.scoreChange = { fun: 20 }
    this.rotateBtn.on('pointerdown', this.rotatePet)

    this.createHud()

    this.timedEventStats = this.time.addEvent({
      delay: 1000,
      repeat: -1,
      callbackScope: this,
      callback: function() {
        this.updateScore(this.scoreDecay)
      }
    })
  }

  /* HUD and scoring */

  createHud() {
    this.healthText = this.add.text(20, 20, 'Health: ' + this.stats.health, {
      font: '26px Arial',
      fill: 'purple'
    })
    this.funText = this.add.text(20, 60, 'Fun: ' + this.stats.fun, {
      font: '26px Arial',
      fill: 'purple'
    })  
  }

  updateScore(vector) {
    // Add new score data
    if (vector) {
      for (let stat in vector) {
        if(vector.hasOwnProperty(stat)) {
          this.stats[stat] += vector[stat]
        }
      }
    }

    // Gracefully handle death
    if (this.stats.health < 0) this.stats.health = 0
    if (this.stats.fun < 0) this.stats.fun = 0
    if (!this.stats.fun || ! this.stats.health) {
      this.gameOver()
    }

    // update UI
    this.healthText.setText('Health: ' + this.stats.health)
    this.funText.setText('Fun: ' + this.stats.fun)
  }

  /* Game over - death */

  gameOver() {
    this.dead = true
    this.uiBlocked = true
    this.pet.setFrame(4)
    this.time.addEvent({
      delay: 3000,
      repeat: 0,
      callbackScope: this,
      callback: function() {
        this.scene.start('Home')
      }
    })
  }

  /* controls are syncronous */

  uiReady() {
    // nothing selected
    this.selectedItem = false
    this.appleBtn.alpha = 1
    this.candyBtn.alpha = 1
    this.toyBtn.alpha = 1
    this.rotateBtn.alpha = 1
    // Ready for action
    this.uiBlocked = false
    if (this.dead) this.uiBlocked = true // oops dead
  }

  /* play controls */

  rotatePet() {
    if (this.scene.uiBlocked) return
    this.scene.uiReady()
    this.alpha = 0.5
    this.scene.uiBlocked = true

    let rotateTween = this.scene.tweens.add({
      targets: this.scene.pet,
      duration: 600,
      angle: 360,
      pause: false,
      callbackScope: this,
      onComplete: function(tween, sprites) {
        this.scene.updateScore(this.scoreChange)
        this.scene.uiReady()
      }
    })
  }

  pickItem() {
    if (this.scene.uiBlocked) return
    this.scene.uiReady()

    // Select an item to place.  Show selection with alpha
    this.scene.selectedItem = this
    this.alpha = 0.5
  }

  placeItem(pointer, localX, localY) {
    if (!this.selectedItem || this.uiBlocked) return
    this.uiBlocked = true
    
    // Place a copy of selected item.
    let s = this.selectedItem
    let newItem = this.add.sprite(localX, localY, s.texture.key)

    // Move pet to interact
    let petTween = this.tweens.add({
      targets: this.pet,
      duration: 500,
      x: newItem.x,
      y: newItem.y,
      paused: false,
      callbackScope: this,
      onComplete(tween, sprites) {
        this.pet.on('animationcomplete', function() {
          this.uiReady()
        }, this)
        this.pet.play('funnyfaces')

        // Update score
        this.updateScore(s.scoreChange)
        newItem.destroy()
      }
    })
  }
}
