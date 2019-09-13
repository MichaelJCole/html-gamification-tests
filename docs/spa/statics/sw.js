importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/8b6ae3d91a040f81bbc2.js",
    "revision": "835835327aa76beefddaaa8705f7731c"
  },
  {
    "url": "/_nuxt/ae99ec40c1e9ce3a553f.js",
    "revision": "907b06810c709863242b3fe5cd11196f"
  },
  {
    "url": "/_nuxt/d1a28068a417477a344f.js",
    "revision": "581aee656ca6650f49a5df10b34897d7"
  },
  {
    "url": "/_nuxt/daae159d613288a33f50.js",
    "revision": "99b1faff28640e2c4ff8dcc5617378ce"
  },
  {
    "url": "/_nuxt/dd54c2ee2c74f85c30df.js",
    "revision": "aa8779c496e5c66fbdc591cfacf7dc6f"
  },
  {
    "url": "/_nuxt/f117b92413d9d0ec16d4.js",
    "revision": "c84e0245361391bef5ae14f3e12a280c"
  }
], {
  "cacheId": "proto3",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
