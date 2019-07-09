export default class SpriteButton extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, spriteKey, callback) {
    super(scene, x, y, 'multiatlas', `${spriteKey}_rest.png`);
    this.spriteKey = spriteKey
    this.setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.enterButtonHoverState();
        callback();
      })
      .setOrigin(0.5)
  }

  enterButtonHoverState() {
    this.setFrame(`${this.spriteKey}_hover.png`);
  }

  enterButtonRestState() {
    this.setFrame(`${this.spriteKey}_rest.png`);
  }

  enterButtonActiveState() {
    this.setFrame(`${this.spriteKey}_active.png`);
  }

  enterButtonDisabledState() {
    this.setFrame(`${spriteKey}_disabled.png`);
  }
}