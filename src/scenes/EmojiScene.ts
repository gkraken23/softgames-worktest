import { Container, Sprite, Text } from 'pixi.js';
import { MessageHandler } from '../data/MessageHandler';
import { DeviceManager } from '../DeviceManager';
import { ITextStyle } from '../interface/ITextStyle';
import { Random } from '../util/Random';
import { Timer } from '../util/Timer';
import { GameScene } from './GameScene';


export class EmojiScene extends GameScene
{
    protected _style: ITextStyle;
    protected _textContainer: Container;
    protected _textHeadCoordX: number = 0;
    protected _wordSpacing: number = 20;
    protected _timer: Timer;
    protected _active: boolean = false;

    constructor()
    {
        super();
        this._style = { fill: 'white', align: 'left', fontSize: 20 };
        this._textContainer = new Container();
        this._gameObjectContainer.addChild(this._textContainer);

        this._textContainer.y += 100;
        this._timer = new Timer(2000, () => this.showText(), true);

    }

    protected start()
    {
        if (!this._active)
        {
            this._active = true;
            this.showText();
            this._timer.start();
        }
    }


    protected return()
    {
        super.return();
        this._active = false;
        this._timer.kill();
        if (this._textContainer.children.length > 0)
        {
            this._textContainer.removeChildren();
        }
    }



    protected showText()
    {

        if (this._textContainer.children.length > 0)
        {
            this._textContainer.removeChildren();
        }



        let str = "";

        for (let i = 0; i < 3; i++)
        {
            let randomizer = Random.randomRange(0, 1, false);
            if (randomizer > 0.5)
            {
                let randomMessageIdx: number = Random.randomRange(0, MessageHandler.messages.length);
                let randomMessage: string = MessageHandler.messages[randomMessageIdx];
                str += " " + randomMessage;
            }
            else
            {
                let randomMessageIdx: number = Random.randomRange(0, MessageHandler.emojis.length);
                let randomMessage: string = MessageHandler.emojis[randomMessageIdx];
                str += " " + randomMessage;
            }
        }





        this.parse(str);




        this._textContainer.x = -this._textContainer.width / 2;
    }

    public parse(message: string)
    {
        let parsedMessage = message.split('%');

        for (let msg of parsedMessage)
        {
            if (msg.indexOf('$') > -1)
            {

                let textureName = msg.substr(1, msg.length - 2);
                let sprite = new Sprite(this._gameSpriteSheet[textureName]);
                let randScale = Random.randomRange(0.7, 0.8, false);
                // sprite.scale.x = randScale;
                sprite.scale.x = 1;
                // sprite.scale.y = randScale;
                sprite.scale.y = 1;
                this.addImageOrText(sprite);
            }
            else
            {
                this._style.fontSize = Random.randomRange(20, 40);
                let text = new Text(msg, this._style);

                this.addImageOrText(text);
            }
        }
    }


    public addImageOrText(sprite: Sprite)
    {
        let currentWidth = this._textContainer.width;
        this._textContainer.addChild(sprite);
        let currentHeight = this._textContainer.height;

        sprite.x = currentWidth;


        //Reposition y coordinates
        for (let obj of this._textContainer.children)
        {
            let gameObject = obj as Sprite;
            gameObject.y = currentHeight - gameObject.height;


            //Offset text
            if (gameObject instanceof Text)
            {
                gameObject.y -= 30;
            }
        }


        //Adjust scale if container won't fit the canvas
        if (this._gameObjectContainer.width > DeviceManager.getInstance().getWidth())
        {
            do
            {
                this._gameObjectContainer.scale.x *= 0.8;
                this._gameObjectContainer.scale.y *= 0.8;
            }
            while (this._gameObjectContainer.width > DeviceManager.getInstance().getWidth());

        }
        else
        {
            this._gameObjectContainer.scale.x = 1;
            this._gameObjectContainer.scale.y = 1;
        }


    }


}