import { Sprite, Texture, Text } from 'pixi.js';
export class Button extends Sprite
{
    protected _callbacks: Array<() => void>;

    constructor(texture: Texture)
    {
        super(texture);
        this._callbacks = [];
        this.interactive = true;
        this.buttonMode = true;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.on('pointerdown', () => this.onButtonDown());
        this.on('pointerup', () => this.onButtonUp());
    }

    protected onButtonDown()
    {
        this.scale.x = 0.9;
        this.scale.y = 0.9;

        for (let cb of this._callbacks)
        {
            cb.call(null);
        }
    }

    protected onButtonUp()
    {
        this.scale.x = 1;
        this.scale.y = 1;
    }

    public addHandler(callback: (arg?: any) => void)
    {
        this._callbacks.push(callback);
    }

    public addText(name: string)
    {
        let text = new Text(name, { fill: 'black', align: 'left', fontSize: 20 });
        text.anchor.x=0.5;
        text.anchor.y=0.5;
        text.x = this.width/2-text.width;
        this.addChild(text);
    }

}