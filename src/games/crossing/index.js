import Phaser from 'phaser'

class GameScene extends Phaser.Scene {
  constructor () {
    super('Game')
  }

  preload () {
    const assets = {
      // Files in this directory will be packed with webpack.
      player: require('./player.png'),
      dragon: require('./dragon.png'),
      treasure: require('./treasure.png'),
      background: require('./background.png')
    }

    Object.keys(assets).forEach(name => {
      if (assets[name].indexOf('data:') === 0) {
        if (!this.textures.list[name]) this.textures.addBase64(name, assets[name]) // add string directly to texture cache if webpack changed to data uri
      } else {
        this.load.image(name, assets[name]) // elsewise, add through XHR
      }
    })
  }

  create () {
    const background = this.add.image(0, 0, 'background')
    background.setOrigin(0, 0)

    this.isOver = false
    this.player = this.add.sprite(40, 180, 'player').setScale(0.5)

    this.dragons = [
      this.add.sprite(150, 180, 'dragon'),
      this.add.sprite(250, 180, 'dragon'),
      this.add.sprite(320, 180, 'dragon'),
      this.add.sprite(410, 180, 'dragon'),
      this.add.sprite(450, 180, 'dragon')
    ]
    this.dragons.forEach(dragon => {
      dragon.flipX = true
      dragon.setScale(0.6)
      dragon.y = 60 + Math.random() * 200
      dragon.speed = (2 + Math.random() * 2.3) * (Math.random() > 0.5 ? 1 : -1)
    })
    this.treasure = this.add.sprite(560, 180, 'treasure').setScale(0.5)
  }

  update () {
    function spriteCollide (s1, s2) {
      const r1 = s1.getBounds()
      const r2 = s2.getBounds()
      return Phaser.Geom.Intersects.RectangleToRectangle(r1, r2)
    }

    if (this.isOver) return

    if (this.input.activePointer.isDown) {
      this.player.x += 3
    }

    this.dragons.forEach(dragon => {
      if (dragon.y < 50 || dragon.y > 270) dragon.speed = -dragon.speed
      dragon.y += dragon.speed
      if (spriteCollide(this.player, dragon)) {
        return this.gameOver('Ouch!')
      }
    })

    if (spriteCollide(this.player, this.treasure)) return this.gameOver('You win!')
  }

  gameOver (msg) {
    const self = this
    this.isOver = true
    this.cameras.main.shake(500)
    this.cameras.main.fade(700)
    this.cameras.main.on('camerafadeoutcomplete', function () {
      self.scene.stop()
      self.scene.restart()
    })
  }
}
export default {
  width: 640,
  height: 360,
  physics: {},
  scene: [new GameScene()],
  callbacks: {
    preBoot: () => { console.log('preBoot callback') },
    postBoot: () => { console.log('postBoot callback') }
  }
}
