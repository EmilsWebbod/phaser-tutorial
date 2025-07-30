import {IceBlocks} from "../game-objects/IceBlocks.ts";
import {EffectsManager} from "../assets/Effects.ts";

export class LevelScene extends Phaser.Scene {

    iceBlocks?: IceBlocks;
    effects: EffectsManager;

    constructor(key: string) {
        super(key);
    }
}