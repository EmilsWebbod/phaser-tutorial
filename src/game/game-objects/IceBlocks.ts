
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

    collide(block: IceBlock, move: 'left' | 'right'): this {
        if (move === 'left' && block.body.blocked.left) return this;
        if (move === 'right' && block.body.blocked.right) return this;
        const delta = move === 'left' ? -64 : 64;

        this.scene.tweens.add({
            targets: block,
            x: block.x + delta,
            duration: 200,
        })
        return this;
    }

    melt(block: IceBlock, reduce: number): this {
        block.setScale(block.scale - reduce);
        if (block.scale <= 0) {
            block.destroy();
        }
        return this;
    }
}