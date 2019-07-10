// create a new scene
import Phaser from 'phaser'

var cloth
var blitter

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
    // this.add.image(0, 0, 'background').setOrigin(0, 0);

    blitter = this.add.blitter(0, 0, 'multiatlas');

    this.matter.world.setBounds();
    this.matter.add.mouseSpring();

    var group = this.matter.world.nextGroup(true);

    // setting Matter world bounds
    this.matter.world.setBounds(0, -200, c.width, c.height + 200);

    // waiting for user input
    this.input.on("pointerdown", function(pointer) {
        var bodiesUnderPointer = Phaser.Physics.Matter.Matter.Query.point(this.matter.world.localWorld.bodies, pointer);
        if(bodiesUnderPointer.length == 0){
          this.matter.add.sprite(pointer.x, pointer.y, "crate");
        } else {
          bodiesUnderPointer[0].gameObject.visible = false;
          this.matter.world.remove(bodiesUnderPointer[0])
        }
    }, this);

    // Placement helper
    this.input.on('pointerdown', (pointer) => {
      console.log('click', pointer.x, pointer.y)
    })
  }

  loadLevel(key) {
    // Get level data from json cache
    const level = this.cache.json.get(key)

    this.matter.world.setBounds(0, 0, level.worldW, level.worldH);

    level.walls.forEach(wall => {
      this.matter.add.rectangle(wall.x, wall.y, wall.w, wall.h, { isStatic: true })
    }, this)

    level.spawners.forEach(spawner => {
    })

    // Camera
    this.cameras.main.setBounds(0,0,level.worldW, level.worldH)
    this.cameras.main.setDeadzone(400, 300);
    // this.cameras.main.startFollow(this.player)
    return level
  }


  update () {
    // for (var i = 0; i < cloth.bodies.length; i++) {
    //   var body = cloth.bodies[i];

    //   body.gameObject.x = body.position.x;
    //   body.gameObject.y = body.position.y;
    // }
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
