import { ipcRenderer, Rectangle } from 'electron';
import { EventEmitter } from 'events';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import RootContainer from '../containers/RootContainer';

const log = LoggerFactory.getUILogger(__filename);

// This class is made to be used statically to prevent from making
//  more than one instance of the event emitter inside it
export default class UIController {
    // Custom EventEmitter to be used within the render process:
    private static events: EventEmitter;

    private static rootContainerRef: React.RefObject<RootContainer>;

    // Called by UIEntry.ts
    static init(rootContainerRef: React.RefObject<RootContainer>) {
        log.info('Initializing ipcMainController...');
        this.events = new EventEmitter();
        this.rootContainerRef = rootContainerRef;
        this.createEventListeners();
    }

    // createIpcRendererListeners() {
    //     ipcRenderer.on('window-size', (e, width, height) => {
    //         this.events.
    //     });
    // }

    // Setting up all event handlers:

    static createEventListeners(): void {
        // Event to get the initial window size after the mainWindow was finished being created
        ipcRenderer.on('initial-window-size', (e, width, height) => {
            log.debug('initial-window-size was received');
            this.rootContainerRef.current?.initialWindowSize(width, height);
        });

        ipcRenderer.on('window-resized', (e, newWindowSize: Rectangle) => {
            // this.rootContainerRef.current?.windowResized(newWindowSize);
        });

        // These functions are called when readDirectory() sends back the result to this event emitter
        //  which then sends it back to TableEvents
        // TODO: Find better names for the events being thrown around
    }

    // For any class to use when they want to get the event emitter instance
    static getEventEmitter(): EventEmitter {
        return this.events;
    }
}
