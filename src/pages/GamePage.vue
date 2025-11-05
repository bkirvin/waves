<template>
  <phaser-game  ref="phaserRef" @current-active-scene="currentScene"/>
</template>

<script setup>
import PhaserGame from '../game/PhaserGame.vue'
import { ref } from 'vue'

const phaserRef = ref()

const currentScene = (scene) => {
  // configure scene
  console.log('CURRENT SCENE', scene)
}

</script>

<style lang="scss">
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background-color: #333;
}
pre {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
