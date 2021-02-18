import Phaser from 'phaser'


class TilemapShopScene extends Phaser.Scene {
    parseTilemapJson (jsonKey){
        this.mapData = this.make.tilemap({ key: jsonKey})

        if(this.physics.world){
            this.physics.world.setBounds(
                0,0, this.mapData.widthInPixels, this.mapData.heightInPixels
            )
        }
        this.cameras.main.setBounds(0, 0, this.mapData.widthInPixels, this.mapData.heightInPixels)
    }
    
    createTileset (tilesetName, textureKey) {
        this.tilesetData = this.mapData.addTilesetImage(tilesetName, textureKey)
    }

    createTileLayer (layerName, enableCollision) {
        const newLayer =  this.mapData.createStaticLayer(layerName, this.tilesetData)
        if (enableCollision && newLayer){
            newLayer.setCollisionByExclusion(-1, true)
        }
        return newLayer
    }

    createObjectGroup (physicsConfig) {
        let objGroup = {}
        if (physicsConfig){
            objGroup = this.physics.add.staticGroup(physicsConfig)
            if(physicsConfig.createCallback) {
                objGroup.createCallbackHandler = physicsConfig.createCallback
            }
        } else {
            objGroup = this.add.group()
        }

        return objGroup
    }

    parseObjectLayer (layerName, spriteKey, spriteFrame, physicsConfig) {
        const objGroup = this.createObjectGroup(physicsConfig)


        const objectData = this.mapData.getObjectLayer(layerName).objects

        objectData.forEach((curObj)=> {
            objGroup.create(
                curObj.x, curObj.y - curObj.height,
                spriteKey, spriteFrame).setOrigin(0,0) 
            
        })
        return objGroup
    }
    
    parseImageAndPropsLayers(layerPrefix, keyPrefix){
        const imageIndex = this.mapData.getImageIndex(layerPrefix)
        const imageLayer = this.mapData.images[imageIndex]
        const imageObj = this.add.image(imageLayer.x, imageLayer.y, keyPrefix)
        imageObj.setOrigin(0,0)

        const propGroup = this.createObjectGroup()

        const objectData = this.mapData.getObjectLayer(layerPrefix + 'Props').objects
        objectData.forEach((curObj) => {
            propGroup.create(
                curObj.x, curObj.y - curObj.height, keyPrefix + curObj.name
            ).setOrigin(0,0)
        })

        return [imageObj, propGroup]
    }
    
}

export default TilemapShopScene