import TilemapScene from './TilemapScene.js'
import CONFIG from '../config.js'

class Stage1Scene extends TilemapScene {
    preload(){
        // load images
        this.load.image('background', 'assets/skies/space3.png')
        this.load.spritesheet('platformTiles', 'assets/tilesets/spritesheet_default.png', 
        { frameWidth: 64, frameHeight: 64})

        //Load JSON data
        this.load.tilemapTiledJSON('mapData', 'assets/tilemaps/ExampleStage1.json')
    }

    create(){
        // Parse JSON into map

        // Create any tilesets

        // Parse tile layers

        // Parse object layers
    }
}