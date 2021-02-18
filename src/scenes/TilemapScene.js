import Phaser from 'phaser'


class TilemapScene extends Phaser.Scene {
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

    parseObjectLayer (layerName, spriteKey, spriteFrame, physicsConfig) {
        let objGroup = {}
        if(physicsConfig) {
            objGroup = this.physics.add.group(physicsConfig)
            if (physicsConfig.createCallback) {
                objGroup.createCallbackHandler = physicsConfig.createCallback
            }
        } else {
            objGroup = this.add.group()
        }


        const objectData = this.mapData.getObjectLayer(layerName).objects

        objectData.forEach((curObj)=> {
            objGroup.create(
                curObj.x, curObj.y - curObj.height,
                spriteKey, spriteFrame).setOrigin(0,0) 
            
        })
        return objGroup
    }

}

export default TilemapScene