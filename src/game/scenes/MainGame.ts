import {Player} from "../game-objects/Player.ts";
import {Score} from "../game-objects/Score.ts";
import {Stars} from "../game-objects/Stars.ts";
import {Bombs} from "../game-objects/Bombs.ts";
import {Level} from "../levels/Level.ts";

export class MainGame extends Phaser.Scene {
    background: Phaser.GameObjects.Image;
    player: Player;
    level: Level;
    stars: Stars;
    bombs: Bombs;

    score: Score;

    constructor() {
        super('MainGame');
    }

    create(): void {
        this.level = new Level(this);
        this.player = new Player(this, 100, 450);
        this.stars = new Stars(this);
        this.bombs = new Bombs(this);

        this.physics.add.collider(this.player, this.level);
        this.physics.add.collider(this.bombs, this.level);
        this.physics.add.collider(this.stars, this.level);

        this.physics.add.collider(this.player, this.stars, this.collideStar, undefined, this);
        this.physics.add.collider(this.player, this.bombs, this.collideBomb, undefined, this);

        this.score = new Score(this);
    }

    update(): void {
        this.player.update();
    }

    collideStar(player: any, star: any): void {
        this.stars.collide(star);
        this.bombs.spawn(player);
        this.score.collideWithStar();
    }

    collideBomb(): void {
        this.scene.start('GameOver');
    }
}
