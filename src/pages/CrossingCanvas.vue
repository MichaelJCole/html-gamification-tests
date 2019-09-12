<template lang="pug">
div(
  @keydown.native="console.log"
)
  //- This is a HTML5 Canvas game that doesn't use Phaser or Vue
  canvas#myCanvas(
    width=900 
    height=500
  )

  p Move to the right, dodging the blocks with <- and -> arrows

</template>

<script>

class GameCharacter {
  constructor (x, y, width, height, color, speed, maxY) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color

    this.speed = speed
    this.dy = speed
    this.maxY = maxY
  }

  draw (ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  move (dx, dy) {
    this.x += dx
    this.y += dy
  }

  go () {
    // Bounce
    if (this.y < 0) this.dy = this.speed
    if (this.y > this.maxY - this.height) this.dy = -this.speed
    this.move(0, this.dy)
  }
}

class Game {
  constructor (ctx) {
    this.gameOver = false
    this.drawingContext = ctx
    this.screenWidth = ctx.canvas.width
    this.screenHeight = ctx.canvas.height
    this.controls = {
      dx: 0
    }

    this.player = new GameCharacter(150, 200, 50, 50, 'rgb(255,255,55)', 2, this.screenHeight)
    this.rectangles = [
      new GameCharacter(250, 50, 50, 50, 'rgb(0,0,255)', 2, this.screenHeight),
      new GameCharacter(450, 450, 50, 50, 'rgb(0,0,255)', 4, this.screenHeight),
      new GameCharacter(650, 150, 50, 50, 'rgb(0,0,255)', 3, this.screenHeight)
    ]
    this.goal = new GameCharacter(this.screenWidth - 50, 0, 50, this.screenHeight, 'rgb(255,255,55)')
  }

  keyDown(event) {
    switch(event.keyCode) {
      case 37:
        this.controls.dx = -1;
        break;
      case 39:
        this.controls.dx = 1;
        break;
    }
  }

  keyUp(event) {
    switch(event.keyCode) {
      case 37:
      case 39:
        this.controls.dx = 0;
        break;
    }
  }
  // Add event listeners
  setup() {
    // Listening to 
    this._saveKeyDown = this.keyDown.bind(this)
    this._saveKeyUp = this.keyUp.bind(this)
    window.document.addEventListener('keydown', this._saveKeyDown)
    window.document.addEventListener('keyup', this._saveKeyUp)
  }

  // Remove event listeners
  teardown() {
    window.document.removeEventListener('keydown', this._saveKeyDown)
    window.document.removeEventListener('keyup', this._saveKeyUp)
  }

  // Update game state
  update () {
    this.player.move(this.player.speed * this.controls.dx, 0)
    this.rectangles.forEach(r => {
      r.go()
    })
  }

  // Redraw the simulation
  draw () {
    // Clear the canvas
    this.drawingContext.clearRect(0, 0, this.screenWidth, this.screenHeight)
    // Draw the rectanges
    this.rectangles.forEach(rect => { rect.draw(this.drawingContext) })
    // Draw the Goal
    this.goal.draw(this.drawingContext)
    // Draw the player
    this.player.draw(this.drawingContext)
  }

  // Game loop
  step () {
    // Update the game
    this.update()
    this.draw()
    this.checkEnd()
    if (!this.gameOver) window.requestAnimationFrame(this.step.bind(this)) // https://stackoverflow.com/questions/6065169/requestanimationframe-with-this-keyword
  }

  // Check if the game has ended
  checkEnd () {
    // Already done
    if (this.gameOver) return

    // Win
    if (this.checkCollision(this.goal, this.player)) this.endGame('You Win!')

    // Lose
    this.rectangles.forEach(rect => {
      if (this.checkCollision(rect, this.player)) this.endGame('Game over!')
    })
  }

  // End the game and start over
  endGame (msg) {
    this.gameOver = true
    alert(msg)
    // Yes this is a hack.
    window.location = 'crossing-canvas'
  }

  checkCollision (r1, r2) {
    let xOver = Math.abs(r1.x - r2.x) <= Math.max(r1.width, r2.width)
    let yOver = Math.abs(r1.y - r2.y) <= Math.max(r1.height, r2.height)
    return xOver && yOver
  }
}

export default {
  data () {
    return {
      game: false
    }
  },
  mounted () {
    // tell game where to draw
    if (!this.game || this.game.gameOver) this.game = new Game(this.$el.querySelector('#myCanvas').getContext('2d'))

    // Setup controls
    this.game.setup()

    // start the game loop
    this.game.step()
  },
  methods: {
    move (direction) {
      if (this.game) this.game.controls.dy = direction
      console.log(direction)
    }
  },
  destroyed() {
    this.game.teardown()
  }
}
</script>

<style>
canvas {
  border: solid 2px purple;
  background-color: green;
  width: 100%;
  height: 80vh;
}
</style>
