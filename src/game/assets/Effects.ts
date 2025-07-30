import {LevelScene} from "../level/LevelScene.ts";

export class Effects {
    static Fire = 'fire';
    static preload(scene: Phaser.Scene): void {
        scene.load.spritesheet(Effects.Fire, 'assets/explosions.png', {
            frameHeight: 64,
            frameWidth: 64,
        });
    }

    static create(scene: Phaser.Scene) {
        for (let i = 0; i < 24; i++) {
            scene.anims.create({
                key: 'fire'+i,
                frames: scene.anims.generateFrameNumbers(Effects.Fire, { start: i*8, end: i*8+7 }),
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
        })
    }

    groundExplosion = this.spawnFire('fire0')
    bombExplosion = this.spawnFire('fire11')
    fireAura = this.spawnFire('fire23');

    private spawnFire(animation: string): (x: number, y: number) => void {
        return (x: number, y: number): void => {
            const explosion: Phaser.GameObjects.Sprite = this.#fire.get(x, y, Effects.Fire);
            explosion.setActive(true).setVisible(true);
            explosion.play(animation);
        }
    }

}