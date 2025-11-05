let emit
const config = (scene) => {
  return {
    name: 'burst',
    texture: 'petal',
    speed: { min: 100, max: 600 },
    frequency: 50,
    alpha: { start: 1, end: 0 },
    scale: 1,
    quantity: 20,
    rotate: {
      onEmit: () => {
        return 0
      },
      onUpdate: (particle) => {
        return particle.angle + ((Math.random() * 30) + 1)
      }
    },
    follow: scene.daisy,
    gravityY: -1200,
    gravityX: -1200,
    lifespan: { min: 500, max: 3000 },
    emitting: false
  }
}

const beePop = scene => {
  return {
    texture: 'petal',
    gravityY: 1200,
    emit: true,
    scale: 2,
    color1: 0x000000,
    color2: 0xffff00,
    tint: {
      onEmit: () => {
        return Math.random() < 0.5 ? 0x000000 : 0xffff00
      }
    },
    x: scene.player.x,
    y: scene.player.y,
    follow: null
  }
}

const bump = scene => {
  return {
    texture: 'star',
    x: scene.player.x,
    y: scene.player.y,
    follow: null,
    gravityY: 1200,
    lifespan: 250,
    quantity: 5,
    scale: 1
  }
}

const getOverride = (name, scene) => {
  switch (name) {
    case 'beePop':
      return beePop(scene)
    case 'bump':
      return bump(scene)
  }
}

export default {
  emit: (scene, data) => {
    emit = scene.add.particles(0, 0, data ? data.texture || 'petal' : 'petal', config(scene, data))
    return emit
  },
  control (scene) {
    const resetConfig = {...config(scene)}
    emit.setConfig(resetConfig)
    return emit
  },
  getConfig (scene, data) {
    const override = {...config(scene), ...getOverride(data, scene)}
    return override
  },
  resize () {
    emit.setPosition(emit.scene.GameWidthCenter, 1)
    return emit
  }
}
