import { TweenLite } from 'gsap';
import { Container, ITextureDictionary, Loader } from 'pixi.js';
import { Paths } from './Paths';
import { Scene } from './Scene';
import { FpsCounter } from './util/FpsCounter';
import { LinkedNode } from './util/LinkedNode';
import { Timer } from './util/Timer';

enum CardTypes
{
    CLOVER = 'clover.png',
    SPADE = 'spade.png',
    HEART = 'heart.png',
    DIAMOND = 'diamond.png'
}


export class CardScene extends Scene
{
    protected _cardSpriteSheet: ITextureDictionary | undefined;
    protected _fpsCounter: FpsCounter;
    protected _cardContainer: Container;
    protected _cards: LinkedNode[];
    protected _counter: number;
    protected _targetNode: LinkedNode;
    protected _targetX: number = 100;
    protected _active: boolean = false;
    static CardLength: number = 10;

    constructor()
    {
        super();
        this._cards = [];
        this._counter = CardScene.CardLength;
        this._cardContainer = new Container;
        this._cardContainer.x += 200;
        this._fpsCounter = new FpsCounter(this);
        this._cardSpriteSheet = Loader.shared.resources[Paths.CARD_ASSETS].textures;
        this.init();
        this.addChild(this._cardContainer);

        console.log(this);

    }

    protected init()
    {
        for (let i = 0; i < CardScene.CardLength; i++)
        {
            let node = new LinkedNode(this._cardSpriteSheet[CardTypes.CLOVER], i * 50);
            let sprite = node.sprite;
            this._cardContainer.addChild(sprite);
            this._cards.push(node);

            if (i > 0)
            {
                this._cards[i - 1].linkBefore(node);
            }
        }

        this._cards[CardScene.CardLength - 1].linkBefore(this._cards[0]);
        this._targetNode = this._cards[CardScene.CardLength - 1];


    }

    protected onPlayButton()
    {
        if (!this._active)
            let timer = new Timer(1000, () => this.run(), true);
    }

    public start()
    {
        let targetY = this._targetNode.next.originY;
        if (this._targetX > 0)
        {
            TweenLite.to(this._cards[this._counter].sprite, 2, { x: this._targetX, y: targetY });
        }
        else
        {
            TweenLite.to(this._cards[this._counter].sprite, 2, { x: this._targetX, y: this._cards[this._counter].originY });
        }
        this._targetNode = this._targetNode.next;
    }



    protected run()
    {
        if (this._counter > 0)
        {
            this._counter--;
            this.start();
        }
        else
        {
            this.reset();
        }
    }

    public reset()
    {
        this._counter = CardScene.CardLength;
        this._targetX *= -1;
    }
}