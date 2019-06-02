import { Loader } from 'pixi.js';
import { SceneEvent, UIEvent } from './data/GameEvents';
import { DeviceManager } from './DeviceManager';
import { IEvent } from './interface/IEvent';
import { IGameScene } from './interface/IGameScene';
import { Paths } from './Paths';
import { CardScene } from './scenes/CardScene';
import { EmojiScene } from './scenes/EmojiScene';
import { MainMenu } from './scenes/MainMenu';
import { ParticleScene } from './scenes/ParticleScene';
import { UIContainer } from './scenes/UIContainer';
import { EventHandler } from './util/EventDispatcher';



export class Game
{
    protected _activeScene: IGameScene;
    protected _mainMenu: MainMenu;
    protected _cardScene: IGameScene;
    protected _emojiScene: IGameScene;
    protected _particleScene: IGameScene;
    protected _uiContainer: UIContainer;

    constructor()
    {
        DeviceManager.getInstance();

        Loader.shared.add(Paths.BUTTON_ASSETS).
            add(Paths.GAME_ASSETS).load(() => this.onLoad());

        EventHandler.getInstance().addEventListener(UIEvent.MAIN_MENU, () => this.mainMenu());
        EventHandler.getInstance().addEventListener(UIEvent.SCENE_SELECT, (e: IEvent) => this.onSceneSelect(e));
    }

    protected mainMenu()
    {
        this._activeScene.return();
        this._activeScene.visible = false;
        this._uiContainer.visible = false;
        this._mainMenu.visible = true;
    }

    protected onLoad()
    {
        this._uiContainer = new UIContainer();
        this._mainMenu = new MainMenu();
        this._cardScene = new CardScene(this._uiContainer);
        this._emojiScene = new EmojiScene(this._uiContainer);
        this._particleScene = new ParticleScene(this._uiContainer);
        this._uiContainer.visible = false;
        this._cardScene.visible = false;
        this._emojiScene.visible = false;
        this._particleScene.visible = false;
    }

    protected onSceneSelect(e: IEvent)
    {
        switch (e.data)
        {
            case SceneEvent.CARD:
                this._activeScene = this._cardScene;
                break;

            case SceneEvent.TEXT_TOOL:
                this._activeScene = this._emojiScene;
                break;

            case SceneEvent.PARTICLE:
                this._activeScene = this._particleScene;
                break;
        }

        this._mainMenu.visible = false;
        this._uiContainer.visible = true;
        this._activeScene.visible = true;
        this._activeScene.start();
    }

}