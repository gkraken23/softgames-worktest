import { ITextureDictionary, Loader, Container } from 'pixi.js';
import { CanvasEvent, DeviceManager } from '../DeviceManager';
import { Paths } from '../Paths';
import { Button } from '../util/Button';
import { EventHandler } from '../util/EventDispatcher';
import { SceneEvent, UIEvent } from '../data/GameEvents';

export class MainMenu extends Container
{
    protected _buttonSpriteSheet: ITextureDictionary | undefined;
    protected _mainMenuUIContainer:Container;
    protected _buttons:Button[];

    constructor()
    {
        super();
        this._mainMenuUIContainer = new Container
        this._buttonSpriteSheet = Loader.shared.resources[Paths.BUTTON_ASSETS].textures;
        DeviceManager.getInstance().application.stage.addChild(this);
        this._buttons = [];

   
        for (let i =0; i<3; i++)
        {
            this._buttons.push(new Button(this._buttonSpriteSheet['buttonBackground.png']));
            this._mainMenuUIContainer.addChild(this._buttons[i]);
            this._buttons[i].y=i*60;
        }



        this._buttons[0].addText("Cards");
        this._buttons[1].addText("TextTool");
        this._buttons[2].addText("Particle");


        this._buttons[0].addHandler(()=>this.onCards());
        this._buttons[1].addHandler(()=>this.onEmoji());
        this._buttons[2].addHandler(()=>this.onParticle());


        this.addChild(this._mainMenuUIContainer);
        EventHandler.getInstance().addEventListener(CanvasEvent.RESIZE, () => this.onResize());

        
        this.onResize();
    }

    protected onCards()
    {
        EventHandler.getInstance().dispatch({id:UIEvent.SCENE_SELECT,data:SceneEvent.CARD});
    }

    protected onEmoji()
    {
        EventHandler.getInstance().dispatch({id:UIEvent.SCENE_SELECT,data:SceneEvent.TEXT_TOOL});
    }

    protected onParticle()
    {
        EventHandler.getInstance().dispatch({id:UIEvent.SCENE_SELECT,data:SceneEvent.PARTICLE});
    }

    protected onResize()
    {
        this._mainMenuUIContainer.x = DeviceManager.getInstance().getWidth() / 2;
        this._mainMenuUIContainer.y = DeviceManager.getInstance().getHeight() / 2;
    }
}