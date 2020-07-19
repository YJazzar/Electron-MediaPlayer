import { BrowserWindow } from 'electron';
import LoggerFactory from '../libs/logger/LoggerFactory';
import IpcMainController from './controllers/IpcMainController';
import ConfigManager from './persist/ConfigManager';

const log = LoggerFactory.getLogger(__filename);

export default class ApplicationEntry {
    private mainWindow: BrowserWindow;

    private ipcMainController: IpcMainController;

    // private menuBuilder: MenuBuilder;

    constructor(mainWindow: BrowserWindow) {
        log.info('Application entry point initialized!');

        // Show startup message
        log.info('*******************************');
        log.info('-------------------------------');
        log.info('*****  Program started   *****');
        log.info('-------------------------------');
        log.info('*******************************');

        this.mainWindow = mainWindow;
        this.ipcMainController = new IpcMainController(this.mainWindow);
        // this.menuBuilder = new MenuBuilder(this.mainWindow);
    }

    init(): void {
        this.ipcMainController.init();
        // this.menuBuilder.buildMenu();
        const db = new ConfigManager();
    }
}
