# HTML Game Tests

I'm interested in gamifying productivity applications, and wanted to get my hands dirty on some attempts.

The goal was to use Quasar/Vue as the wrapper, and create mini games inside it.

This project is an engineering journal of those attempts.  

## HearthClone (Vue + Howler + requestAnimationFrame())

I converted this [codepen](https://codepen.io/jackrugile/pen/zqJdXM) to Vue components and integrated [Howler](https://howlerjs.com/) to play the sounds.

This is a fun example of how little interaction (click to flip and drag to whoosh) can gamify an experience.  The sparkle sound sells the magic.

## Crossing (HTML5 Canvas)

A trivial game on a canvas built from a tutorial I lost.

Proof you don't need a game engine to write a game!

From here I attempted to integrate Phaser.io and Quaser.

## Crossing, Virtual Pet, Spanish, and Monster Kong (Phaser.io)

I built these from a course, then attempted to integrate them with Vue and Quasar.

Unfortunately Phaser.io is focused on Cordova (mobile) development and is super not into Webpack.  Some glue code and settings fiddling later, I hit commit and moved on.  You can see some of that work here:

```
src/components/vue-phaser.vue - a Vue component to wrap Phaser
src/lib/quasarPhaser.js  -  monkey patching the asset loaders
```

My goal was gamify a Vue productivity app and in the end, Phaser.io wasn't needed.