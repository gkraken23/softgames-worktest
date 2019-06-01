import { DeviceManager } from './DeviceManager';
import { Paths } from './Paths';
import { Loader } from 'pixi.js';
import { CardScene } from './scenes/CardScene';
import { EmojiScene } from './scenes/EmojiScene';

export enum ASSET_NAMES
{
    DIAMOND = 'diamond.png',
    FAMILY = 'family.png',
    GRIN = 'grin.png',
    HEART = 'heart.png',
    NERVOUS = 'nervous.png',
    OK = 'ok.png',
    PH = 'philippines.png',
    SLOTS = 'slots.png',
    VIDEO_GAME = 'videogame.png',
    WINK = 'wink.png',
    WINK_TONGUE ='winktongue.png'
}


export class Game
{
    constructor()
    {
        DeviceManager.getInstance();

        Loader.shared.add(Paths.BUTTON_ASSETS).
            add(Paths.GAME_ASSETS).load(() => this.onLoad());

    }


    protected onLoad()
    {
        const cardScene = new CardScene();
        cardScene.visible = false;
        const emojiScene = new EmojiScene();
        // emojiScene.visible = false;
    }

}