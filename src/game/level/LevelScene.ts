import {IceBlocks} from "../game-objects/IceBlocks.ts";
import {Effects} from "../assets/Effects.ts";

export class LevelScene extends Phaser.Scene {

    iceBlocks?: IceBlocks;
    effects: Effects;

    constructor(key: string) {
        super(key);
    }
}