<template>
  <game-installer />
  <div id="game-container" style="width: 100vw; height: 100vh;"></div>
  <!-- <pre>{{ data }}</pre> -->

  <game-orientation :unMatched :showResume @resuming="resumeScene" />
</template>

<script setup>
// import Phaser from 'phaser'
import { onMounted, onUnmounted, ref } from 'vue'
import { EventBus } from './EventBus'
import GameOrientation from 'src/components/GameOrientation.vue'
import GameInstaller from 'src/components/GameInstaller.vue'
import StartGame from './main'
import gameConfig from './phaser.config'

// Save the current scene instance
const scene = ref()
const game = ref()
const unMatched = ref(false)
const showResume = ref(false)
const orientation = gameConfig.orientation

const emit = defineEmits(['current-active-scene'])

const checkOrientation = (query) => {

  if (query.matches) {
    unMatched.value = false
  } else {
    unMatched.value = true
    if (!scene.value.scene.isPaused()) scene.value.scene.pause()
    showResume.value = true
  }
}

const resumeScene = () => {
  scene.value.scene.resume()
  showResume.value = false
}

onMounted(() => {

  game.value = StartGame('game-container')

  EventBus.on('current-scene-ready', (currentScene) => {

    emit('current-active-scene', currentScene)

    scene.value = currentScene
    const query = window.matchMedia(`(orientation: ${orientation})`)
    query.addEventListener('change', checkOrientation)
    checkOrientation(query)

  })

})

onUnmounted(() => {

  if (game.value)
  {
    game.value.destroy(true)
    game.value = null
  }

})

defineExpose({ scene, game, unMatched, orientation, showResume })
</script>

<style scoped>
h2 {
  margin: 50vh 0 0;
  transform: translate(0, -50%);

}
.disablePlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  text-align: center;
  color: white;
}
pre {
  background-color: black;
  position: absolute;
  top: 0;
  right: 0;
  color: white;
}
</style>
