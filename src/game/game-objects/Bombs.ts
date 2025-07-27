import {Player} from "./Player.ts";

type Bomb = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

export class Bombs extends Phaser.Physics.Arcade.Group {
    static Key = 'bomb';
    static preload(scene: Phaser.Scene) {
        scene.load.image(Bombs.Key, 'assets/bomb.png');
    }

    readonly BOUNCE = 1;
    readonly VELOCITY_X_MIN = -200;
    readonly VELOCITY_X_MAX = 200;
    readonly VELOCITY_Y = 20;
    readonly SPAWN_Y = 16;
    private SPAWN_X_MIN = 0;
    private SPAWN_X_MAX = 800;
    private SPAWN_X_CENTER = this.SPAWN_X_MAX / 2;

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);
    }

    spawn(player: Player) {
        const SPAWN_X: number = (player.x < this.SPAWN_X_CENTER)
            ? Phaser.Math.Between(this.SPAWN_X_CENTER, this.SPAWN_X_MAX)
            : Phaser.Math.Between(this.SPAWN_X_MIN, this.SPAWN_X_CENTER);

        const bomb: Bomb = this.create(SPAWN_X, this.SPAWN_Y, Bombs.Key);
        bomb.setBounce(this.BOUNCE)
            .setCollideWorldBounds(true)
            .setVelocity(Phaser.Math.Between(this.VELOCITY_X_MIN, this.VELOCITY_X_MAX), this.VELOCITY_Y);
    }
}
