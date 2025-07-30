import {Player} from "./Player.ts";
import {LevelScene} from "../level/LevelScene.ts";
import {FireEffect} from "../assets/Effects.ts";

export type Bomb = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

export class Bombs extends Phaser.Physics.Arcade.Group {
    static Key = 'bomb';
    static Explosion = 'explosion';
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

    constructor(readonly scene: LevelScene) {
        super(scene.physics.world, scene);
        Phaser.Events.EventEmitter.call(this);
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

    collideWithPlayer(player: Player, bomb: Bomb): void{
        if (player.isBlocking()){
            this.blocked(bomb)
            return;
        }
        player.hit();
        this.explode(bomb);
    }

    blocked(bomb: Bomb): void{
        bomb.setVelocityX(bomb.body.velocity.x * 2);
    }

    explode(bomb: Bomb): void {
        this.scene.effects.fire(FireEffect.BombExplosion, bomb.x, bomb.y);
        this.emit('explode', bomb);
        bomb.destroy(true);
    }
}
