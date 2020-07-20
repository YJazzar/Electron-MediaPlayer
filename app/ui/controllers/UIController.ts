import { ipcRenderer, Rectangle, IpcRendererEvent } from 'electron';
import { EventEmitter } from 'events';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import RootContainer from '../containers/RootContainer';

const log = LoggerFactory.getUILogger(__filename);

// This class is a singleton class
export default class UIController {
    private static instance: UIController;

    // Custom EventEmitter to be used within the render process:
    private events: EventEmitter;

    private rootContainerRef: React.RefObject<RootContainer>;

    // Called by UIEntry.ts
    static getInstance(
        rootContainerRef?: React.RefObject<RootContainer>
    ): UIController {
        if (!UIController.instance && rootContainerRef) {
            UIController.instance = new UIController(rootContainerRef);
        }
        return UIController.instance;
    }

    private constructor(rootContainerRef: React.RefObject<RootContainer>) {
        log.info('Initializing ipcMainController...');
        this.events = new EventEmitter();
        this.rootContainerRef = rootContainerRef;
        this.createEventListeners();
    }

    // Setting up all event handlers:

    private createEventListeners(): void {
        // Event to get the initial window size after the mainWindow was finished being created
        ipcRenderer.on(
            'initial-window-size',
            this.setInitialWindowSize.bind(this)
        );

        // ipcRenderer.on('window-resized', this.windowResizedEvent.bind(this));
    }

    setInitialWindowSize(_e: IpcRendererEvent, width: number, height: number) {
        log.debug('initial-window-size was received');
        this.rootContainerRef.current?.initialWindowSize(width, height);
    }

    // windowResizedEvent(_e: IpcRendererEvent, newWindowSize: Rectangle) {
    //     // this.rootContainerRef.current?.windowResized(newWindowSize);
    // }

    // For any class to use when they want to get the event emitter instance
    getEventEmitter(): EventEmitter {
        return this.events;
    }
}
