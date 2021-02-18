import TilemapScene from './TilemapScene'
import CONFIG from '../config.js'
import ScrollWitch from '../sprites/ScrollWitch'

class Stage1Scene extends TilemapScene {
    preload(){
        // load images
        this.load.image('background', 'assets/skies/space3.png')
        this.load.spritesheet('platformTiles', 'assets/tilesets/spritesheet_default.png', 
        { frameWidth: 64, frameHeight: 64})

        this.load.spritesheet('witch', 'assets/sprites/WitchWalk.png', 
        { frameWidth: 32, frameHeight: 32})
        //Load JSON data
        this.load.tilemapTiledJSON('mapData', 'assets/tilemaps/ExampleStage1.json')
    }

    create(){
        const background = this.add.image(0,0,'background')
        background.setOrigin(0,0)

        // Parse JSON into map
        this.parseTilemapJson('mapData')

        // Create any tilesets
        this.createTileset('PlatformPack', 'platformTiles')

        // Parse tile layers
        this.platformLayer = this.createTileLayer('Platform', true)
        this.blockLayer = this.createTileLayer('Blocks', true)

        // Parse object layers
        this.spikes = this.parseObjectLayer('Spikes','platformTiles', 90, {
            allowGravity: false,
            immovable: true,
            createCallback: (spike) => {
                spike.body.setSize(64,30)
                spike.body.setOffset(0,34)
            }
        })
        this.flag = this.parseObjectLayer('Flag','platformTiles',102, {
            allowGravity: false,
            immovable: true
        })

        background.setScale(
            this.mapData.widthInPixels / background.width,
            this.mapData.heightInPixel / background.height
        )

        this.witch = new ScrollWitch(this, 50,350)

        this.physics.add.collider(this.witch,this.platformLayer)
        this.physics.add.collider(this.witch,this.blockLayer)
        this.physics.add.collider(this.witch,this.spikes, this.spikeHit, null, this)
        this.physics.add.collider(this.witch,this.flag, this.goalTouch, null, this)

        this.cursors = this.input.keyboard.createCursorKeys()


    }

    spikeHit(){
        this.witch.reset(50,350)
    }

    goalTouch(){
        this.witch.goalMSG()
    }

    update(){
        const direction = {x: 0, y: 0}
        if (this.cursors.space.isDown){
            direction.y -= 1
        } 
        if(this.cursors.right.isDown) {
            direction.x += 1
        }
        if(this.cursors.left.isDown){
            direction.x -= 1
        }
        
        this.witch.move(direction.x, direction.y)
    }
}

export default Stage1Scene