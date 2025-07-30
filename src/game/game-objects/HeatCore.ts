import {LevelScene} from "../level/LevelScene.ts";
import {Player} from "./Player.ts";
import {IceBlock} from "./IceBlocks.ts";
import {FireEffect} from "../assets/Effects.ts";

export class HeatCore {
    constructor(private scene: LevelScene, private player: Player) {
    }

    use(): void {
        if (!this.scene.iceBlocks) return;

        this.scene.effects.fire(FireEffect.Aura, this.player.x, this.player.y);

        const children = this.scene.iceBlocks.getChildren() as IceBlock[];
        children.forEach((block: IceBlock) => {
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, block.x, block.y);
            if (distance < 64) {
                this.scene.iceBlocks!.melt(block, 0.5);
            }
        });
    }
}