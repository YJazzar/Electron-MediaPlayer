import {BrowserWindow} from "electron";
import {LoggerFactory} from "libs/logger/LoggerFactory";

const log = LoggerFactory.getLogger(__filename);

export class ApplicationEntry {

    private window: BrowserWindow;

    constructor(window: BrowserWindow) {
        log.info('Application entry point initialized!');
        this.window = window;
    }
}