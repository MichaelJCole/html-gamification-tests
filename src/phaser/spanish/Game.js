// create a new scene
import Phaser from 'phaser'


export default class HomeScene extends Phaser.Scene {
  constructor () {
    super('Home')
  }

  init () {
    this.words = [
      {
        key: 'building',
        setXY: { x: 100, y: 240 },
        spanish: 'edificio'
      }, {
        key: 'house',
        setXY: { x: 240, y: 280 },
        setScale: { x: 0.8, y: 0.8 },
        spanish: 'casa'
      }, {
        key: 'car',
        setXY: { x: 400, y: 300 },
        setScale: { x: 0.8, y: 0.8 },
        spanish: 'automovil'
      }, {
        key: 'tree',
        setXY: { x: 550, y: 280 },
        spanish: 'arbol'
      }
    ]
  }

  // executed once, after assets were loaded
  create () {

    this.background = this.add.sprite(0, 0, 'background').setOrigin(0)

    this.items = this.add.group(this.words)
    this.items.setDepth(1)

    this.items.getChildren().forEach(function(item, index){
      item.setInteractive()
      item.correctTween = this.tweens.add({
        targets: item,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 300,
        paused: true,
        yoyo: true
      })
      item.wrongTween = this.tweens.add({
        targets: item,
        angle: 90,
        duration: 300,
        paused: true,
        yoyo: true
      })
      item.on('pointerdown', function(pointer) {
        if (this.checkAnswer(this.words[index].spanish)) {
          this.correct.play()
          item.correctTween.play()
        } else {
          this.wrong.play()
          item.wrongTween.play()
        }
        this.showNextQuestion()
      }, this)

      item.alphaTween = this.tweens.add({
        targets: item,
        alpha: 0.7,
        duration: 300,
        paused: true,
      })
      item.on('pointerover', function(pointer) {
        item.alphaTween.play()
      }, this)
      item.on('pointerout', function(pointer) {
        item.alphaTween.stop()
        item.alpha = 1
      }, this)

      this.words[index].sound = this.sound.add(this.words[index].key)

    }, this)

    this.wordText = this.add.text(30,20, 'hello', {
      font: '86px Open Sans',
      fill: 'white'
    })

    this.correct = this.sound.add('correct')
    this.wrong = this.sound.add('wrong')

    this.showNextQuestion()
  }

  //let sample = this.sound.add('correct').play()
  showNextQuestion() {
    // select word
    this.word = Phaser.Math.RND.pick(this.words)

    // play sound
    this.word.sound.play()

    // show word
    this.wordText.setText(this.word.spanish)
  }

  checkAnswer(userResponse) {
    return userResponse === this.word.spanish
  }
}

