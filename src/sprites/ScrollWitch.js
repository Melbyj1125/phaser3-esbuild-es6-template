import Phaser from 'phaser'
import CONFIG from '../config.js'

class ScrollWitchSprite extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'witch', 1)

        if (!ScrollWitchSprite.animInitialized){
            ScrollWitchSprite.setupAnim(scene)
        }

        // Enable physics
        scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY)
        this.setImmovable(true)
        this.body.setCollideWorldBounds(true)

        // Add self to the given scene
        scene.add.existing(this)
    }

    reset (x,y) {
        this.setVelocity(0,0)
        this.setPosition(x,y)
        this.anims.play('witchStill', true)

        this.setAlpha(0)
        this.resetTween = this.scene.tweens.add({
            targets: this,
            alpha:1,
            duration: 100,
            ease: 'Linear',
            repeat: 5
        })
    }

    goalMSG () {
        console.log('You have touched the goal');
    }

    move (x, y){
        if (Math.abs(x) > 0) {
            if (this.body.onFloor()){
                this.anims.play('witchWalkHor',true)
            }
            this.setFlipX(x<0)
            this.setVelocityX(x * CONFIG.WALK_SPEED)
        }else{
            if(this.body.onFloor()) {
                this.anims.play('witchStill', true)
                this.setVelocityX(0)
            }
        }

        if(y < 0 && this.body.onFloor()){
            this.anims.play('witchWalkUp', true)
            this.setVelocityY(y * CONFIG.JUMP_SPEED)
        }
        
        
    }
}

ScrollWitchSprite.animInitialized = false
ScrollWitchSprite.setupAnim = (scene) => {
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

    ScrollWitchSprite.animInitialized = true
}
export default ScrollWitchSprite