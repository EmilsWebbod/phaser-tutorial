
type Platform = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
export class Platforms extends Phaser.Physics.Arcade.Group {
    static Key = 'platform';
    static preload(scene: Phaser.Scene) {
        scene.load.image(Platforms.Key, 'assets/platform.png');
    }

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);
    }

    spawn(x: number, y: number): Platform {
        const platform: Platform = this.create(x, y, Platforms.Key);
        platform.setImmovable(true);
        platform.body.allowGravity = false;
        platform.setVelocityX(50);
        platform.setX(x);
        platform.setY(y);
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