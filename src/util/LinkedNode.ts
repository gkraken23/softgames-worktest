import { Sprite } from 'pixi.js';
export class LinkedNode
{
    protected _sprite:Sprite;
    protected _next:LinkedNode;
    protected _originY:number;

    constructor(texturePath:string,originY:number)
    {
        this._sprite = new Sprite(texturePath);
        this._sprite.y = originY;
        this._sprite.x = -100;
        this._originY = originY;
    }

    public get sprite():Sprite
    {
        return this._sprite;
    }

    public get next():LinkedNode
    {
        return this._next;
    }

    public linkBefore(node:LinkedNode)
    {
        this._next = node;
    }

    public get originY():number
    {
        return this._originY;
    }
}