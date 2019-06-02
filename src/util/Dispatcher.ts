import { IEvent } from '../interface/IEvent';

export class Dispatcher {
    protected _listeners: Array<() => void>;

    constructor() {
        this._listeners = [];
    }

    public addListener(listener: (arg?: any) => void): Function {
        this._listeners.push(listener);

        let unsubscribe = this.removeListener.bind(this, listener);
        return unsubscribe;
    }

    public dispatch(data?: IEvent | any) {
        for (let listener of this._listeners) {
            listener.call(null, data || data === 0 ? data : this);
        }
    }

    public removeAllListeners() {
        this._listeners = [];
    }

    public removeListener(handler: (arg?: any) => void) {
        for (let i = 0; i < this._listeners.length; i++) {
            if (this._listeners[i].toString() === handler.toString()) {
                this._listeners.splice(i, 1);
                break;
            }
        }
    }

    public get numberOfListeners(): number {
        return this._listeners.length;
    }
}
