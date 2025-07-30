import {Lives} from "./Lives.js";
import {Score} from "./Score.js";
import {HeatCore} from "./HeatCore.ts";
import {LevelScene} from "../level/LevelScene.ts";
import {Textures} from "../assets/Textures.ts";

export class Player extends Phaser.Physics.Arcade.Sprite {
    readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    readonly score: Score;
    readonly lives: Lives;
    readonly tool: HeatCore;

    constructor(scene: LevelScene, x: number, y: number) {
        super(scene, x, y, Textures.Dude);
        if (!this.scene.input.keyboard) {
            throw new Error('Keyboard not found')
        }

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);


        this.score = new Score(scene);
        this.lives = new Lives(scene);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.tool = new HeatCore(scene, this);
    }

    isBlocking(): boolean{
        return this.cursors.space.isDown;
    }

    update() {
        const {left, right, up, space} = this.cursors;
        if (left.isDown) {
            this.setVelocityX(-160);
            this.anims.play(Textures.Animations.Dude.Left, true);
        } else if (right.isDown) {
            this.setVelocityX(160);
            this.anims.play(Textures.Animations.Dude.Right, true);
        } else {
            this.setVelocityX(0);
            this.anims.play(Textures.Animations.Dude.Turn);
        }

        if (up.isDown && this.body!.touching.down) {
            this.setVelocityY(-250);
        }

        if (Phaser.Input.Keyboard.JustDown(space)) {
            this.tool.use();
        }
    }

    hit(){
        const lives = this.lives.decrease(1);
        if (lives === 0) {
            this.scene.scene.start('GameOver');
        }
    }
}
