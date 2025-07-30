
export class Textures {

    static Bomb = 'bomb';
    static Door = 'door';
    static Dude = 'dude';
    static IceBlock = 'ice-block';
    static Platform = 'platform';
    static Star = 'star';

    static Animations = {
        Dude: {
            Left: 'dude-left',
            Right: 'dude-right',
            Turn: 'dude-turn',
        }
    }

    static preload(scene: Phaser.Scene){
        scene.load.image(Textures.Bomb, 'assets/bomb.png');
        scene.load.image(Textures.Door, 'assets/door.png');
        scene.load.image(Textures.IceBlock, 'assets/ice-block.png');
        scene.load.image(Textures.Platform, 'assets/platform.png');
        scene.load.image(Textures.Star, 'assets/star.png');
        scene.load.spritesheet(Textures.Dude, 'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    static create(scene: Phaser.Scene){
        scene.anims.create({
            key: Textures.Animations.Dude.Left,
            frames: scene.anims.generateFrameNumbers(Textures.Dude, {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: Textures.Animations.Dude.Turn,
            frames: [{key: Textures.Dude, frame: 4}],
            frameRate: 20,
        });

        scene.anims.create({
            key: Textures.Animations.Dude.Right,
            frames: scene.anims.generateFrameNumbers(Textures.Dude, {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1,
        });
    }
}
