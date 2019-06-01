import { Container, ITextureDictionary, Loader, Sprite, DisplayObject } from 'pixi.js';
import { DeviceManager, CanvasEvent } from '../DeviceManager';
import { Paths } from '../Paths';
import { Button } from '../util/Button';
import { EventHandler } from '../util/EventDispatcher';

export class Scene extends Container
{
    protected _buttonSpriteSheet: ITextureDictionary | undefined;
   protected _uiContainer: Container;


    constructor()
    {
        super();
        this._buttonSpriteSheet = Loader.shared.resources[Paths.BUTTON_ASSETS].textures;

        this._uiContainer = new Container();
        this.addChild(this._uiContainer);

        DeviceManager.getInstance().application.stage.addChild(this);
        EventHandler.getInstance().addEventListener(CanvasEvent.RESIZE,()=>this.onResize());
    }


    public activate()
    {

    }
    protected mainMenu()
    {
        EventHandler.getInstance().dispatch({id:"MainMenu"});
    }

    //TODO: Resizing
    protected onResize()
    {
        // this._playButton.x = DeviceManager.getInstance().getWidth()/2;
        // this._playButton.y = DeviceManager.getInstance().getHeight()-100;

        // this._returnButton.x =DeviceManager.getInstance().getWidth()/14;
        // this._returnButton.y = 100;
    }

 
}