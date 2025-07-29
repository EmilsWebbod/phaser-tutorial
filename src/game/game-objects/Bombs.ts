import {Player} from "./Player.ts";

export type Bomb = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

export class Bombs extends Phaser.Physics.Arcade.Group {
    static Key = 'bomb';
    static Explosion = 'explosion';
    static preload(scene: Phaser.Scene) {
        scene.load.image(Bombs.Key, 'assets/bomb.png');
        scene.load.spritesheet(Bombs.Explosion, 'assets/explosions.png', {
            frameHeight: 64,
            frameWidth: 64,
        });
    }

    static create(scene: Phaser.Scene) {
        scene.anims.create({
            key: 'explode1',
            frames: scene.anims.generateFrameNumbers(Bombs.Explosion, { start: 8*11, end: 8*11+7 }),
            frameRate: 8,
        })
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
        const explosion = this.scene.add.sprite(bomb.x, bomb.y, Bombs.Explosion);
        explosion.play('explode1');
        explosion.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            explosion.destroy(true);
        })

        this.emit('explode', bomb);
        bomb.destroy(true);
    }
}
