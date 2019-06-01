import { Ticker } from 'pixi.js';

export class Timer
{
    protected _startTime: number;
    protected _duration: number;
    protected _loop:boolean = false;
    protected _callback:() => void;

    constructor(duration: number, cb:() => void,loop?:boolean)
    {
        this._duration = duration;
        this._startTime = performance.now();
        this._loop = loop;
        this._callback = cb;

        Ticker.shared.add(this.update,this);
    }

    public update()
    {
        let currentTime = performance.now();
        if (currentTime - this._startTime >= this._duration)
        {
           this._callback.call(null);
           if(this._loop)
           {
               this._startTime = performance.now();
           }
           else
           {
               this.kill();
           }
        }
    }

    public kill()
    {
        Ticker.shared.remove(this.update,this);
    }
}