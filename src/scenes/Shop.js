import TopWitch from '../sprites/TopWitch.js'
import TilemapShopScene from './TilemapShopScene.js'


class ShopScene extends TilemapShopScene {
    preload(){
        // load images

        this.load.image('shopFloor', 'assets/tilesets/floor.png')
        this.load.image('shopFloorChest','assets/tilesets/chest.png')
        this.load.image('shopFloorCrate1','assets/tilesets/Crate.png')
        this.load.image('shopFloorCrate2','assets/tilesets/Crate.png')
        this.load.image('shopFloorFence1','assets/tilesets/fence.png')
        this.load.image('shopFloorFence2','assets/tilesets/fence.png')
        this.load.image('shopFloorSign','assets/tilesets/Sign.png')
        this.load.spritesheet('witch', 'assets/sprites/WitchWalk.png', 
        { frameWidth: 32, frameHeight: 32})
        //Load JSON data
        this.load.tilemapTiledJSON('mapData', 'assets/tilemaps/ExampleRoom.json')

    }

    create(){

        // Parse JSON into map
        this.parseTilemapJson('mapData')

        const [humanImage, humanProps] = this.parseImageAndPropsLayers('Floor', 'shopFloor')
        humanImage.setVisible(false)
        humanProps.setVisible(false)

        this.player = new TopWitch(this,
            this.mapData.widthInPixels / 2,
            this.mapData.heightInPixel / 2
            )

        this.cursors = this.input.keyboard.createCursorKeys()


    }

    update(){
        const direction = { x:0, y:0}
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
        this.player.move(direction.x, direction.y)
    }

}
export default ShopScene