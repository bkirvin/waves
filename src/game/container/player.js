import { GameObjects } from 'phaser'

export default class Player extends GameObjects.Container {
  constructor (scene, data) {
    super(scene, data.x, data.y)
    scene.add.existing(this)
    this.addToUpdateList()

    scene.physics.add.existing(this)
    this.body
      .setCollideWorldBounds(true)
      .setSize(32, 32)
      .setBounce(1)
    this.body.allowGravity = true

    this.add(this.bottom)
    this.add(this.top)
  }

  preUpdate (/* time, delta */) {
    // pre update logic
  }
}
