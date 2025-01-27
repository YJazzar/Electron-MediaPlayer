/* eslint global-require: off, no-console: off */

/**
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import { app, BrowserWindow } from 'electron';
import ApplicationEntry from './core/ApplicationEntry';
import KeyboardController from './core/controllers/KeyboardController';
import ConfigManager from './libs/persist/ConfigManager';

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
    require('source-map-support').install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    require('electron-debug')();
}

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        show: false,
        width: ConfigManager.getInstance().getApplicationWindowWidth(),
        height: ConfigManager.getInstance().getApplicationWindowHeight(),
        webPreferences: {
            nodeIntegration: true,
        },
        // (process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true') && process.env.ERB_SECURE !== 'true'
        //     ? {
        //           nodeIntegration: true,
        //       }
        //     : {
        //           preload: path.join(__dirname, 'dist/renderer.prod.js'),
        //       },
    });

    mainWindow.loadURL(`file://${__dirname}/app.html`);

    // TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    mainWindow.webContents.on('did-finish-load', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // installExtension(REACT_DEVELOPER_TOOLS)
    //     .then((name: string) => {
    //         console.log(`Added Extension:  ${name}`);
    //         return true;
    //     })
    //     .catch((err: any) => {
    //         console.log('An error occurred: ', err);
    //     });

    // Entry point for my application
    const appEntry = new ApplicationEntry(mainWindow);
    appEntry.init();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
        process.exit(0);
    }
});

app.on('ready', () => {
    createWindow();
    KeyboardController.createGlobalShortcuts();
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow();
});
