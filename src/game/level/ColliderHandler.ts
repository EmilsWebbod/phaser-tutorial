import {Bomb, Bombs} from "../game-objects/Bombs.js";
import {Platforms} from "../game-objects/Platforms.js";
import {Player} from "../game-objects/Player.js";
import {Star, Stars} from "../game-objects/Stars.js";
import {LevelGround} from "./LevelGround.js";
import {LevelScene} from "./LevelScene.js";
import {IceBlock, IceBlocks} from "../game-objects/IceBlocks.ts";
import {FloorSwitch, FloorSwitches} from "../game-objects/FloorSwitch.ts";

export class ColliderHandler {
    #platforms?: Platforms;
    #iceBlocks?: IceBlocks;

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
        this.addStaticCollider(blocks, { });
        this.#iceBlocks = blocks;
        this.level.physics.add.collider(this.player, blocks, collideCallback as any);
        return this;
    }

    switches(floorSwitches: FloorSwitches, collideCallback: (_: never, floorSwitch: FloorSwitch) => void): this {
        this.level.physics.add.overlap(this.player, floorSwitches, collideCallback as any, undefined, this.level)
        if (this.#iceBlocks) {
            this.level.physics.add.overlap(this.#iceBlocks, floorSwitches, collideCallback as any, undefined, this.level)
        }
        return this;
    }

    stars(stars: Stars, collideCallback: (player: Player, star: Star) => void): this {
        this.addStaticCollider(stars, { iceBlocks: true });
        this.level.physics.add.overlap(this.player, stars, collideCallback as any, undefined, this.level);
        return this;
    }

    bombs(bombs: Bombs, props: BombsProps): this {
        this.addStaticCollider(bombs, { });
        this.level.physics.add.overlap(this.player, bombs, props.withPlayer as any, undefined, this.level);
        if (this.#iceBlocks && props.withIceBlock) {
            this.level.physics.add.collider(this.#iceBlocks, bombs, props.withIceBlock as any, undefined, this.level);
        }
        return this;
    }

    private addStaticCollider(object: Phaser.Types.Physics.Arcade.ArcadeColliderType, props: StaticProps): this {
        this.level.physics.add.collider(object, this.ground);
        if (this.#platforms) {
            this.level.physics.add.collider(object, this.#platforms);
        }
        if (props.iceBlocks && this.#iceBlocks) {
            this.level.physics.add.collider(object, this.#iceBlocks);
        }
        return this;
    }
}

interface StaticProps {
    iceBlocks?: boolean;
}

interface BombsProps {
    withPlayer: (player: Player, bomb: Bomb) => void;
    withIceBlock?: (iceBlock: IceBlock, bomb: Bomb) => void;
}
