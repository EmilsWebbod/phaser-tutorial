
type Platform = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
export class Platforms extends Phaser.Physics.Arcade.Group {
    static Key = 'platform';
    static preload(scene: Phaser.Scene) {
        scene.load.image(Platforms.Key, 'assets/platform.png');
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene.physics.world, scene, {
            key: Platforms.Key,
            immovable: true,
            allowGravity: false,
            velocityX: 50,
            setXY: { x, y },
        });
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