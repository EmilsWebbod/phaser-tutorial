import {Textures} from "../assets/Textures.ts";

export class LevelGround extends Phaser.Physics.Arcade.StaticGroup {

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);

        this.create(400, 568, Textures.Platform).setScale(2).refreshBody();
        this.create(600, 400, Textures.Platform);
        this.create(50, 250, Textures.Platform);
        this.create(750, 220, Textures.Platform);
    }
}
