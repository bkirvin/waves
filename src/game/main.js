import { Boot } from './scenes/Boot'
// import { Game } from './scenes/Game'
// import { GameOver } from './scenes/GameOver'
import { PlayScene } from './scenes/PlayScene'
import Phaser from 'phaser'
import { Preloader } from './scenes/PreLoader'
import orient from './orientation'
import phaserConfig from './phaser.config'

orient.setOrientation(phaserConfig.orientation)
const gameWidth = orient.getWidth()
const gameHeight = orient.getHeight()

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: gameWidth,
    height: gameHeight
  },
  parent: 'game-container',
  backgroundColor: '#028af8',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 2000
      },
      checkCollision: {
        up: false,
        left: false,
        right: false,
        down: true
      },
      debug: false
    }
  },
  scene: [
    Boot,
    Preloader,
    PlayScene
    // Game,
    // GameOver
  ]
}

const StartGame = (parent) => {

  return new Phaser.Game({ ...config, parent })
}

export default StartGame
