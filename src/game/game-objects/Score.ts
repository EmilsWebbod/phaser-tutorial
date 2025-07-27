export class Score extends Phaser.GameObjects.Text {
    static Key: string = 'score';
    static Label: string = 'Score: ';

    constructor(scene: Phaser.Scene) {
        super(scene, 16, 16, Score.Label + "0", {fontSize: '32px', color: '#000'});
        scene.add.existing(this);
        scene.registry.set(Score.Key, 0);
    }

    collideWithStar() {
        this.scene.registry.inc(Score.Key, 10);
        this.setText(Score.Label + this.scene.registry.get(Score.Key));
    }
}
