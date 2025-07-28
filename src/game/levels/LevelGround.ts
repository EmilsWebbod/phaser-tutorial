
export class LevelGround extends Phaser.Physics.Arcade.StaticGroup {
    static Platform = 'ground';
    static preload(scene: Phaser.Scene) {
        scene.load.image(LevelGround.Platform, 'assets/platform.png');
    }

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);

        this.create(400, 568, LevelGround.Platform).setScale(2).refreshBody();
        this.create(600, 400, LevelGround.Platform);
        this.create(50, 250, LevelGround.Platform);
        this.create(750, 220, LevelGround.Platform);
    }
}
