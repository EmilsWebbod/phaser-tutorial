
export class Level extends Phaser.Physics.Arcade.StaticGroup {
    static Platform = 'ground';
    static preload(scene: Phaser.Scene) {
        scene.load.image(Level.Platform, 'assets/platform.png');
    }

    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene);

        this.create(400, 568, Level.Platform).setScale(2).refreshBody();
        this.create(600, 400, Level.Platform);
        this.create(50, 250, Level.Platform);
        this.create(750, 220, Level.Platform);
    }
}
