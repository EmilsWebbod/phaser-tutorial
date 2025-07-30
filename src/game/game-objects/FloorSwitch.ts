import {LevelScene} from "../level/LevelScene.ts";

export class FloorSwitches extends Phaser.Physics.Arcade.StaticGroup {
    constructor(readonly scene: LevelScene) {
        super(scene.physics.world, scene);

    }

    spawn(x: number, y: number, doorId: string) {
        const sw = new FloorSwitch(this.scene, x, y, doorId);
        this.add(sw);
        return sw;
    }

    onCollide(_: unknown, sw: FloorSwitch): void {
        sw.activate();
    }
}

export class FloorSwitch extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: LevelScene, x: number, y: number, readonly doorId: string) {
        super(scene, x, y, 'switch');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    }

    activate(): void{
        this.scene.events.emit(FloorSwitchEvent.Activated, this);
    }
}

export enum FloorSwitchEvent {
    Activated = 'switch:activated',
}