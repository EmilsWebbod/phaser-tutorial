import {Scene} from 'phaser';
import {Preloader} from "./Preloader.ts";

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/sky.png');
        this.load.image('logo', 'assets/logo.png');
    }

    create() {
        this.scene.start(Preloader.name);
    }
}
