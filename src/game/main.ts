import {Boot} from './scenes/Boot';
import {GameOver} from './scenes/GameOver';
import {MainGame} from './scenes/MainGame';
import {MainMenu} from './scenes/MainMenu';
import {Preloader} from './scenes/Preloader';

//  Find out more information about the MainGame Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 300},
            debug: false,
        }
    }
};

const StartGame = (parent: string) => {
    return new Phaser.Game({...config, parent});
}

export default StartGame;
