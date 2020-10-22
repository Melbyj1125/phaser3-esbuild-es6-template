import Phaser from 'phaser'
import CONFIG from '../config.js'

// Witch sprite object that adds itself to the given scene
class WitchSprite extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y) {
    // Pass parameters to parent's constructor
    super(scene, x, y, 'witch', 1)

    // Initialize animation info if it hasn't been already
    if (!WitchSprite.animInitialized) {
      WitchSprite.setupAnim(scene)
    }

    // Add self to the given scene
    scene.add.existing(this)
  }
}

// Sprite animation configuration as static members
// of the WitchSprite class
WitchSprite.animInitialized = false
WitchSprite.setupAnim = (scene) => {
  // Create the animations using the global anim controller
  scene.anims.create({
    key: 'witchWalkDown',
    frameRate: 10,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('witch', { start: 0, end: 7 })
  })

  scene.anims.create({
    key: 'witchWalkUp',
    frameRate: 10,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('witch', { start: 8, end: 15 })
  })

  scene.anims.create({
    key: 'witchWalkHoriz',
    frameRate: 10,
    repeat: -1,
    frames: scene.anims.generateFrameNumbers('witch', { start: 16, end: 23 })
  })

  // Indicate that the animation has been setup
  WitchSprite.animInitialized = true
}

// Export class for access in other classes
export default WitchSprite
