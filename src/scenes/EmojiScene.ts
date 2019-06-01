import { Container, Sprite, Text } from 'pixi.js';
import { ASSET_NAMES } from '../Game';
import { ITextStyle } from '../interface/ITextStyle';
import { Scene } from './Scene';
import { Random } from '../util/Random';


//TODO : Randomize patterns, get messages from JSON
export class EmojiScene extends Scene
{
    protected _randomFontSize: number = 100;
    protected _style: ITextStyle;
    protected _textImageContainer: Container;
    protected _defaultScale:number = 0.5;
    protected _textHeadCoordX:number=0;
    protected _wordSpacing:number=20;
    
    private _value : string;
    public get value() : string {
        return this._value;
    }
    public set value(v : string) {
        this._value = v;
    }
    

    constructor()
    {
        super();
        this._style = { fill: 'white', align: 'left', fontSize: 20 };
        this._textImageContainer = new Container();
        this._gameObjectContainer.addChild(this._textImageContainer);
        this.init();
    }

    protected onPlayButtonDown()
    {
        super.onPlayButtonDown();
        if(this._textImageContainer.children.length>0)
        {
            this._textImageContainer.removeChildren();
        }

        this._style.fontSize = Random.randomRange(20,100);
        let text = new Text('WOW',this._style);

        let sprite = new Sprite(this._gameSpriteSheet[ASSET_NAMES.WINK]);
        let randScale = Random.randomRange(0.5,1,false);
        sprite.scale.x = randScale;
        sprite.scale.y = randScale;

        this.addImageOrText(sprite);
        this.addImageOrText(text);
    }

    protected init()
    {
        // this._style.fontSize = 20;
        // const sprite = new Sprite(this._gameSpriteSheet[ASSET_NAMES.WINK]);
        // sprite.scale.x = this._defaultScale;
        // sprite.scale.y = this._defaultScale;
        // let text = new Text('Wow', this._style);
        // this.addImageOrText(text);

        // this.addImageOrText(sprite);

        // this._style.fontSize = 50;
        //  text = new Text('Glenny', this._style);

        //  this.addImageOrText(text);
        //  text = new Text('test', this._style);
        //  this._style.fontSize = 200;
        //  this.addImageOrText(text);
    }

    public addImageOrText(sprite: Sprite)
    {
        this._textImageContainer.addChild(sprite);
        for (let i = 1; i < this._textImageContainer.children.length; i++)
        {
            let prevSprite = this._textImageContainer.children[i - 1] as Sprite;
            this._textHeadCoordX = sprite.x;
            sprite.x = prevSprite.width+this._textHeadCoordX+this._wordSpacing;
        }
    }
}