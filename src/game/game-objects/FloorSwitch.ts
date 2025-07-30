import {LevelScene} from "../level/LevelScene.ts";
import {Textures} from "../assets/Textures.ts";

export class FloorSwitches extends Phaser.Physics.Arcade.StaticGroup {
    constructor(readonly scene: LevelScene) {
        super(scene.physics.world, scene);
        this.classType = FloorSwitch;
    }

    spawn(x: number, y: number): FloorSwitch {
        const sw = new FloorSwitch(this.scene, x, y);
        this.add(sw);
        return sw;
    }

    onOverlap(_: unknown, sw: FloorSwitch): void {
        sw.activate();
    }
}

export class FloorSwitch extends Phaser.Physics.Arcade.Sprite {
    doorId: string;
    active: boolean = false;

    constructor(scene: LevelScene, x: number, y: number) {
        super(scene, x, y, Textures.Platform);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.setScale(0.10).refreshBody();
    }

    setDoorId(id: string): this {
        this.doorId = id;
        return this;
    }

    activate(): void{
        this.active = true;
        this.scene.events.emit(FloorSwitchEvent.Activated, this);
    }

    deactivate(): void {
        this.active = false;
        this.scene.events.emit(FloorSwitchEvent.Deactivated, this);
    }
}

export enum FloorSwitchEvent {
    Activated = 'switch:activated',
    Deactivated = 'switch:deactivated',
}