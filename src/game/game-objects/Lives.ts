export class Lives extends Phaser.GameObjects.Text {
    static Key: string = 'lives';
    static Label: string = 'Lives: ';
    static Initial = 3;

    constructor(scene: Phaser.Scene) {
        super(scene, 16, 550, Lives.Label + Lives.Initial, {fontSize: '32px', color: '#000'});
        scene.add.existing(this);
        scene.registry.set(Lives.Key, Lives.Initial);
    }

    decrease(lives: number): number {
        this.scene.registry.inc(Lives.Key, -lives);
        const currentLives = this.scene.registry.get(Lives.Key);
        this.setText(Lives.Label + currentLives);
        return currentLives;
    }
}
