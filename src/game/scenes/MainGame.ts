import {Platforms} from "../game-objects/Platforms.js";
import {Player} from "../game-objects/Player.ts";
import {Stars} from "../game-objects/Stars.ts";
import {Bombs} from "../game-objects/Bombs.ts";
import {LevelGround} from "../level/LevelGround.ts";
import {LevelScene} from "../level/LevelScene.js";
import {ColliderHandler} from "../level/ColliderHandler.js";
import {IceBlocks} from "../game-objects/IceBlocks.ts";

export class MainGame extends LevelScene {
    background: Phaser.GameObjects.Image;
    player: Player;
    platforms: Platforms;

    constructor() {
        super('MainGame');
    }

    create(): void {
        const ground = new LevelGround(this);
        this.platforms = new Platforms(this);
        const stars = new Stars(this);
        const bombs = new Bombs(this);
        this.player = new Player(this, 100, 450);

        const platform = this.platforms.spawn(400, 300);
        platform.setScale(0.5).refreshBody();

        const iceBlocks = new IceBlocks(this);
        iceBlocks.spawn(64*4, 450);
        iceBlocks.spawn(64, 200);

        const collider = new ColliderHandler(this, ground, this.player);

        collider.platforms(this.platforms);
        collider.iceBlocks(iceBlocks, iceBlocks.collideWithPlayer.bind(iceBlocks));

        collider.stars(stars, stars.collectByPlayer.bind(stars));
        stars.on('collected', () => {
            if (bombs) {
                bombs.spawn(this.player);
            }
        })

        collider.bombs(bombs, bombs.collideWithPlayer.bind(bombs));
    }

    update(): void {
        this.player.update();
        this.platforms.update();
    }
}
