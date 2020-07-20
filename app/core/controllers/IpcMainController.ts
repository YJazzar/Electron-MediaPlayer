import { ipcMain, BrowserWindow, Rectangle, IpcMainEvent } from 'electron';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import LogMessage from '../../libs/logger/LogMessage';
import ConfigManager from '../../libs/persist/ConfigManager';

const log = LoggerFactory.getLogger(__filename);

// Used and managed by ApplicationEntry object
export default class IpcMainController {
    private mainWindow: BrowserWindow;

    private configManager: ConfigManager;

    constructor(mainWindow: BrowserWindow) {
        log.info('Initializing ipcMainController...');
        this.mainWindow = mainWindow;
        this.configManager = ConfigManager.getInstance();
    }

    init(): void {
        // An event so the html files from the electron browser can use the logger
        ipcMain.on('Logger', this.sendLogMessage.bind(this));

        this.mainWindow.webContents.on(
            'did-finish-load',
            this.emitInitialWindowSize.bind(this)
        );

        this.mainWindow.on('will-resize', this.willResize.bind(this));

        this.mainWindow.on('resize', this.mainWindowResize.bind(this));

        ipcMain.on('config:getTheme', this.configGetTheme.bind(this));

        ipcMain.on(
            'config:getNavPanelWidth',
            this.configGetNavPanelWidth.bind(this)
        );

        ipcMain.on(
            'config:getPlayerControlsHeight',
            this.configGetPlayerControlsHeight.bind(this)
        );

        /**
         * The following are events that are not implemented but could be useful in the future
         */
        // This allows for the script to wait until the webpage is loaded
        // ipcMain.on('loadDone', () => {});
    }

    // eventName = 'Logger'
    // eslint-disable-next-line class-methods-use-this
    sendLogMessage(_event: Event, message: LogMessage) {
        LoggerFactory.getLoggerImpl().log(
            message.logLevelName,
            message.sourcePath,
            message.message
        );
    }

    // eventName = 'did-finish-load'
    // Used for the resizable components to correctly set their initial widths and heights
    emitInitialWindowSize() {
        log.debug('Did-Finish-Load event was received');
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
}
