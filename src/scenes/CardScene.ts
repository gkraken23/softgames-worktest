import { TweenLite, TweenMax } from 'gsap';
import { FpsCounter } from '../util/FpsCounter';
import { LinkedNode } from '../util/LinkedNode';
import { Timer } from '../util/Timer';
import { GameScene } from './GameScene';



export class CardScene extends GameScene
{
    protected _fpsCounter: FpsCounter;
    protected _cards: LinkedNode[];
    protected _counter: number;
    protected _targetNode: LinkedNode;
    protected _targetX: number = 250;
    protected _active: boolean = false;
    protected _timer: Timer;
    static CardLength: number = 144;

    constructor()
    {
        super();
        this._cards = [];
        this._counter = CardScene.CardLength - 1;
        this._gameObjectContainer.sortableChildren = true;
        this._fpsCounter = new FpsCounter(this);


        this.init();
        this._timer = new Timer(1000, () => this.run(), true);

    }

    protected init()
    {
        for (let i = 0; i < CardScene.CardLength; i++)
        {
            let node = new LinkedNode(this._gameSpriteSheet['diamond.png'], i * 10);
            let sprite = node.sprite;
            sprite.zIndex = i + 1;
            this._gameObjectContainer.addChild(sprite);
            this._cards.push(node);

            if (i > 0)
            {
                this._cards[i - 1].linkBefore(node);
            }
        }

        this._cards[CardScene.CardLength - 1].linkBefore(this._cards[0]);
        this._targetNode = this._cards[CardScene.CardLength - 1];
    }

    protected start()
    {
        if (!this._active)
        {
            if (this._counter < 1)
            {
                this.reset();
            }
            this.run();
            this._timer.start();
            this._active = true;
        }
    }

    protected return()
    {

        TweenMax.killAll();
        this._timer.kill();
        this.reset();
        this._active = false;
        super.return();
    }

    public move()
    {
        let count = this._counter;
        let targetY = this._targetNode.next.originY;
        let tweenable = this._cards[this._counter].sprite;

        TweenLite.to(tweenable, 2, { x: this._targetX, y: targetY, onComplete: () => this.tweenComplete(count) });
        tweenable.zIndex = (CardScene.CardLength - 1) - count;
        this._targetNode = this._targetNode.next;
    }

    protected tweenComplete(count: number)
    {
        if (count === 0)
        {
            this._active = false;
        }
    }


    protected run()
    {
        if (this._counter >= 0)
        {
            this.move();
            this._counter--;
        }
        else
        {
            this._timer.kill();
        }
    }

    public reset()
    {
        this._targetNode = this._cards[CardScene.CardLength - 1];
        this._counter = CardScene.CardLength - 1;

        for (let i = 0; i < CardScene.CardLength; i++)
        {
            this._cards[i].sprite.zIndex = i;
            this._cards[i].sprite.x = 0;
            this._cards[i].sprite.y = this._cards[i].originY;
        }
    }


    protected onResize()
    {
        super.onResize();
        this._gameObjectContainer.x -= 150;
    }
}