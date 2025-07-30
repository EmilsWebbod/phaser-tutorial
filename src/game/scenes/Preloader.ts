import {MainMenu} from "./MainMenu.ts";
import {EffectsManager} from "../assets/Effects.ts";
import {Textures} from "../assets/Textures.ts";

export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    init() {

    }

    preload() {
        Textures.preload(this);
        EffectsManager.preload(this);
    }

    create() {

        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        Textures.create(this);
        EffectsManager.create(this);

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start(MainMenu.name);
    }
}
