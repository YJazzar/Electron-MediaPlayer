import { app, BrowserWindow, Menu } from 'electron';
import LoggerFactory from '../libs/logger/LoggerFactory';
import IpcMainController from './controllers/IpcMainController';
import DirectoryOperations from './fileOperations/DirectoryOperations';

const log = LoggerFactory.getLogger(__filename);

const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Import Folder',
                accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
                click() {
                    // Action:
                    DirectoryOperations.importFolders();
                },
            },
            {
                label: 'Import File(s)',
                accelerator: process.platform === 'darwin' ? 'Command+O' : 'Ctrl+O',
                click() {
                    // Action:
                    DirectoryOperations.importFiles();
                },
            },
            {
                label: 'Clear Items',
                // accelerator: process.platform == 'darwin' ? 'Command+A' : 'Ctrl+A',
                click() {
                    // Action:
                },
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                },
            },
        ],
    },
] as any;

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

        // If the current system is a mac, then add an empty object to the beginning of the
        // mainMenuTemplate array.
        if (process.platform === 'darwin') {
            mainMenuTemplate.unshift({});
        }

        // Insert menu:
        const menuTemplate = Menu.buildFromTemplate(mainMenuTemplate);
        Menu.setApplicationMenu(menuTemplate);
    }

    init(): void {
        // Set up the Event Listeners
        this.ipcMainController.init();

        // TODO: make a custom menu
        // this.menuBuilder.buildMenu();

        // Create the skeletal folder system needed by the application
        DirectoryOperations.initAppFolders();
        // DirectoryOperations.testFunction();
    }
}
