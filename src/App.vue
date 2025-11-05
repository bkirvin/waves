<template>
  <router-view />
  <small v-show="route.path === '/'" id="version">{{ packageJson.version }}</small>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import packageJson from '../package.json' with { type: 'json' }
import orient from './game/orientation'

const route = useRoute()
const router = useRouter()

if (!process.env.DEV && orient.isDesktop()) router.push('/site')

//
</script>

<style>
#version {
  position: absolute;
  bottom: 1vh;
  left: 2vw;
  color: white;
  font-size: 2em;
}
</style>
