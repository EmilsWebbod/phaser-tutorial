import {LevelScene} from "../level/LevelScene.ts";
import {Textures} from "../assets/Textures.ts";

export class Doors extends Phaser.Physics.Arcade.StaticGroup {
    constructor(readonly scene: LevelScene) {
        super(scene.physics.world, scene);
    }

    spawn(x: number, y: number, id: string): Door {
        const door = new Door(this.scene, x, y, id);
        this.add(door);
        return door;
    }
}

export class Door extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: LevelScene, x: number, y: number, readonly id: string) {
        super(scene, x, y, Textures.Door);
        scene.add.existing(this);
        scene.physics.add.existing(this, true);
    }

    open(): this {
        this.setVisible(false);
        this.disableBody(true, true);
        return this;
    }

    close(): this {
        this.setVisible(true);
        this.enableBody(false, this.x, this.y, true, true);
        return this;
    }
}