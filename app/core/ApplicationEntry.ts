import { BrowserWindow, Menu, MenuItem, MenuItemConstructorOptions } from 'electron';
import LoggerFactory from '../libs/logger/LoggerFactory';
import getMenuTemplate from '../libs/templates/MenuBarTemplate';
import IpcMainController from './controllers/IpcMainController';
import DirectoryOperations from './fileOperations/DirectoryOperations';

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
    }

    init(): void {
        // Set up the Event Listeners
        this.ipcMainController.init();

        // Insert menu:
        const menuTemplate = Menu.buildFromTemplate(
            getMenuTemplate(this.ipcMainController) as (MenuItemConstructorOptions | MenuItem)[]
        );
        Menu.setApplicationMenu(menuTemplate);

        // Ensure the folder system needed by the application already exists
        DirectoryOperations.initAppFolders();
    }
}
