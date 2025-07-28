import {Bombs} from "../game-objects/Bombs.js";
import {Player} from "../game-objects/Player.js";
import {Stars} from "../game-objects/Stars.js";
import {LevelGround} from "../levels/LevelGround.js";
import {LevelScene} from "../levels/LevelScene.js";

export class ColliderHandler {
    #bombs?: Bombs;

    constructor(
        readonly level: LevelScene,
        readonly ground: LevelGround,
        readonly player: Player
    ) {
        this.level.physics.add.collider(player, ground);
    }

    stars(stars: Stars) {
        this.level.physics.add.collider(stars, this.ground);
        this.level.physics.add.collider(this.player, stars, (_, star) => {
            stars.collide(star as any);
            this.player.score.increase(stars.SCORE_POINTS);
            if (this.#bombs) {
                this.#bombs.spawn(this.player);
            }
        }, undefined, this.level)
    }

    bombs(bombs: Bombs) {
        this.#bombs = bombs;
        this.level.physics.add.collider(this.#bombs, this.ground);
        this.level.physics.add.collider(this.player, this.#bombs, (_, _bomb) => {
            this.level.scene.start('GameOver');
        }, undefined, this.level);
    }
}
