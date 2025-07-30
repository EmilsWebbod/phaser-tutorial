import {LevelScene} from "../level/LevelScene.ts";
import {Player} from "./Player.ts";
import {IceBlock} from "./IceBlocks.ts";
import {Bombs} from "./Bombs.ts";

export class HeatCore {

    static create(scene: LevelScene) {
        scene.anims.create({
            key: 'fire',
            frames: scene.anims.generateFrameNumbers(Bombs.Explosion, { start: 8*23, end: 8*23+7 }),
            frameRate: 8,
        })
    }

    constructor(private scene: LevelScene, private player: Player) {
    }

    use(): void {
        if (!this.scene.iceBlocks) return;

        this.scene.effects.fireAura(this.player.x, this.player.y);

        const children = this.scene.iceBlocks.getChildren() as IceBlock[];
        children.forEach((block: IceBlock) => {
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, block.x, block.y);
            if (distance < 64) {
                this.scene.iceBlocks!.melt(block, 0.5);
            }
        });
    }
}