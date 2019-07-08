// create a new scene
import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game')
  }

  // some parameters for our scene
  init() {

  }

  // executed once, after assets were loaded
  create () {

    // World bounds
    this.physics.world.bounds.width = 360
    this.physics.world.bounds.height = 700


    // Player boundaries

    this.boundaries = this.add.group()
    // Ground
    this.boundaries.add(this.physics.add.staticSprite(180, 604, 'ground'))
    // Platforms
    let platform = this.add.tileSprite(180, 500, 4*36, 1*30, 'block')
    this.boundaries.add(this.physics.add.existing(platform, true)) 

    // Player

    this.player = this.physics.add.sprite(180, 450, 'player', 3)
    this.anims.create({
      key: 'walking',
      frames: this.anims.generateFrameNames('player', {
        frames: [0,1,2]
      }),
      yoyo: true,
      frameRate: 12,
      repeat: -1
    })
    this.player.runSpeed = 100
    this.player.jumpSpeed = -600

    // Collider

    this.physics.add.collider(this.player, this.boundaries)
    this.player.body.setCollideWorldBounds(true)

    // Controls

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {

    let onGround = this.player.body.blocked.down || this.player.body.touching.down
    
    // Left
    
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-this.player.runSpeed)
      this.player.flipX = false
      if (!this.player.anims.isPlaying && onGround)
        this.player.anims.play('walking')
    }
    
    // Right

    else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(this.player.runSpeed)
      this.player.flipX = true
      if (!this.player.anims.isPlaying && onGround)
        this.player.anims.play('walking')
    }

    // Stopped

    else {
      this.player.body.setVelocityX(0)
      this.player.anims.stop('walking')
      if (onGround) this.player.setFrame(3)
    }

    if (onGround && (this.cursors.space.isDown || this.cursors.up.isDown)) {
      this.player.body.setVelocityY(this.player.jumpSpeed)
      this.player.anims.stop('walking')
      this.player.setFrame(2)
    }
  }
}
