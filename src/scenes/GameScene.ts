import { Scene } from './Scene';
import { Loader, Container, ITextureDictionary } from 'pixi.js';
import { Paths } from '../Paths';
import { Button } from '../util/Button';
import { DeviceManager } from '../DeviceManager';
export class GameScene extends Scene
{
    protected _gameSpriteSheet: ITextureDictionary | undefined;
    protected _gameObjectContainer:Container;
    protected _playButton:Button;
    protected _returnButton:Button;

    constructor()
    {
        super();
        this._gameSpriteSheet = Loader.shared.resources[Paths.GAME_ASSETS].textures;
        this._gameObjectContainer = new Container();
        this.addChild(this._gameObjectContainer);
        this.initUI();
    }

    protected initUI()
    {
        this._playButton = new Button(this._buttonSpriteSheet['playButton.png']);
        this._returnButton = new Button(this._buttonSpriteSheet['returnButton.png']);

        this._uiContainer.addChild(this._playButton);
        this._uiContainer.addChild(this._returnButton);


        this._playButton.addHandler(()=>this.start());
        this._returnButton.addHandler(()=>this.return());
        this.onResize();
    }

    protected onResize()
    {
        this._playButton.x = DeviceManager.getInstance().getWidth()/2;
        this._playButton.y = DeviceManager.getInstance().getHeight()-100;

        this._returnButton.x =DeviceManager.getInstance().getWidth()/14;
        this._returnButton.y = 100;


        this._gameObjectContainer.y=DeviceManager.getInstance().getHeight()/12;
        this._gameObjectContainer.x = DeviceManager.getInstance().getWidth() / 2;
    }

    protected start()
    {
        console.warn("Doesn't do anything!");
    }

    protected return()
    {
        this.mainMenu();
    }
}