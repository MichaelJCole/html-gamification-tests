// create a new scene
import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game')
  }

  init(data) {
    this.levelStr = data.levelStr || 'level01'
  }

  preload() {
    // Level 01
    this.load.json(this.levelStr, require(`./json/${this.levelStr}.json`))
  }

  create () {
    // Load Level
    this.level = this.loadLevel('level01')

    // Placement helper
    this.input.on('pointerdown', (pointer) => {
      console.log('click', pointer.x, pointer.y)
    })
  }

  update() {
  }

  loadLevel(key) {
    // Get level data from json cache
    const level = this.cache.json.get(key)
    return
    // Setup the world
    this.physics.world.setBounds(0, 0, level.worldW, level.worldH)

    // Static boundaries
    this.boundaries = this.physics.add.staticGroup()
    level.boundaries.forEach(p => {
      let obj
      if (p.xTiles === 1) {
        obj = this.add.sprite(p.x, p.y, p.key).setOrigin(0)
      } else {
        let w = this.textures.get(p.key).get(0).width
        let h = this.textures.get(p.key).get(0).height
        obj = this.add.tileSprite(p.x, p.y, p.xTiles*w, p.yTiles*h, p.key).setOrigin(0)
      }
      this.physics.add.existing(obj, true)
      this.boundaries.add(obj) 
    })

    // Fires
    this.fires = this.physics.add.group({
      allowGravity: false,
      immovable: true
    })
    this.anims.create({
      key: 'burning',
      frames: this.anims.generateFrameNames('fire', {frames: [0,1]}),
      frameRate: 4,
      repeat: -1
    })
    level.fires.forEach(fire => {
      let obj = this.add.sprite(fire.x, fire.y, 'fire').setOrigin(0)
      this.physics.add.existing(obj)
      obj.anims.play('burning')
      this.input.setDraggable(obj.setInteractive())
      this.fires.add(obj)
    })
    this.input.on('drag', function(pointer, obj, x, y) {
      obj.x = x
      obj.y = y
      console.log(x, y)
    })

    // Goal
    this.goal = this.physics.add.sprite(level.goal.x, level.goal.y, 'goal')
    this.goal.tween = this.tweens.add({
      targets: this.goal,
      angle: 14,
      duration: 900,
      yoyo: true,
      repeat: -1,
    })
    this.goal.tween.play()

    // Player
    this.player = this.physics.add.sprite(level.player.x, level.player.y, 'player', 3)
    this.anims.create({
      key: 'walking',
      frames: this.anims.generateFrameNames('player', {
        frames: [0,1,2]
      }),
      yoyo: true,
      frameRate: 12,
      repeat: -1
    })
    
    // Spawner
    this.barrels = this.physics.add.group({
      bounceY: 0.1,
      bounceX: 1,
      collideWorldBounds: true
    })

    this.spawner = this.time.addEvent({
      delay: level.spawner.interval,
      loop: true,
      callbackScope: this,
      callback() {
        // create barrel
        let b = this.barrels.get(level.goal.x, level.goal.y, 'barrel')
        b.setActive(true)
        b.setVisible(true)
        b.body.enable = true
        b.setVelocityX(level.spawner.speed)

        this.time.addEvent({
          delay: level.spawner.lifespan,
          repeat: 0,
          callbackScope: this,
          callback() {
            this.barrels.killAndHide(b)
            b.body.enable = false
          }
        })
      }
    })

    // Collider
    this.physics.add.collider([this.player, this.goal, this.barrels], this.boundaries)
    this.physics.add.overlap(this.player, [this.fires, this.barrels], this.gameOver, null, this)
    this.physics.add.overlap(this.player, [this.goal], this.nextLevel, null, this)
    this.player.body.setCollideWorldBounds(true)

    // Camera
    this.cameras.main.setBounds(0,0,level.worldW, level.worldH)
    this.cameras.main.setDeadzone(100, 100);
    this.cameras.main.startFollow(this.player)

    return level
  }

  gameOver(source, target) {
    this.cameras.main.fade(500)
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.restart()
    })
  }

  nextLevel(...args) {
    this.gameOver.apply(null, args)
  }
}
