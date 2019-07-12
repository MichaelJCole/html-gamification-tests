// create a new scene
import Phaser from 'phaser'

const monopoles = []
const spawners = []

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
    const c = this.sys.game.config

    // Load Level
    this.level = this.loadLevel(this.levelStr)

    this.matter.world.setBounds();
    this.matter.add.mouseSpring();

    // waiting for user input
    this.input.on("pointerdown", function(pointer) {

      // Look for stuff under the pointer
      var bodiesUnderPointer = Phaser.Physics.Matter.Matter.Query.point(this.matter.world.localWorld.bodies, pointer);

      // stuff?  tell me more
      if(bodiesUnderPointer.length) {
        console.log(bodiesUnderPointer)
      }

      // no stuff?  make stuff
      else {
        // Create the spawner
        let spawner = this.matter.add.sprite(pointer.x, pointer.y, 'apple', 0, 
          { friction: 0, 
            frictionStatic: 0, 
            frictionAir: 0, 
            density: 0.001, 
            restitution: 1 }
        )
        // Add to stuff web
        monopoles.push(spawner)
        spawners.push(spawner)
      }
    }, this);

    // Placement helper
    this.input.on('pointerdown', (pointer) => {
      console.log('click', pointer.x, pointer.y)
    })
  }

  update() {
    /*


    */

    // For each spawner
    const self = this
    this.monopoles.forEach(sp1 => {
      // For ALL other spawners
      self.monopoles.forEach(sp2 => {
        if (sp1 === sp2) return 
        // For all OTHER spawners

      })
    })
  }


  /* Don't be sad, have a fart joke! */

  loadLevel(key) {
    // Get level data from json cache
    const level = this.cache.json.get(key)

    this.matter.world.setBounds(0, 0, level.worldW, level.worldH);

    level.obstacles.forEach(obsta => {
      this.matter.add.rectangle(obsta.x, obsta.y, obsta.w, obsta.h, 
        { isStatic: true }
      )
    }, this)

    level.spawners.forEach(spawner => {
    })

    // Camera
    this.cameras.main.setBounds(0,0,level.worldW, level.worldH)
    this.cameras.main.setDeadzone(400, 300);
    // this.cameras.main.startFollow(this.player)
    return level
  }

}
