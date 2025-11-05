import { Scale } from 'phaser'
import { EventBus } from '../EventBus'
import { Scene } from 'phaser'
import orient from '../orientation'
import Mitter from '../emitters'

export class PlayScene extends Scene {

  constructor () {
    super('PlayScene')
  }

  create () {
    this.setGameDimensions(this.scale.gameSize)
    this.input.addPointer(1)

    this.scale.on('resize', this.resize, this)

    // this.scale.on('resize', this.resize, this)

    this.sceneObjects = []

    this.bg = this.add.image(this.GameWidthCenter, this.GameHeightCenter, 'background')
    this.bg.setDisplaySize(this.GameWidth, this.GameHeight)

    this.physics.world.setBounds(0, 0, this.GameWidth, this.GameHeight, false, false, false, true)

    this.physics.world.on('worldbounds', this.handleWorldBounds, this)

    this.input.on('pointerdown', (pointer, gameObjects) => {
      for (const object of gameObjects) {
        if (object === this.player) {
          // logic
        }
        if (object === this.enemy) {
          // logic
        }
      }
    })

    this.input.on('pointerup', (pointer, gameObjects) => {
      for (const object of gameObjects) {
        if (object === this.fly) {
          this.player.buzzing = false
        }
        if (object === this.lift) {
          this.player.lifting = false
        }
      }
    })

    EventBus.emit('current-scene-ready', this)
  }

  catchFlower (bee, flower) {
    if (flower.alpha) {
      Mitter('burst', this).explode()
      flower.setAlpha(0)
    }

  }

  handleWorldBounds (body) {
    if (body) {
      // physics collision with world logic
    }

  }

  setGameDimensions (gameSize) {
    this.GameWidth = gameSize.width
    this.GameHeight = gameSize.height
    this.GameWidthCenter = gameSize.width * 0.5
    this.GameHeightCenter = gameSize.height * 0.5
  }

  changeScene ()
  {

    this.scene.start('Game')
  }

  switchScale () {
    this.scale.setGameSize(orient.getWidth(), orient.getHeight())
    switch (orient.getName()) {
      case 'landscape':
        this.scale.mode = Scale.WIDTH_CONTROLS_HEIGHT
        break
      case 'portrait':
        this.scale.mode = Scale.HEIGHT_CONTROLS_WIDTH
        break
      default:
        if (window.innerWidth > window.innerHeight) {
          this.scale.mode = Scale.HEIGHT_CONTROLS_WIDTH
        } else {
          this.scale.mode = Scale.WIDTH_CONTROLS_HEIGHT
        }
        if (!this.scene.isPaused) this.scene.pause()
    }
    this.scale.refresh()
  }

  resize (gameSize) {
    if (gameSize && gameSize.width) {
      let { width, height } = gameSize
      const xRatio = width / this.GameWidth
      const yRatio = height / this.GameHeight
      this.sceneObjects.forEach(object => {
        const { x, y } = object
        object.setPosition(x * xRatio, y * yRatio)
      })
      this.bg.setDisplaySize(width, height)
      this.cameras.resize(width, height)
      this.setGameDimensions({ width, height })
      this.physics.world.setBounds(0, 0, width, height)
      this.bg.setPosition(width * 0.5, height * 0.5)
    }
  }

  update () {
    // update logic
  }
}
