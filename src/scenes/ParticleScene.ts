import { Emitter } from 'pixi-particles';
import { Container, Sprite, Ticker } from 'pixi.js';
import { DeviceManager } from '../DeviceManager';
import { IGameScene } from '../interface/IGameScene';
import { GameScene } from './GameScene';
import { UIContainer } from './UIContainer';

export class ParticleScene extends GameScene implements IGameScene
{
    protected _emitter: Emitter;
    protected _particleContainer: Container;
    protected _elapsed: number;
    protected _candleSprite: Sprite;

    constructor(uiContainer: UIContainer)
    {
        super(uiContainer);
        this._particleContainer = new Container();
        this._emitter = new Emitter(this._particleContainer, [this._gameSpriteSheet['fire1.png'], this._gameSpriteSheet['fire2.png']], this.particleConfig());
        this._gameObjectContainer.addChild(this._particleContainer);
    }

    protected onResize()
    {
        super.onResize();
        this._gameObjectContainer.y = (DeviceManager.getInstance().getHeight() / 2) + 100;
    }

    public return()
    {
        Ticker.shared.remove(this.update, this);
        this._emitter.emit = false;
    }


    public start()
    {
        this._elapsed = performance.now();
        Ticker.shared.add(this.update, this);
        this._emitter.emit = true;
    }

    protected update()
    {
        let now = performance.now();
        this._emitter.update((now - this._elapsed) * 0.001);
        this._elapsed = now;
    }


    private particleConfig()
    {
        return {
            "alpha": {
                "start": 0.62,
                "end": 0
            },
            "scale": {
                "start": 2,
                "end": 4,
                "minimumScaleMultiplier": 1
            },
            "speed": {
                "start": 500,
                "end": 500,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 265,
                "max": 275
            },
            "noRotation": false,
            "lifetime": {
                "min": 0.3,
                "max": 0.6
            },
            "blendMode": "add",
            "frequency": 0.01,
            "emitterLifetime": -1,
            "maxParticles": 10,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "rect",
            "spawnRect": {
                "x": 0,
                "y": 0,
                "w": 0,
                "h": 0
            }
        };
    }
}    