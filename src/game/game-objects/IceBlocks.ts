import {Player} from "./Player.ts";

export type IceBlock = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
export class IceBlocks extends Phaser.Physics.Arcade.Group {
    static Key = 'ice-block';
    static preload(scene: Phaser.Scene) {
        scene.load.image(IceBlocks.Key, 'assets/ice-block.png')
    }

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);
        scene.add.existing(this);
    }

    spawn(x: number, y: number): this{
        const block: IceBlock = this.create(x, y, IceBlocks.Key);
        block.setPushable(false);
        block.setCollideWorldBounds(true);

        return this;
    }

    collideWithPlayer(player: Player, block: IceBlock): void {
        if (player.body!.bottom < block.body.top) return;
        if (!player.body!.touching.left && !player.body!.touching.right) return;

        const move = (player.body!.touching.left && block.body.touching.right) ? 'left' : 'right';
        const delta: number = move === 'left' ? -64 : 64;

        if (move === 'left' && block.body.blocked.left) return;
        if (move === 'right' && block.body.blocked.right) return;

        this.scene.tweens.add({
            targets: block,
            x: block.x + delta,
            duration: 200,
        })
    }

    melt(block: IceBlock, reduce: number): this {
        block.setScale(block.scale - reduce);
        if (block.scale <= 0) {
            block.destroy();
        }
        return this;
    }
}