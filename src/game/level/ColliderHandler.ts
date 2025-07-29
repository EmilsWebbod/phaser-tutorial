import {Bomb, Bombs} from "../game-objects/Bombs.js";
import {Platforms} from "../game-objects/Platforms.js";
import {Player} from "../game-objects/Player.js";
import {Star, Stars} from "../game-objects/Stars.js";
import {LevelGround} from "./LevelGround.js";
import {LevelScene} from "./LevelScene.js";
import {IceBlock, IceBlocks} from "../game-objects/IceBlocks.ts";

export class ColliderHandler {
    #platforms?: Platforms;
    #iceBlocks?: IceBlocks;
    #bombs?: Bombs;

    constructor(
        readonly level: LevelScene,
        readonly ground: LevelGround,
        readonly player: Player
    ) {
        this.level.physics.add.collider(player, ground);
    }

    platforms(platforms: Platforms): this{
        this.#platforms = platforms;
        this.level.physics.add.collider(this.player, this.#platforms);
        return this;
    }

    iceBlocks(blocks: IceBlocks, collideCallback: (player: Player, block: IceBlock) => void): this {
        this.addStaticCollider(blocks);
        this.#iceBlocks = blocks;
        this.level.physics.add.collider(this.player, blocks, collideCallback as any);
        return this;
    }

    stars(stars: Stars, collideCallback: (player: Player, star: Star) => void): this {
        this.addStaticCollider(stars);
        this.level.physics.add.overlap(this.player, stars, collideCallback as any, undefined, this.level);
        return this;
    }

    bombs(bombs: Bombs, collideCallback: (player: Player, bomb: Bomb) => void): this {
        this.#bombs = bombs;
        this.addStaticCollider(bombs);
        this.level.physics.add.overlap(this.player, this.#bombs, collideCallback as any, undefined, this.level);
        return this;
    }

    private addStaticCollider(object: Phaser.Types.Physics.Arcade.ArcadeColliderType): this {
        this.level.physics.add.collider(object, this.ground);
        if (this.#platforms) {
            this.level.physics.add.collider(object, this.#platforms);
        }
        if (this.#iceBlocks) {
            this.level.physics.add.collider(object, this.#iceBlocks);
        }
        return this;
    }
}
