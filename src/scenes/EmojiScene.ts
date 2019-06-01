import { Container, Sprite, Text } from 'pixi.js';
import { MessageHandler } from '../data/MessageHandler';
import { DeviceManager } from '../DeviceManager';
import { ITextStyle } from '../interface/ITextStyle';
import { Random } from '../util/Random';
import { Scene } from './Scene';


//TODO : Randomize patterns, get messages from JSON
export class EmojiScene extends Scene
{
    protected _style: ITextStyle;
    protected _textImageContainer: Container;
    protected _textHeadCoordX: number = 0;
    protected _wordSpacing: number = 20;


    constructor()
    {
        super();
        this._style = { fill: 'white', align: 'left', fontSize: 20 };
        this._textImageContainer = new Container();
        this._gameObjectContainer.addChild(this._textImageContainer);
        this._gameObjectContainer.x = DeviceManager.getInstance().getWidth() / 2;
        this._textImageContainer.y += 100;

        console.log(this._textImageContainer);
    }

    protected onPlayButtonDown()
    {
        super.onPlayButtonDown();
        if (this._textImageContainer.children.length > 0)
        {
            this._textImageContainer.removeChildren();
        }

        this._style.fontSize = Random.randomRange(20, 50);

        // let randomMessageIdx: number = Random.randomRange(0, 3);
        let randomMessageIdx: number = 0;
        let randomMessage: string = MessageHandler.getMessage(randomMessageIdx);

        this.parse(randomMessage);




        this._textImageContainer.x = -this._textImageContainer.width / 2;
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
                let randScale = Random.randomRange(0.2, 0.8, false);
                sprite.scale.x = randScale;
                sprite.scale.y = randScale;
                this.addImageOrText(sprite);
            }
            else
            {
                this._style.fontSize = Random.randomRange(20, 50);
                let text = new Text(msg, this._style);

                this.addImageOrText(text);
            }
        }
    }


    public addImageOrText(sprite: Sprite)
    {
        this._textImageContainer.addChild(sprite);
        for (let i = 1; i < this._textImageContainer.children.length; i++)
        {
            let prevSprite = this._textImageContainer.children[i - 1] as Sprite;

            this._textHeadCoordX = sprite.x;
            sprite.x = prevSprite.width + this._textHeadCoordX + this._wordSpacing;

            if (prevSprite.height < this._textImageContainer.height)
            {

                prevSprite.y = this._textImageContainer.height - prevSprite.height;
            }
        }

        sprite.y = this._textImageContainer.height - sprite.height;

    }


}