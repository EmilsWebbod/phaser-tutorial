export class Score extends Phaser.GameObjects.Text {
    static Key: string = 'score';
    static Label: string = 'Score: ';

    constructor(scene: Phaser.Scene) {
        super(scene, 620, 550, Score.Label + "0", {fontSize: '32px', color: '#000'});
        scene.add.existing(this);
        scene.registry.set(Score.Key, 0);
    }

    increase(points: number) {
        this.scene.registry.inc(Score.Key, points);
        this.setText(Score.Label + this.scene.registry.get(Score.Key));
    }
}
