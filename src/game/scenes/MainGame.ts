import {Platforms} from "../game-objects/Platforms.js";
import {Player} from "../game-objects/Player.ts";
import {Stars} from "../game-objects/Stars.ts";
import {Bombs} from "../game-objects/Bombs.ts";
import {LevelGround} from "../level/LevelGround.ts";
import {LevelScene} from "../level/LevelScene.js";
import {ColliderHandler} from "../level/ColliderHandler.js";
import {IceBlocks} from "../game-objects/IceBlocks.ts";
import {EffectsManager} from "../assets/Effects.ts";
import {FloorSwitch, FloorSwitches, FloorSwitchEvent} from "../game-objects/FloorSwitch.ts";
import {Doors} from "../game-objects/Door.ts";

export class MainGame extends LevelScene {
    background: Phaser.GameObjects.Image;
    player: Player;
    platforms: Platforms;

    constructor() {
        super('MainGame');
    }

    create(): void {
        this.effects = new EffectsManager(this);
        const ground = new LevelGround(this);
        const switches = new FloorSwitches(this);
        const doors = new Doors(this);
        this.platforms = new Platforms(this);
        const stars = new Stars(this);
        const bombs = new Bombs(this);
        this.player = new Player(this, 100, 450);

        const platform = this.platforms.spawn(400, 300);
        platform.setScale(0.5).refreshBody();

        switches.spawn(150, 535).setDoorId('door-1');
        const door = doors.spawn(400, 500, 'door-1');

        this.iceBlocks = new IceBlocks(this);
        this.iceBlocks.spawn(64*4, 450);
        this.iceBlocks.spawn(64, 200);

        const collider = new ColliderHandler(this, ground, this.player);

        collider.platforms(this.platforms);
        collider.iceBlocks(this.iceBlocks, this.iceBlocks.collideWithPlayer.bind(this.iceBlocks));
        collider.switches(switches, switches.onOverlap);
        this.events.on(FloorSwitchEvent.Activated, (sw: FloorSwitch) => {
            if (sw.doorId === door.id) {
                door.open();
            }
        });
        this.events.on(FloorSwitchEvent.Deactivated, (sw: FloorSwitch) => {
            if (sw.doorId === door.id) {
                door.close();
            }
        })

        collider.stars(stars, stars.collectByPlayer.bind(stars));
        stars.on('collected', () => {
            if (bombs) {
                bombs.spawn(this.player);
            }
        })

        collider.bombs(bombs, {
            withPlayer: bombs.collideWithPlayer.bind(bombs),
            withIceBlock: (iceBlock, bomb) => {
                bomb.explode();
                this.iceBlocks!.melt(iceBlock, 0.2);
            }
        });
    }

    update(): void {
        this.player.update();
        this.platforms.update();
    }
}
