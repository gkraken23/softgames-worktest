import { Container, ITextureDictionary, Loader, Sprite } from 'pixi.js';
import { DeviceManager } from './DeviceManager';
import { Paths } from './Paths';

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

        this.initUI();
    }

    protected initUI()
    {
        let playButton: Sprite = new Sprite(this._buttonSpriteSheet['playButton.png']);
        playButton.interactive = true;
        playButton.buttonMode = true;
        playButton.on('pointerdown', ()=>this.onPlayButton()));


        playButton.x = (DeviceManager.getInstance().getWidth()/2)-(playButton.width/2);
        playButton.y = DeviceManager.getInstance().getHeight()-200;
        this._uiContainer.addChild(playButton);
    }

    protected onPlayButton()
    {
        console.log("yeah");
    }
}