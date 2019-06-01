import { ITextureDictionary, Loader } from 'pixi.js';
import { CanvasEvent, DeviceManager } from '../DeviceManager';
import { Paths } from '../Paths';
import { Button } from '../util/Button';
import { EventHandler } from '../util/EventDispatcher';
import { Scene } from './Scene';

export class MainMenu extends Scene
{
    protected _buttonSpriteSheet: ITextureDictionary | undefined;
    constructor()
    {
        super();
        this._buttonSpriteSheet = Loader.shared.resources[Paths.BUTTON_ASSETS].textures;
        DeviceManager.getInstance().application.stage.addChild(this);
        let cardsButton = new Button(this._buttonSpriteSheet['buttonBackground.png']);
        let textToolButton = new Button(this._buttonSpriteSheet['buttonBackground.png']);

        cardsButton.y = 50;
        textToolButton.y = 100;

        this._uiContainer.addChild(cardsButton);
        this._uiContainer.addChild(textToolButton);

        cardsButton.addText("Cards");
        textToolButton.addText("TextTool");


        cardsButton.addHandler(()=>this.onCards());
        textToolButton.addHandler(()=>this.onEmoji());

        EventHandler.getInstance().addEventListener(CanvasEvent.RESIZE, () => this.onResize());

        
        this.onResize();
    }

    protected onCards()
    {
        EventHandler.getInstance().dispatch({id:"SceneSelect",data:"Card"});
    }

    protected onEmoji()
    {
        EventHandler.getInstance().dispatch({id:"SceneSelect",data:"Emoji"});
    }

    protected onResize()
    {
        this._uiContainer.x = DeviceManager.getInstance().getWidth() / 2;
        this._uiContainer.y = DeviceManager.getInstance().getHeight() / 2;

    }
}