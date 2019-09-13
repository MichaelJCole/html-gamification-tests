# HTML Gamification Tests

I'm interested in gamifying productivity applications, and wanted to get my hands into some attempts.

The goal was to use Quasar/Vue as the framework for a productivity app, and gamify it.

This project is an engineering journal of those attempts.

What I learned is you don't need a game engine to make a game, unless you need an asset pipeline or a physics engine.

## HearthClone (Vue + Howler + requestAnimationFrame())

I converted this [codepen](https://codepen.io/jackrugile/pen/zqJdXM) to [Vue components](https://vuejs.org/v2/guide/components.html) and integrated [Howler](https://howlerjs.com/) to play the sounds.

This is a fun example of how little interaction (click to flip and drag to whoosh) can gamify an experience.  The sparkle sound sells the magic.

## Crossing (HTML5 Canvas)

A tiny game build on a canvas without any game engine.  The simplest thing that could possibly work.  I built this from a tutorial I lost.

This is proof you don't need a game engine to write a game, and a demonstration of what a game engine offers - an asset pipeline.

From here moved forward working with Phaser.io and attempting to integrate it with Quasar.

## Crossing, Virtual Pet, Spanish, and Monster Kong (Phaser.io)

I built these from a Phaser.io course, then attempted to integrate them with Vue and Quasar.

Unfortunately Phaser.io is focused on Cordova (mobile) development and is super not into Webpack.  Some glue code and settings fiddling later, I hit commit and moved on.  You can see some of that integratino work here:

```
src/components/vue-phaser.vue - a Vue component to wrap Phaser
src/lib/quasarPhaser.js  -  monkey patching the asset loaders
```

My goal was gamify a Vue productivity app and in the end, Phaser.io wasn't needed - not because it's bad, but because it's to heavy.