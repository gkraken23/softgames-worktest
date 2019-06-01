import { Text } from 'pixi.js';
import { Scene } from '../Scene';

export class FpsCounter 
{
    protected _lastCalled: number;
    protected _fps: number;
    protected _textField:Text;

     constructor(scene:Scene)
    {
        this._textField = new Text('Glen',{ font: '35px Snippet', fill: 'white', align: 'left' });
        scene.addChild(this._textField);
        this._lastCalled = performance.now();
        this._fps = 0;
        this.update();
    }


    protected update()
    {
        let time = performance.now();
        let fps  = this.checkPerformance(time);
        this._textField.text = fps.toString();
        requestAnimationFrame(() => this.update());
    }

    protected checkPerformance(currentTime: number): number
    {
        let delta = (currentTime - this._lastCalled) / 1000;
        this._lastCalled = currentTime;
        this._fps = 1 / delta;

        return Math.round(this._fps);
    }
}