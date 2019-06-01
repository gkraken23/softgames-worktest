import { Container, ITextureDictionary, Loader, Sprite, DisplayObject } from 'pixi.js';
import { DeviceManager } from './DeviceManager';
import { Paths } from './Paths';

export class Scene extends Container
{
    protected _buttonSpriteSheet: ITextureDictionary | undefined;
    protected _uiContainer: Container;
    protected _playButton:Sprite;

    constructor()
    {
        super();
        this._buttonSpriteSheet = Loader.shared.resources[Paths.BUTTON_ASSETS].textures;

        this._uiContainer = new Container();

        this.addChild(this._uiContainer);





        DeviceManager.getInstance().application.stage.addChild(this);

        this.initUI();
    }


    protected initUI()
    {
        this._playButton = new Sprite(this._buttonSpriteSheet['playButton.png']);
        this._playButton.interactive = true;
        this._playButton.buttonMode = true;
        this._playButton.anchor.x = 0.5;
        this._playButton.anchor.y = 0.5;
        this._playButton.on('pointerdown', ()=>this.onPlayButtonDown()));
        this._playButton.on('pointerup', ()=>this.onPlayButtonUp()));


        this._playButton.x = DeviceManager.getInstance().getWidth()/2;
        this._playButton.y = DeviceManager.getInstance().getHeight()-200;
        this._uiContainer.addChild( this._playButton);
    }

    protected onPlayButtonDown()
    {
        this._playButton.scale.x = 0.9;
        this._playButton.scale.y = 0.9;
    }

    protected onPlayButtonUp()
    {
        this._playButton.scale.x = 1;
        this._playButton.scale.y = 1;
    }


    //TODO: Resizing
    protected onResize()
    {

    }
}