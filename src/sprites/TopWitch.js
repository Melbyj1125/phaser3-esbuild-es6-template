import Phaser from 'phaser'
import CONFIG from '../config.js'

class TopWitchSprite extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'witch', 1)
        this.setOrigin(0.5,1.0)
        
        if (!TopWitchSprite.animInitialized){
            TopWitchSprite.setupAnim(scene)
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

TopWitchSprite.animInitialized = false
TopWitchSprite.setupAnim = (scene) => {
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

    TopWitchSprite.animInitialized = true
}
export default TopWitchSprite