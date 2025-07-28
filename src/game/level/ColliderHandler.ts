import {Bombs} from "../game-objects/Bombs.js";
import {Platforms} from "../game-objects/Platforms.js";
import {Player} from "../game-objects/Player.js";
import {Stars} from "../game-objects/Stars.js";
import {LevelGround} from "./LevelGround.js";
import {LevelScene} from "./LevelScene.js";

export class ColliderHandler {
    #bombs?: Bombs;
    #platforms?: Platforms;

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

    stars(stars: Stars): this {
        this.level.physics.add.collider(stars, this.ground);
        this.level.physics.add.collider(this.player, stars, (_, star) => {
            stars.collide(star as any);
            this.player.score.increase(stars.SCORE_POINTS);
            if (this.#bombs) {
                this.#bombs.spawn(this.player);
            }
        }, undefined, this.level);
        if (this.#platforms) {
            this.level.physics.add.collider(stars, this.#platforms);
        }
        return this;
    }

    bombs(bombs: Bombs): this {
        this.#bombs = bombs;
        this.level.physics.add.collider(this.#bombs, this.ground);
        this.level.physics.add.collider(this.player, this.#bombs, (_, bomb) => {
            if (this.player.isBlocking()){
                this.#bombs!.blocked(bomb as any);
                return;
            }
            this.player.hit();
            this.#bombs!.hit(bomb as any);
        }, undefined, this.level);
        if (this.#platforms) {
            this.level.physics.add.collider(this.#bombs, this.#platforms);
        }
        return this;
    }
}
