import { EventEmitter } from 'events';
import LoggerFactory from '../../libs/logger/LoggerFactory';

const log = LoggerFactory.getLogger(__filename);

export default class IpcRendererController {
    // Custom EventEmitter to be used within the render process:
    private events: EventEmitter;

    constructor() {
        log.info('Initializing ipcMainController...');
        this.events = new EventEmitter();
        // this.createIpcRendererListeners();
        this.createEventListeners();
    }

    // createIpcRendererListeners() {
    //     ipcRenderer.on('window-size', (e, widht, height) => {
    //         this.events.
    //     });
    // }

    // Setting up all event handlers:
    // These functions are called when readDirectory() sends back the result to this event emitter
    //  which then sends it back to TableEvents
    // TODO: Find better names for the events being thrown around
    createEventListeners(): void {
        this.events.on('table:appendItems', (data) => {
            log.debug('EventEmitter signal received -> tableFile:appendItems.');
        });

        this.events.on('table:clearItems', (data) => {
            log.debug('EventEmitter signal received -> tableFile:clearItems.');
        });

        this.events.on('table:clearAndLoadItems', (data) => {
            log.debug(
                'EventEmitter signal received -> table:clearAndLoadItems.'
            );
            log.database(
                `\tData of received from readDirectory() is of length: ${
                    JSON.stringify(data).length
                }`
            );
        });
    }

    getEventEmitter(): EventEmitter {
        return this.events;
    }
}
