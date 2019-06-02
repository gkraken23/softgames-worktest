import { Container, ITextureDictionary, Loader } from 'pixi.js';
import { CanvasEvent, DeviceManager } from '../DeviceManager';
import { Paths } from '../Paths';
import { Button } from '../util/Button';
import { EventHandler } from '../util/EventDispatcher';
import { UIContainer } from './UIContainer';

export class GameScene extends Container
{
    protected _gameSpriteSheet: ITextureDictionary | undefined;
    protected _gameObjectContainer: Container;
    protected _playButton: Button;
    protected _returnButton: Button;
    protected _uiContainer: UIContainer;

    constructor(uiContainer: UIContainer)
    {
        super();
        this._uiContainer = uiContainer;
        this._gameSpriteSheet = Loader.shared.resources[Paths.GAME_ASSETS].textures;
        this._gameObjectContainer = new Container();
        this.addChild(this._gameObjectContainer);
        DeviceManager.getInstance().application.stage.addChild(this);
        EventHandler.getInstance().addEventListener(CanvasEvent.RESIZE, () => this.onResize());

        this.onResize();
    }


    protected onResize()
    {
        this._gameObjectContainer.x = DeviceManager.getInstance().getWidth() / 2;
    }
}