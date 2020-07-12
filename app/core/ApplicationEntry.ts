import { BrowserWindow } from 'electron';
import LoggerFactory from '../libs/logger/LoggerFactory';
import MenuBuilder from './utils/menu';
import IpcMainController from './controller/IpcMainController';

const log = LoggerFactory.getLogger(__filename);

export default class ApplicationEntry {
    private mainWindow: BrowserWindow;

    private ipcMainController: IpcMainController;

    private menuBuilder: MenuBuilder;

    constructor(mainWindow: BrowserWindow) {
        log.info('Application entry point initialized!');
        this.mainWindow = mainWindow;
        this.ipcMainController = new IpcMainController(this.mainWindow);
        this.menuBuilder = new MenuBuilder(this.mainWindow);
    }

    init(): void {
        this.ipcMainController.init();
        this.menuBuilder.buildMenu();
    }
}
