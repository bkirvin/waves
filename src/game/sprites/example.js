import { GameObjects } from 'phaser'

export default class Blink extends GameObjects.Sprite {
  constructor (scene, data) {
    super(scene, data.x, data.y, data.texture)

    // //////////////////// add physics
    // scene.physics.add.existing(this)
    // this.body
    //   .setCollideWorldBounds(true)
    //   .setSize(32, 32)
    //   .setBounce(1)
    // this.body.allowGravity = true


    // /////////////// create anims
    // this.anims.create({
    //   key: 'anim1',
    //   frames: this.anims.generateFrameNumbers('keyName', { start: 0, end: 19 }),
    //   frameRate: 30,
    //   repeat: -1
    // })

    // add to scene
    scene.add.existing(this)

    // // //////////////////// play anim
    // this.play('anim1')
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta)
    // update logic
  }

  remove () {
    this.kill()
  }

  kill () {
    this.destroy()
  }
}
