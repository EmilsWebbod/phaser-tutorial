import {Platforms} from "../game-objects/Platforms.js";
import {Player} from "../game-objects/Player.ts";
import {Stars} from "../game-objects/Stars.ts";
import {Bombs} from "../game-objects/Bombs.ts";
import {LevelGround} from "../level/LevelGround.ts";
import {LevelScene} from "../level/LevelScene.js";
import {ColliderHandler} from "../level/ColliderHandler.js";

export class MainGame extends LevelScene {
    background: Phaser.GameObjects.Image;
    player: Player;
    platforms: Platforms;

    constructor() {
        super('MainGame');
    }

    create(): void {
        this.player = new Player(this, 100, 450);
        const ground = new LevelGround(this);
        const stars = new Stars(this);
        const bombs = new Bombs(this);
        this.platforms = new Platforms(this, 400, 100);

        const collider = new ColliderHandler(this, ground, this.player);

        collider.platforms(this.platforms);
        collider.stars(stars);
        collider.bombs(bombs);
    }

    update(): void {
        this.player.update();
        this.platforms.update();
    }
}
