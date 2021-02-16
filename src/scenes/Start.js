import Phaser from 'phaser'
import CONFIG from '../config.js'

import Witch from '../sprites/Witch.js'
class StartScene extends Phaser.Scene {
  init () {
    this.loadingText = this.add.text(
      CONFIG.DEFAULT_WIDTH / 2,
      CONFIG.DEFAULT_HEIGHT / 2,
      'Loading ...', { font: '16pt Arial', color: '#FFFFFF', align: 'center' }
    )
    this.loadingText.setOrigin(0.5, 0.5)
  }

  preload () {
    // Load the image assets needed for THIS scene
    this.load.image('StartScreen', 'assets/StartScreen.png')

    // Load the image assets needed for 'ExampleScene'
    this.load.image('sky', 'assets/skies/space3.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('red', 'assets/particles/red.png')

    // Loads spritesheets animations
    this.load.spritesheet('witch', 'assets/sprites/WitchWalk.png', 
    { frameWidth: 32, frameHeight: 32})
    this.load.spritesheet('slime', 'assets/sprites/Slime.png', 
    { frameWidth: 32, frameHeight: 42})

    // Pre-load the entire audio sprite
    this.load.audioSprite('gameAudio', 'assets/audio/gameAudioSprite.json', [
      'assets/audio/gameAudioSprite.ogg',
      'assets/audio/gameAudioSprite.m4a',
      'assets/audio/gameAudioSprite.mp3',
      'assets/audio/gameAudioSprite.ac3'
    ])

    // DEBUG: Fake loading lots of data
    for (let i = 0; i < 300; i++) {
      this.load.image('sky' + i, 'assets/skies/space3.png')
    }
  }

  create () {
    // Remove loading text
    this.loadingText.destroy()

    // Add background image
    const startScreen = this.add.image(CONFIG.DEFAULT_WIDTH / 2, CONFIG.DEFAULT_HEIGHT / 2, 'StartScreen')
    startScreen.setScale(
      CONFIG.DEFAULT_WIDTH / startScreen.width,
      CONFIG.DEFAULT_HEIGHT / startScreen.height
    )

    // Add a callback when a key is released
    this.input.keyboard.on('keyup', this.keyReleased, this)

    //slime animations
    this.anims.create({
      key: 'slimeAnim',
      frameRate: 5, 
      repeat: -1,
      frames: this.anims.generateFrameNumbers('slime', {start: 0, end: 3})
    })

    //add a sprite
    this.witch1 = new Witch(this, 100, 100)


    this.slime = this.add.sprite(300,300, 'slime', 1)

    // start animation


    this.slime.anims.play('slimeAnim')

    // Load and play background music
    this.music = this.sound.addAudioSprite('gameAudio')
    //this.music.play('freeVertexStudioTrack1')

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update(){
    let direction = { x:0, y:0}
    if (this.cursors.right.isDown) {
      direction.x += 1
    }
    if (this.cursors.left.isDown) {
      direction.x -= 1
    }
    if (this.cursors.up.isDown) {
      direction.y -= 1
    }
    if (this.cursors.down.isDown) {
      direction.y += 1
    }
    this.witch1.move(direction.x, direction.y)
  }

   keyReleased () {
    // console.log('Key released')
    // this.scene.start('Stage1')
    // this.music.stop()
   }
}

export default StartScene
