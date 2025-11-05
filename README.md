# waves
git hub game off submission

# PWA Manifest
## Orientation
quasar.config.js is setting orientation lock to landscape in this template. Use 'landscaepe', 'portrait', or 'any' as needed.

```
extendManifestJson (json) {
    json.orientation = 'landscape'
}
```

This orientation lock will only be enforced on Android devices. Apple devices do not support this PWA manifest setting and will display a notice to orient device to the game's proper orientation, but the orientation will not be locked when the device is reoriented.

```
src/game/main.js

import orient from 'path/to/orientation.js'

orient.setOrientation('landscape')
```


