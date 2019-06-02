import { Dispatcher } from './Dispatcher';
import { IEvent } from '../interface/IEvent';

/**
 * A collection of dispatchers that are assigned to specific Events
 */
export class EventHandler {
    private static _instance:EventHandler;
    private _handlers: { [key: string]: Dispatcher } = {};

    private constructor()
    {

    }

    public static getInstance()
    {
        if (!EventHandler._instance)
        {
            EventHandler._instance = new EventHandler();
        }

        return EventHandler._instance;
    }

    /**
     * Create a dispatcher if it does not exist and add the bound function to it.
     * @param eventId the event's identifier, this will be converted to lower case
     * @param handler the bound function
     */
    public addEventListener(eventId: string, handler: (arg?: any) => void): void {
        let eventName = eventId.toLocaleLowerCase();
        if (!this._handlers[eventName]) {
            this._handlers[eventName] = new Dispatcher();
        }

        this._handlers[eventName].addListener(handler);
    }

    /**
     * Calls all functions bound to the event
     * @param event the event object, the id of the object will be converted to lower case
     */
    public dispatch(event: IEvent): void {

        let eventName = event.id.toLowerCase();

        if (!event.id || !this._handlers[eventName]) {
            return;
        }

        this._handlers[eventName].dispatch(event);
    }

    /**
     * Removes one bound function from the Dispatcher
     * @param eventName the name of the event
     * @param handler the bound function to be removed
     */
    public removeEventListener(eventName: string, handler: (arg?: any) => void): void {
        eventName = eventName.toLowerCase();
        if (this._handlers[eventName]) {
            this._handlers[eventName].removeListener(handler);

            if (this._handlers[eventName].numberOfListeners < 1) {
                this.killDispatcher(eventName);
            }
        }
    }

    /**
     * Removes the dispatcher for the specified event.
     * @param eventName the name of the event
     */
    public killEvent(eventName: string) {
        eventName = eventName.toLowerCase();
        if (this._handlers[eventName]) {
            this.killDispatcher(eventName);
        }
    }

    /**
     * This is shared between remoevEventListener and killEvent
     * Deletes the event from the EventHandler instance
     * @param eventName the name of the event
     */
    protected killDispatcher(eventName: string) {
        this._handlers[eventName] = null;
        delete this._handlers[eventName];
    }
}
