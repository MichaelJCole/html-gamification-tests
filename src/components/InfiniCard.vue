<!-- 
WTF? https://codepen.io/jackrugile/pen/zqJdXM 
Flip: https://css3playground.com/3d-flip-cards/
-->

<template lang="pug">
  .infini-card.nodrag(:class="{ 'show-back': gameState.showBack }")
    .flipper.nodrag
      img.front.nodrag(:src="cardState.front" draggable="false")
      img.back.nodrag(:src="cardState.back" draggable="false")
</template>

<script>
export default {
  props: {
    showBack: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      /* state saved/passed from the server */
      cardState: {
        theme: 'hearthstone',
        front: '/statics/hearthstone-ragnaros.png',
        back: '/statics/hearthstone-back.png'
      },
      /* state locally in the browser */
      gameState: {
        showBack: true,
        cardx: 100,
        cardy: 100
      }
    }
  },
  mounted() {
    const self = this
    const gs = self.gameState

    // const sc = self.cardState

    const card = this.$el
    const flipper = card.querySelector('.flipper')
    const img = flipper.querySelector('.front')

    const cardw = img.width
    const cardh = img.height
    let ww, wh
    onresize()
    gs.cardx = ww / 2 - cardw / 2
    gs.cardy = wh / 2 - cardh / 2

    let ocardx = gs.cardx
    let ocardy = gs.cardy
    let pinx = 0
    let piny = 0
    let pinxperc = 0
    let pinyperc = 0
    let targetx = gs.cardx
    let targety = gs.cardy
    let rx = 0
    let ry = 0
    let targetrx = 0
    let targetry = 0
    let scale = 1
    let targetscale = scale
    let md = false
    let mx = gs.cardx
    let my = gs.cardy

    bindevents()
    loop()

    function onresize() {
      ww = window.innerWidth
      wh = window.innerHeight
    }

    function touchHandler(event) {
      if (!event) return
      const touches = event.changedTouches
      const first = touches[0]
      let type = ''
      switch (event.type) {
        case 'touchstart':
          type = 'mousedown'
          break
        case 'touchmove':
          type = 'mousemove'
          break
        case 'touchend':
          type = 'mouseup'
          break
        default:
          return
      }

      // initMouseEvent(type, canBubble, cancelable, view, clickCount,
      //                screenX, screenY, clientX, clientY, ctrlKey,
      //                altKey, shiftKey, metaKey, button, relatedTarget);

      const simulatedEvent = document.createEvent('MouseEvent')
      simulatedEvent.initMouseEvent(
        type,
        true,
        true,
        window,
        1,
        first.screenX,
        first.screenY,
        first.clientX,
        first.clientY,
        false,
        false,
        false,
        false,
        0 /* left */,
        null
      )

      first.target.dispatchEvent(simulatedEvent)
    }

    function onmousedown(e) {
      md = true
      mx = e.layerX // pageX
      my = e.layerY // pageY
      pinx = cardw / 2 // pin to center
      piny = cardh / 2
      // pinx = mx - cardx // pin to click point
      // piny = my - cardy // pin to click point
      pinxperc = 100 - (pinx / cardw) * 100 // transform based on the pin position
      pinyperc = 100 - (piny / cardh) * 100 // transform based on the pin position
    }

    function onmouseup() {
      // This event happens on window
      if (md) gs.showBack = false
      md = false
    }

    function onmousemove(e) {
      // This event happens on window
      if (md) {
        mx = e.layerX
        my = e.layerY
      }
    }

    function bindevents() {
      flipper.addEventListener('touchstart', touchHandler)
      window.addEventListener('touchend', touchHandler)
      window.addEventListener('touchmove', touchHandler)

      flipper.addEventListener('mousedown', onmousedown)
      window.addEventListener('mouseup', onmouseup)
      window.addEventListener('mousemove', onmousemove)

      window.addEventListener('resize', onresize)
    }

    function loop(time) {
      window.requestAnimationFrame(loop)

      // set new target position
      targetx = mx - gs.cardx - pinx
      targety = my - gs.cardy - piny

      // lerp to new position
      gs.cardx += targetx * 0.25
      gs.cardy += targety * 0.25

      // contain card to window bounds
      if (gs.cardx < -cardw / 2) gs.cardx = -cardw / 2
      if (gs.cardx > ww - cardw / 2) gs.cardx = ww - cardw / 2
      if (gs.cardy < -cardh / 2) gs.cardy = -cardh / 2
      if (gs.cardy > wh - cardh / 2) gs.cardy = wh - cardh / 2

      // get rotation based on how much card moved
      targetrx = (ocardy - gs.cardy - rx) * 3
      targetry = (gs.cardx - ocardx - ry) * 3

      // lock rotation so things don't get too crazy
      targetrx = Math.min(targetrx, 90)
      targetrx = Math.max(targetrx, -90)
      targetry = Math.min(targetry, 90)
      targetry = Math.max(targetry, -90)

      // lerp to new rotation
      rx += targetrx * 0.1
      ry += targetry * 0.1

      // scale up when the mouse is pressed
      targetscale = md ? 1.2 - scale : 1 - scale
      scale += targetscale * 0.2

      // apply the transform
      card.style.transform =
        'translate3d(' + gs.cardx + 'px, ' + gs.cardy + 'px, 0)'
      card.style['transform-origin'] = pinxperc + '% ' + pinyperc + '%'
      flipper.style.transform =
        'scale(' +
        scale +
        ') rotateY(' +
        (ry + (gs.showBack ? 180 : 0)) +
        'deg) rotateX(' +
        rx +
        'deg)'

      // Sounds
      self.$emit('loop-volume', {
        name: 'sparkle',
        to: md ? 0.2 : 0
      })
      const distanceTravelled =
        Math.abs(ocardy - gs.cardy) + Math.abs(ocardx - gs.cardx)
      const screenWidth = window.innerWidth
      self.$emit('loop-volume', {
        name: 'whoosh',
        to: Math.min((distanceTravelled / screenWidth) * 3, 1)
      })

      // store the old card position
      ocardx = gs.cardx
      ocardy = gs.cardy
    }
    loop()
  }
}
</script>

<style lang="scss">
.infini-card {
  position: absolute;
  width: 250px;
  left: 0;
  top: 0;

  // clear bootstrap
  background-color: transparent;
  background-clip: none;
  border: none;
  margin: 0;
  padding: 0;

  // Animation stuff
  perspective: 400px;

  .flipper {
    //transition: transform 0.5s;
    transform-style: preserve-3d;
    will-change: transform;

    position: relative;
    min-height: 364px;
    .front,
    .back {
      display: block;
      pointer-events: none;

      backface-visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: 250px;
      height: 364px;
    }
    .front {
      z-index: 2;
      transform: rotateX(0deg);
    }
    .back {
      transform: rotateX(180deg) !important;
    }
  }
}
.nodrag {
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
