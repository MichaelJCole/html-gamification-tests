/** 
 * This is dead code I was using to work around WebPack packaging assets as inline data
 */

export default quasarPhaser(phaser) {
  phaser.load = Object.assign(phaser.load, {
    // https://supernapie.com/blog/loading-assets-as-data-uri-in-phaser-3/
    webpackImage (key, url, xhr) {
      if (!url) throw new Error('object parameter not supported')
      if (url.indexOf('data:') === 0) {
        if (!phaser.textures.list[key]) return phaser.textures.addBase64(key, url) // add string directly to texture cache if webpack changed to data uri
      } else {
        return phaser.load.image(key, url, xhr) // elsewise, add through XHR
      }
    },
    webpackSpritesheet(key, url, config, xhr) {
      if (!url) throw new Error('object parameter not supported')
      if (url.indexOf('data:') === 0) {
        var img = new Image();
        img.onload = () => {
          phaser.textures.addSpriteSheet(key, img, config);
        };
        img.src = shardsSrc;
      } else {
        return phaser.load.spritesheet(key, url, config, xhr) // elsewise, add through XHR
      }
    },
    webpackAudioSprite(key, jsonUrl, audioUrl, audioConfig, audioXhr, jsonXhr) {
      if (!jsonUrl) throw new Error('object parameter not supported')
      if (audioUrl.indexOf('data:') === 0) {
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtx.decodeAudioData(toArrayBuffer(sfxSrc), (buffer) => {
          phaser.cache.audio.add(key, buffer);
        }, (e) => { console.log("Error with decoding audio data" + e.err); });
      } else {
        return phaser.load.audioSprite(key, jsonUrl, audioUrl, audioConfig, audioXhr, jsonXhr) // elsewise, add through XHR
      }
    }
  )
}
