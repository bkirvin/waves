import burst from './burst'
import smoke from './smoke'

const emitters = {
  burst,
  smoke
}

export default function (emitter, scene, action, data) {
  switch (action) {
    case 'create':
      return emitters[emitter].emit(scene, data)
    case 'resize':
      emitters[emitter].resize(scene)
      break
    case 'override':
      return emitters[emitter].getConfig(scene, data)
    default:
      return emitters[emitter].control(scene)
  }
}

export const destroy = function (emitter) {
  emitters[emitter].destroy()
}
