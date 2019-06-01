import { DeviceManager } from './DeviceManager';
import { CardScene } from './CardScene';
import { Paths } from './Paths';
import { Loader } from 'pixi.js';
import { Scene } from './Scene';

export class Game
{
    constructor()
    {
        DeviceManager.getInstance();

        Loader.shared.add(Paths.BUTTON_ASSETS).
            add(Paths.CARD_ASSETS).load(() => this.onLoad());

    }


    protected onLoad()
    {
        const cardScene = new CardScene();
    }

}