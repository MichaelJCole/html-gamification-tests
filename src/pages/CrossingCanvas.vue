<template lang="pug">
div.stuff
  //- This is a HTML5 Canvas game that doesn't use Phaser or Vue
  canvas#myCanvas(width="1000" height="500")
  p on this game, use left and right arrows.

</template>

<script>

let gameOver = false;
let ctx;
let screenWidth = 1000;
let screenHeight = 500;

const control = {
  dx: 0,
}

export default {
  mounted() {
    ctx = this.$el.querySelector('#myCanvas').getContext('2d');

    class GameCharacter {
      constructor(x, y, w, h, c, s) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = c;

        this.s = s;
        this.dy = s;
      }

      draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }

      move(dx, dy) {
        this.x += dx
        this.y += dy
      }

      go() {
        // Bounce
        if (this.y < 0) this.dy = this.s
        if (this.y > screenHeight -50) this.dy = -this.s
        this.move(0, this.dy)
      }
    }

    let player = new GameCharacter(150, 200, 50, 50, 'rgb(0,255,255)', 2);
    let rectangles = [
      new GameCharacter(250, 50, 50, 50, 'rgb(0,0,255)', 2),
      new GameCharacter(450, 450, 50, 50, 'rgb(0,0,255)', 4),
      new GameCharacter(650, 150, 50, 50, 'rgb(0,0,255)', 3)
    ]
    let goal = new GameCharacter(screenWidth-50, 0, 50, screenHeight, 'rgb(0,255,55)', 2);

    function update() {
      player.move(player.s * control.dx, 0)
      rectangles.forEach(r => {
        r.go()
      })
    }

    function draw() {
      ctx.clearRect(0, 0, screenWidth, screenHeight)
      rectangles.forEach(rect => { rect.draw(ctx) });
      player.draw(ctx)
    }

    function step() {
      update()
      draw()
      check()
      if (!gameOver) window.requestAnimationFrame(step)
    }
    step();

    // controls
    document.onkeydown = function(event) {
      switch(event.keyCode) {
        case 37:
          control.dx = -1;
          break;
        case 39:
          control.dx = 1;
          break;
      }
    }

    document.onkeyup = function(event) {
      switch(event.keyCode) {
        case 37:
        case 39:
          control.dx = 0;
          break;
      }
    }

    function check() {
      // Win
      if (checkCollision(goal, player)) endGame('You Win!');

      // Lose
      rectangles.forEach(rect => {
        if (checkCollision(rect, player)) endGame('Game over!');
      })
    }

    function endGame(msg) {
      alert(msg);
      gameOver = true;
      window.location = "crossing-canvas";
    }

    function checkCollision(r1, r2) {
      let xOver = Math.abs(r1.x - r2.x) <= Math.max(r1.width, r2.width)
      let yOver = Math.abs(r1.y - r2.y) <= Math.max(r1.height, r2.height)
      return xOver && yOver
    }
  }
}
</script>

<style>
canvas {
  border: solid 2px purple;
  background-color: green;
}
</style>