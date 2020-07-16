import { ipcMain, BrowserWindow, Rectangle } from 'electron';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import LogMessage from '../../libs/logger/LogMessage';

const log = LoggerFactory.getLogger(__filename);

// Used and managed by ApplicationEntry object
export default class IpcMainController {
    private mainWindow: BrowserWindow;

    constructor(mainWindow: BrowserWindow) {
        log.info('Initializing ipcMainController...');
        this.mainWindow = mainWindow;
    }

    init(): void {
        this.mainWindow.webContents.on('did-finish-load', () => {
            log.debug('Did-Finish-Load event was received');
            const size = this.mainWindow.getSize();
            const width = size[0];
            const height = size[1];
            this.mainWindow.webContents.send(
                'initial-window-size',
                width,
                height
            );
        });

        // This allows for the script to wait until the webpage is loaded
        ipcMain.on('loadDone', () => {
            log.debug('The main BrowserWindow has been fully loaded.');
        });

        // An event so the html files from the electron browser can use the logger
        ipcMain.on('Logger', this.sendLogMessage);

        this.mainWindow.on('will-resize', (e, newWindowSize: Rectangle) => {
            if (newWindowSize.width < 100 || newWindowSize.height < 100) {
                e.preventDefault();
            }
            this.mainWindow.webContents.send('window-resized', newWindowSize);
        });

        let timer: NodeJS.Timeout;
        // TODO: use this function to call ipcRenderer to control how the panels will be resized
        this.mainWindow.on('resize', () => {
            clearTimeout(timer);

            const size = this.mainWindow.getSize();
            const width = size[0];
            const height = size[1];

            timer = setTimeout(() => {
                this.mainWindow.webContents.send('resize-pages', width, height);
            }, 100);
            // console.log(`width: ${width}`);
            // console.log(`height: ${height}`);
        });
    }

    // eslint-disable-next-line class-methods-use-this
    sendLogMessage(_event: Event, message: LogMessage) {
        LoggerFactory.getLoggerImpl().log(
            message.logLevelName,
            message.sourcePath,
            message.message
        );
    }
}
