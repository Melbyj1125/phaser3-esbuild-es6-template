import Phaser from 'phaser'
import CONFIG from '../config.js'

class WitchSprite extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'witch', 1)

        if (!WitchSprite.animInitialized){
            WitchSprite.setupAnim(scene)
        }

        // Enable physics
        scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY)
        this.setImmovable(true)
        this.body.setAllowGravity(false)
        this.body.setCollideWorldBounds(true)

        // Add self to the given scene
        scene.add.existing(this)
    }

    move (x, y){
        if(Math.abs(x) > 0) {
            this.anims.play('witchWalkHor', true)
            if (x < 0) {
                this.setFlipX(true)
            }
            else {
                this.setFlipX(false)
            }
        } else{
            if (y < 0) {
                this.anims.play('witchWalkUp', true)
            }
            else if (y > 0) {
                this.anims.play('witchWalkDown', true)
            }
            else{
               this.anims.play('witchStill', true)
            }
        }
        this.setVelocity(x * CONFIG.WALK_SPEED, y * CONFIG.WALK_SPEED)
    }
}

WitchSprite.animInitialized = false
WitchSprite.setupAnim = (scene) => {
    console.log('Creating witch animation')

    scene.anims.create({
        key: 'witchStill',
        frameRate: 1,
        repeat: -1,
        frames: scene.anims.generateFrameNumbers('witch', { start: 1, end: 2})
    })

    scene.anims.create({
        key: 'witchWalkDown',
        frameRate: 10,
        repeat: -1,
        frames: scene.anims.generateFrameNumbers('witch', { start: 0, end: 7})
    })

    scene.anims.create({
        key: 'witchWalkUp',
        frameRate: 10,
        repeat: -1,
        frames: scene.anims.generateFrameNumbers('witch', { start: 8, end: 15})
    })

    scene.anims.create({
        key: 'witchWalkHor',
        frameRate: 10,
        repeat: -1,
        frames: scene.anims.generateFrameNumbers('witch', { start: 16, end: 23})
    })

    WitchSprite.animInitialized = true
}
export default WitchSprite