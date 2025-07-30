import {LevelScene} from "../level/LevelScene.ts";

export enum FireEffect {
    GroundExplosion,
    BombExplosion = 11,
    Aura = 23,
}

export class EffectsManager {
    static FireKey = 'fire';
    static preload(scene: Phaser.Scene): void {
        scene.load.spritesheet(EffectsManager.FireKey, 'assets/explosions.png', {
            frameHeight: 64,
            frameWidth: 64,
        });
    }

    static create(scene: Phaser.Scene) {
        for (let i = 0; i < 24; i++) {
            scene.anims.create({
                key: 'fire'+i,
                frames: scene.anims.generateFrameNumbers(EffectsManager.FireKey, { start: i*8, end: i*8+7 }),
                frameRate: 8,
                hideOnComplete: true,
            })
        }
    }

    #fire: Phaser.GameObjects.Group;

    constructor(scene: LevelScene) {
        this.#fire = scene.add.group({
            classType: Phaser.GameObjects.Sprite,
            runChildUpdate: false,
        });
    }

    fire(key: FireEffect, x: number, y: number): Phaser.GameObjects.Sprite {
        const explosion: Phaser.GameObjects.Sprite = this.#fire.get(x, y, EffectsManager.FireKey);
        explosion.setActive(true).setVisible(true).play('fire'+key);
        explosion.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            explosion.setActive(false).setVisible(false);
        });
        return explosion;
    }
}

