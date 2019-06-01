import { ITextureDictionary, Loader } from 'pixi.js';
import { CanvasEvent, DeviceManager } from '../DeviceManager';
import { Paths } from '../Paths';
import { Button } from '../util/Button';
import { EventHandler } from '../util/EventDispatcher';
import { Scene } from './Scene';

export class MainMenu extends Scene
{
    protected _buttonSpriteSheet: ITextureDictionary | undefined;
    protected _buttons:Button[];

    constructor()
    {
        super();
        this._buttonSpriteSheet = Loader.shared.resources[Paths.BUTTON_ASSETS].textures;
        DeviceManager.getInstance().application.stage.addChild(this);
        this._buttons = [];

   
        for (let i =0; i<3; i++)
        {
            this._buttons.push(new Button(this._buttonSpriteSheet['buttonBackground.png']));
            this._uiContainer.addChild(this._buttons[i]);
            this._buttons[i].y=i*60;
        }



        this._buttons[0].addText("Cards");
        this._buttons[1].addText("TextTool");
        this._buttons[2].addText("Particle");


        this._buttons[0].addHandler(()=>this.onCards());
        this._buttons[1].addHandler(()=>this.onEmoji());
        this._buttons[2].addHandler(()=>this.onParticle());

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

    protected onParticle()
    {
        EventHandler.getInstance().dispatch({id:"SceneSelect",data:"Particle"});
    }

    protected onResize()
    {
        this._uiContainer.x = DeviceManager.getInstance().getWidth() / 2;
        this._uiContainer.y = DeviceManager.getInstance().getHeight() / 2;

    }
}