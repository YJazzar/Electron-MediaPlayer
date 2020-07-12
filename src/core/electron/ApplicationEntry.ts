import {app, BrowserWindow} from "electron";
import {LoggerFactory} from "libs/logger/LoggerFactory";
import {IpcMainController} from "../controller/IpcMainController";

const log = LoggerFactory.getLogger(__filename);

export class ApplicationEntry {

    private window: BrowserWindow;
    private ipcMainController: IpcMainController;

    constructor(window: BrowserWindow) {
        log.info('Application entry point initialized!');
        this.window = window;
        this.ipcMainController = new IpcMainController();

        // Quit app when closed
        window.on('closed', function () {
            app.exit();
        });

        app.on('window-all-closed', () => {
            log.info('All windows of the application was closed... Quitting application now.')
            app.exit();
        })

        window.webContents.on('did-finish-load', () => {
            log.info('Did-Finish-Load event was received');
            window.webContents.send('sendStartup');
        });
    }
}