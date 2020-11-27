import { ipcRenderer, IpcRendererEvent } from 'electron';
import { EventEmitter } from 'events';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import FileDetails from '../../libs/templates/FileDetails';
import RootContainer from '../containers/RootContainer';
import StateController from './StateController';

const log = LoggerFactory.getUILogger(__filename);

// This class is a singleton class
export default class UIController {
    private static instance: UIController;

    // Custom EventEmitter to be used within the render process:
    private events: EventEmitter;

    private rootContainerRef: React.RefObject<RootContainer>;

    // Called by UIEntry.ts
    static getInstance(rootContainerRef?: React.RefObject<RootContainer>): UIController {
        if (!UIController.instance && rootContainerRef) {
            UIController.instance = new UIController(rootContainerRef);
        }
        if (!UIController.instance && !rootContainerRef) {
            log.error('Could not create an instance of UIController without a reference to rootContainer');
        }
        return UIController.instance;
    }

    private constructor(rootContainerRef: React.RefObject<RootContainer>) {
        log.info('Initializing UIController...');
        this.events = new EventEmitter();
        this.rootContainerRef = rootContainerRef;
        this.createEventListeners();
    }

    // Setting up all event handlers:

    // Note: the event 'window-resized' was implemented in RootContainer.tsx
    private createEventListeners(): void {
        // Event to get the initial window size after the mainWindow was finished being created
        ipcRenderer.on('initial-window-size', this.setInitialWindowSize.bind(this));
        ipcRenderer.on('status:data/index.json updated', this.handleNewImports.bind(this));
    }

    setInitialWindowSize(_e: IpcRendererEvent, width: number, height: number) {
        log.debug('initial-window-size was received');
        this.rootContainerRef.current?.initialWindowSize(width, height);
    }

    // This will be called to notify the renderer process that the data/index.json has changed
    handleNewImports(_e: IpcRendererEvent, newContents: FileDetails[]) {
        const { instance } = StateController;
        if (instance == null) {
            log.error('A new import was detected, but StateController.instance was not defined. Could not forward the new data');
        }
        instance.ipcHandleNewImports(newContents);

        this.rootContainerRef.current?.mainPanelRef.current?.updateTable(newContents);
    }

    // // For any class to use when they want to get the event emitter instance
    // getEventEmitter(): EventEmitter {
    //     return this.events;
    // }
}
