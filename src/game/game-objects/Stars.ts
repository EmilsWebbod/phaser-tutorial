
type Star = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
export class Stars extends Phaser.Physics.Arcade.Group {
    static preload(scene: Phaser.Scene) {
        scene.load.image('star', 'assets/star.png');
    }

    static SPAWN_COUNT: number = 11;
    static SPAWN_Y: number = 5;
    static SPAWN_X_MIN: number = 12;
    static SPAWN_X_STEP: number = 70;

    readonly BOUNCE_MIN: number = 0.4;
    readonly BOUNCE_MAX: number = 0.8;

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene, {
            key: 'star',
            repeat: Stars.SPAWN_COUNT,
            setXY: { x: Stars.SPAWN_X_MIN, y: Stars.SPAWN_Y, stepX: Stars.SPAWN_X_STEP },
        });

        this.children.iterate(this.initChild.bind(this) as any);
    }

    collide(star: Star): void {
        star.disableBody(true, true);

        if (this.countActive(true) === 0){
            this.children.iterate(this.enableChild.bind(this) as any)
        }
    }

    private initChild(child: Star): null | boolean {
        child.setBounceY(Phaser.Math.FloatBetween(this.BOUNCE_MIN, this.BOUNCE_MAX));
        return null
    }

    private enableChild(star: Star): null | boolean {
        star.enableBody(true, star.x, Stars.SPAWN_Y, true, true);
        return null;
    }
}
