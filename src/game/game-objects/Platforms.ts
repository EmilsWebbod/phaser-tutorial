import {Textures} from "../assets/Textures.ts";

type Platform = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
export class Platforms extends Phaser.Physics.Arcade.Group {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);
    }

    spawn(x: number, y: number): Platform {
        const platform: Platform = this.create(x, y, Textures.Platform);
        platform.setImmovable(true);
        platform.body.allowGravity = false;
        platform.setVelocityX(50);
        return platform;
    }

    update(){
        this.children.iterate(this.updateChild.bind(this) as any);
    }

    updateChild(platform: Platform): null {
        if (platform.x > 500) {
            platform.setVelocityX(-50);
        } else if(platform.x < 300){
            platform.setVelocityX(50);
        }
        return null;
    }
}