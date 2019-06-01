import { Application } from 'pixi.js';
import { EventHandler } from './util/EventDispatcher';
import { IEvent } from './util/IEvent';


export enum CanvasEvent
{
    RESIZE = "RESIZE"
}
export class DeviceManager
{
    private static _instance: DeviceManager;


    protected _application: Application;
    protected _mainDiv: HTMLDivElement;

    private constructor()
    {

        this._application = new Application();


        this._mainDiv = this.createMainDiv();

        this._mainDiv.appendChild(this._application.view);
        document.body.appendChild(this._mainDiv);


        document.documentElement.requestFullscreen();
        window.addEventListener('resize', () => this.onWindowResize());
        this.onWindowResize();
    }

    protected onWindowResize()
    {
        this._application.view.width = window.innerWidth;
        this._application.view.height = window.innerHeight;


        EventHandler.getInstance().dispatch({ id: CanvasEvent.RESIZE })
    }

    public getWidth(): number
    {
        return this._application.view.width;
    }

    public getHeight(): number
    {
        return this._application.view.height;
    }

    public static getInstance()
    {
        if (!DeviceManager._instance)
        {
            DeviceManager._instance = new DeviceManager();
        }

        return DeviceManager._instance;
    }

    public get application(): Application
    {
        return this._application;
    }


    protected createMainDiv(): HTMLDivElement
    {
        let divElement = document.createElement("div");
        divElement.id = "mainDiv";

        return divElement;
    }

    // public getAspectRatio(): number
    // {
    //     return this._application.wi / this.getCanvasHeight();
    // }
}