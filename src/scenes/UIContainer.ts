import { Container, ITextureDictionary, Loader } from 'pixi.js';
import { DeviceManager, CanvasEvent } from '../DeviceManager';
import { EventHandler } from '../util/EventDispatcher';
import { Button } from '../util/Button';
import { SceneEvent, UIEvent } from '../data/GameEvents';
import { Paths } from '../Paths';

export class UIContainer extends Container
{
    protected _buttonSpriteSheet: ITextureDictionary | undefined;
    protected _returnButton: Button;
    constructor()
    {
        super();
        this._buttonSpriteSheet = Loader.shared.resources[Paths.BUTTON_ASSETS].textures;

        DeviceManager.getInstance().application.stage.addChild(this);
        EventHandler.getInstance().addEventListener(CanvasEvent.RESIZE,()=>this.onResize());
        this.initUI();
    }

    protected initUI()
    {
        this._returnButton = new Button(this._buttonSpriteSheet['returnButton.png']);

        this.addChild(this._returnButton);


        this._returnButton.addHandler(() => this.return());
        this.onResize();
    }
    
    protected mainMenu()
    {
        EventHandler.getInstance().dispatch({id:UIEvent.MAIN_MENU});
    }

    protected return()
    {
        this.mainMenu();
    }
    

    protected onResize()
    {
        this._returnButton.x = DeviceManager.getInstance().getWidth() / 14;
        this._returnButton.y = 80;
    }
}