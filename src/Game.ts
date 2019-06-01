import { DeviceManager } from './DeviceManager';
import { Paths } from './Paths';
import { Loader } from 'pixi.js';
import { CardScene } from './scenes/CardScene';
import { EmojiScene } from './scenes/EmojiScene';
import { EventHandler } from './util/EventDispatcher';
import { Scene } from './scenes/Scene';
import { MainMenu } from './scenes/MainMenu';
import { IEvent } from './util/IEvent';



export class Game
{
    protected _activeScene: Scene;
    protected _mainMenu: Scene;
    protected _cardScene: Scene;
    protected _emojiScene: Scene;

    constructor()
    {
        DeviceManager.getInstance();

        Loader.shared.add(Paths.BUTTON_ASSETS).
            add(Paths.GAME_ASSETS).load(() => this.onLoad());

        EventHandler.getInstance().addEventListener('MainMenu', () => this.mainMenu());
        EventHandler.getInstance().addEventListener('SceneSelect', (e: IEvent) => this.onSceneSelect(e));
    }

    protected mainMenu()
    {
        this._activeScene.visible = false;
        this._mainMenu.visible = true;
    }

    protected onLoad()
    {
        this._mainMenu = new MainMenu();
        this._cardScene = new CardScene();
        this._emojiScene = new EmojiScene();
        this._cardScene.visible = false;
        this._emojiScene.visible = false;
    }

    protected onSceneSelect(e: IEvent)
    {
        switch (e.data)
        {
            case "Card":
                this._activeScene = this._cardScene;
                break;

            case "Emoji":
               this._activeScene = this._emojiScene;
                break;
        }

        this._mainMenu.visible = false;
        this._activeScene.activate();
        this._activeScene.visible = true;
    }

}