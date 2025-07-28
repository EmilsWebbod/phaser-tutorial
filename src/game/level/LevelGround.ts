
export class LevelGround extends Phaser.Physics.Arcade.StaticGroup {
    static Key = 'ground';
    static preload(scene: Phaser.Scene) {
        scene.load.image(LevelGround.Key, 'assets/platform.png');
    }

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);

        this.create(400, 568, LevelGround.Key).setScale(2).refreshBody();
        this.create(600, 400, LevelGround.Key);
        this.create(50, 250, LevelGround.Key);
        this.create(750, 220, LevelGround.Key);
    }
}
