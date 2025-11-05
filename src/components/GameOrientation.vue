<template>
  <transition name="slideup">
    <div
      v-show="unMatched"
      class="reorient" >
      <q-icon
        size="xl"
        class="orient"
        :class="{ animicon: unMatched }"
        :name="iconName"/>
      <h5>{{ orientation.toUpperCase() }} orientation required to play</h5>
    </div>
  </transition>
  <q-btn
    v-show="showResume && config !== 'any'"
    round
    size="xl"
    class = "resume-btn"
    color="primary"
    icon="not_started"
    @click="resumeApp">
  </q-btn>

</template>

<script>
import { ref, computed } from 'vue'
import orient from 'src/game/orientation'

export default {
  emits: [
    'resuming'
  ],
  props: {
    unMatched: {
      type: Boolean,
      default: false
    },
    showResume: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const orientation = ref('any')
    const config = orient.getName()

    const iconName = computed(() => {
      const icon = 'stay_current_'
      if (orientation.value === 'landscape') return icon + 'portrait'
      return icon + 'landscape'
    })

    orientation.value = orient.getName()

    const resumeApp = () => {
      emit('resuming')
    }

    return {
      orientation,
      iconName,
      config,
      resumeApp
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  position: absolute;
  top: 2vh;
  left:2vh;
  z-index: 500;
}
.q-page-container {
  background-color: black;
}
.resume-btn {
  position: absolute;
  left: 90vw;
  top: 50vh;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.reorient {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: 100%;
  color: white;
  z-index: 10;
  text-align: center;
  padding: 40px;
  background-color: #222;
}
.animicon {
  animation-name: pulse;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.orient {
  font-size: 200px !important;
}

@keyframes pulse {
  from {color: rgba(0,0,0,0); transform: rotate(0deg);}
  to {color: orange; transform: rotate(90deg);}
}
.slideup-enter-active,
.slideup-leave-active {
  transition: bottom 0.5s ease;
}
.slideup-enter-from,
.slideup-leave-to {
  bottom: 100%;
}
</style>
