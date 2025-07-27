import {GameObjects, Scene} from 'phaser';
import {MainGame} from "./MainGame.ts";

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(400, 300, 'background');

        this.logo = this.add.image(400, 200, 'logo');

        this.title = this.add.text(400, 360, 'Press to play', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', this.start);
    }

    private start(): void {
        this.scene.start(MainGame.name);
    }
}
