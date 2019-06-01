import { Ticker } from 'pixi.js';

export class Timer
{
    protected _startTime: number;
    protected _duration: number;
    protected _loop:boolean|undefined = false;
    protected _callback:() => void;

    constructor(duration: number, cb:() => void,loop?:boolean)
    {
        this._duration = duration;
        this._startTime = performance.now();
        this._loop = loop;
        this._callback = cb;

        
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

    public start()
    {
        Ticker.shared.add(this.update,this);
    }

    public kill()
    {
        Ticker.shared.remove(this.update,this);
    }
}