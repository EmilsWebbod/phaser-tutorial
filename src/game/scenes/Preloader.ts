import {Scene} from 'phaser';
import {Platforms} from "../game-objects/Platforms.js";
import {MainMenu} from "./MainMenu.ts";
import {Player} from "../game-objects/Player.ts";
import {Stars} from "../game-objects/Stars.ts";
import {LevelGround} from "../level/LevelGround.ts";
import {Bombs} from "../game-objects/Bombs.ts";

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {

    }

    preload() {
        LevelGround.preload(this);
        Platforms.preload(this);
        Player.preload(this);
        Stars.preload(this);
        Bombs.preload(this);
    }

    create() {

        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        Player.create(this);

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start(MainMenu.name);
    }
}
