
export class Player extends Phaser.Physics.Arcade.Sprite {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    static Key = 'dude';
    static Animations  = {
        Left: 'left',
        Right: 'right',
        Turn: 'turn',
    }

    static preload(scene: Phaser.Scene){
        scene.load.spritesheet(Player.Key, 'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    static create(scene: Phaser.Scene) {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        scene.anims.create({
            key: Player.Animations.Left,
            frames: scene.anims.generateFrameNumbers(Player.Key, {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: Player.Animations.Turn,
            frames: [{key: Player.Key, frame: 4}],
            frameRate: 20,
        });

        scene.anims.create({
            key: Player.Animations.Right,
            frames: scene.anims.generateFrameNumbers(Player.Key, {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1,
        });
    }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, Player.Key);
        if (!this.scene.input.keyboard) {
            throw new Error('Keyboard not found')
        }

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);


        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        const {left, right, up} = this.cursors;
        if (left.isDown) {
            this.setVelocityX(-160);
            this.anims.play(Player.Animations.Left, true);
        } else if (right.isDown) {
            this.setVelocityX(160);
            this.anims.play(Player.Animations.Right, true);
        } else {
            this.setVelocityX(0);
            this.anims.play(Player.Animations.Turn);
        }

        if (up.isDown && this.body!.touching.down) {
            this.setVelocityY(-330);
        }
    }
}
