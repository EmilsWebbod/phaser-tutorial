import {Player} from "./Player.ts";
import {LevelScene} from "../level/LevelScene.ts";

export type Star = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
export class Stars extends Phaser.Physics.Arcade.Group {
    static preload(scene: Phaser.Scene) {
        scene.load.image('star', 'assets/star.png');
    }

    static SPAWN_COUNT: number = 11;
    static SPAWN_Y: number = 5;
    static SPAWN_X_MIN: number = 12;
    static SPAWN_X_STEP: number = 70;

    readonly SCORE_POINTS: number = 10;

    constructor(readonly scene: LevelScene) {
        super(scene.physics.world, scene, {
            key: 'star',
            repeat: Stars.SPAWN_COUNT,
            setXY: { x: Stars.SPAWN_X_MIN, y: Stars.SPAWN_Y, stepX: Stars.SPAWN_X_STEP },
            collideWorldBounds: true,
        });

        Phaser.Events.EventEmitter.call(this);
    }

    collectByPlayer(player: Player, star: Star): void {
        star.disableBody(true, true);

        if (this.countActive(true) === 0){
            this.children.iterate(this.enableChild.bind(this) as any)
        }

        player.score.increase(this.SCORE_POINTS);
        this.emit('collected', star);

        this.scene.effects.groundExplosion(star.x, star.y - 12);
    }

    private enableChild(star: Star): null | boolean {
        star.enableBody(true, star.x, Stars.SPAWN_Y, true, true);
        return null;
    }
}
