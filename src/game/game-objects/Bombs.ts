import {Player} from "./Player.ts";
import {LevelScene} from "../level/LevelScene.ts";
import {FireEffect} from "../assets/Effects.ts";
import {Textures} from "../assets/Textures.ts";

export class Bombs extends Phaser.Physics.Arcade.Group {
    static Explosion = 'explosion';

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
        this.classType = Bomb;
        Phaser.Events.EventEmitter.call(this);
    }

    spawn(player: Player) {
        const SPAWN_X: number = (player.x < this.SPAWN_X_CENTER)
            ? Phaser.Math.Between(this.SPAWN_X_CENTER, this.SPAWN_X_MAX)
            : Phaser.Math.Between(this.SPAWN_X_MIN, this.SPAWN_X_CENTER);

        const bomb: Bomb = this.create(SPAWN_X, this.SPAWN_Y, Textures.Bomb);
        bomb.setBounce(this.BOUNCE)
            .setCollideWorldBounds(true)
            .setVelocity(Phaser.Math.Between(this.VELOCITY_X_MIN, this.VELOCITY_X_MAX), this.VELOCITY_Y);
    }

    collideWithPlayer(player: Player, bomb: Bomb): void{
        if (player.isBlocking()){
            bomb.blocked()
            return;
        }
        player.hit();
        bomb.explode();
    }
}

export class Bomb extends Phaser.Physics.Arcade.Sprite {
    constructor(readonly scene: LevelScene, x: number, y: number) {
        super(scene, x, y, 'bomb');
    }

    explode(): void {
        this.scene.effects.fire(FireEffect.BombExplosion, this.x, this.y);
        this.destroy(true);
    }

    blocked(): void {
        if (!this.body) return;
        this.setVelocityX(this.body.velocity.x * 2) ;
    }
}