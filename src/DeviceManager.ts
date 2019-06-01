import {Application} from 'pixi.js';

// export enum DeviceOrientation
// {
//     PORTRAIT = "ORIENTATION_PORTRAIT",
//     LANDSCAPE = "ORIENTATION_LANDSCAPE"
// }

export class DeviceManager
{
    private static _instance: DeviceManager;


    protected _application:Application;
    protected _mainDiv: HTMLDivElement;
    // protected _orientation: string;

    private constructor()
    {

       this._application = new Application();

   
        this._mainDiv = this.createMainDiv();

        this._mainDiv.appendChild(this._application.view);
        document.body.appendChild(this._mainDiv);
        // this._orientation = DeviceOrientation.LANDSCAPE;

  
        document.documentElement.requestFullscreen();
        window.addEventListener('resize', () => this.onWindowResize());
        this.onWindowResize();
    }

    protected onWindowResize()
    {
            this._application.view.width = window.innerWidth;
            this._application.view.height = window.innerHeight;

        // let newOrientation: string = this._orientation;
        // if (this._application.view.width < this._application.view.height)
        // {
        //     newOrientation = DeviceOrientation.PORTRAIT;
        // }
        // else
        // {
        //     newOrientation = DeviceOrientation.LANDSCAPE;
        // }

        // if (newOrientation != this._orientation)
        // {
        //     this._orientation = newOrientation;

        //     // let orientationEvent: IEvent = {
        //     //     id: OrientationEvent.CHANGE,
        //     //     data: this._orientation
        //     // }
        //     // GlobalStateEventsHandler.getInstance().dispatch(orientationEvent);
        // }

        // GlobalStateEventsHandler.getInstance().dispatch({ id: CanvasChangeEvent.RESIZE })
    }

    public getWidth():number
    {
        return this._application.view.width;
    }

    public getHeight():number
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

    public get application():Application
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