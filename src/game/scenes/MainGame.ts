import {Player} from "../game-objects/Player.ts";
import {Stars} from "../game-objects/Stars.ts";
import {Bombs} from "../game-objects/Bombs.ts";
import {LevelGround} from "../levels/LevelGround.ts";
import {LevelScene} from "../levels/LevelScene.js";
import {ColliderHandler} from "../physics/ColliderHandler.js";

export class MainGame extends LevelScene {
    background: Phaser.GameObjects.Image;
    player: Player;

    constructor() {
        super('MainGame');
    }

    create(): void {
        this.player = new Player(this, 100, 450);
        const ground = new LevelGround(this);
        const stars = new Stars(this);
        const bombs = new Bombs(this);

        const collider = new ColliderHandler(this, ground, this.player);

        collider.stars(stars);
        collider.bombs(bombs);
    }

    update(): void {
        this.player.update();
    }
}
