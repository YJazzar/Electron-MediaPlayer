import { app, ipcMain, BrowserWindow, Rectangle, IpcMainEvent } from 'electron';
import Store from 'electron-store';
import path from 'path';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import LogMessage from '../../libs/logger/LogMessage';
import ConfigManager from '../../libs/persist/ConfigManager';
import PlaylistDetails from '../../libs/templates/PlaylistDetails';
import DirectoryOperations from '../fileOperations/DirectoryOperations';

const log = LoggerFactory.getLogger(__filename);

// Used and managed by ApplicationEntry object
export default class IpcMainController {
    private mainWindow: BrowserWindow;

    private configManager: ConfigManager;

    private static instance: IpcMainController;

    constructor(mainWindow: BrowserWindow) {
        log.info('Initializing ipcMainController...');
        this.mainWindow = mainWindow;
        this.configManager = ConfigManager.getInstance();
        IpcMainController.instance = this;
    }

    init(): void {
        // An event so the html files from the electron browser can use the logger
        ipcMain.on('Logger', this.sendLogMessage.bind(this));

        this.mainWindow.webContents.on('did-finish-load', this.initializeRenderer.bind(this));

        this.mainWindow.on('will-resize', this.willResize.bind(this));

        this.mainWindow.on('resize', this.mainWindowResize.bind(this));

        ipcMain.on('config:getTheme', this.configGetTheme.bind(this));

        ipcMain.on('config:getNavPanelWidth', this.configGetNavPanelWidth.bind(this));

        ipcMain.on('config:getPlayerControlsHeight', this.configGetPlayerControlsHeight.bind(this));

        ipcMain.on('config:getTableHeaderOptions', this.configGetTableHeaderOptions.bind(this));

        ipcMain.on('actions:addNewPlaylist:submit', this.actionAddNewPlaylistSubmit.bind(this));

        /**
         * The following are events that are not implemented but could be useful in the future
         */
        // This allows for the script to wait until the webpage is loaded
        // ipcMain.on('loadDone', () => {});
    }

    static getInstance(): IpcMainController {
        return IpcMainController.instance;
    }

    // eventName = 'Logger'
    // eslint-disable-next-line class-methods-use-this
    sendLogMessage(_event: Event, message: LogMessage) {
        LoggerFactory.getLoggerImpl().log(message.logLevelName, message.sourcePath, message.message);
    }

    // eventName = 'did-finish-load'
    // Used to init the renderer's window
    initializeRenderer() {
        log.debug('Did-Finish-Load event was received');
        this.emitInitialWindowSize();

        // Send the data to be displayed to the table
        this.sendStatusUpdateDataIndex();
    }

    // Used for the resizable components to correctly set their initial widths and heights
    emitInitialWindowSize() {
        const size = this.mainWindow.getSize();
        const width = size[0];
        const height = size[1];
        this.mainWindow.webContents.send('initial-window-size', width, height);
    }

    // eventName = 'will-resize'
    willResize(event: Event, newWindowSize: Rectangle) {
        if (newWindowSize.width < 100 || newWindowSize.height < 100) {
            event.preventDefault();
        }
        this.mainWindow.webContents.send('window-resized', newWindowSize);
    }

    mainWindowResize() {
        const size = this.mainWindow.getSize();
        const width = size[0];
        const height = size[1];

        this.mainWindow.webContents.send('resize-window', width, height);
    }

    // eventName = 'config:getTheme'
    // This is made to be used synchronously
    configGetTheme(event: IpcMainEvent) {
        event.returnValue = this.configManager.getTheme();
    }

    // eventName = 'config:getNavPanelWidth'
    // This is made to be used synchronously
    configGetNavPanelWidth(event: IpcMainEvent) {
        event.returnValue = this.configManager.getNavPanelWidth();
    }

    // eventName = 'config:getPlayerControlsHeight'
    // This is made to be used synchronously
    configGetPlayerControlsHeight(event: IpcMainEvent) {
        event.returnValue = this.configManager.getPlayerControlsHeight();
    }

    // eventName = 'config:getTableHeaderOptions'
    // This is made to be used synchronously
    configGetTableHeaderOptions(event: IpcMainEvent) {
        event.returnValue = this.configManager.getTableHeaderOptions();
    }

    // This will be used to notify the renderer that the user has imported new files into the tnyPlayer/data folder
    sendStatusUpdateDataIndex() {
        // Get all of the fileDetails stored in data/index.json
        const indexStore = new Store({
            cwd: path.join(app.getPath('music'), 'tnyPlayer', 'data'),
            name: 'index',
        });

        const newContents: PlaylistDetails[] = [];

        const size: number = indexStore.get('size') as number;
        for (let i = 0; i < size; i += 1) {
            newContents.push(indexStore.get(`${i}`) as PlaylistDetails);
        }

        this.mainWindow.webContents.send('status:data/index.json updated', newContents);
    }

    // eventName = 'actions:addNewPlaylist'
    // @param name: the name of the new playlist being added
    actionAddNewPlaylistSubmit(_event: IpcMainEvent, name: string) {
        DirectoryOperations.addNewPlaylist(name)
            .then((cancelled: boolean | null) => {
                // Check if an error had occurred
                if (cancelled === null) {
                    log.error('DirectoryOperations.addNewPlaylist() returned a rejected promise');
                    // Send to the main window that the operation was not successful
                    this.mainWindow.webContents.send('actions:addNewPlaylist:error');
                }

                log.debug('Sending new data/index.json');

                // Notify the renderer process about the changes
                this.sendStatusUpdateDataIndex();

                if (!cancelled) {
                    // Send to the main window that the operation was successful
                    this.mainWindow.webContents.send('actions:addNewPlaylist:success');
                } else {
                    // Send to the main window that the operation was cancelled
                    this.mainWindow.webContents.send('actions:addNewPlaylist:failed');
                }

                return true;
            })
            .catch(() => {
                log.error('DirectoryOperations.addNewPlaylist() returned a rejected promise');
                // Send to the main window that the operation was not successful
                this.mainWindow.webContents.send('actions:addNewPlaylist:error');
            });
    }

    actionAddNewPlaylistDisplay() {
        this.mainWindow.webContents.send('actions:addNewPlaylist:display');
    }
}
