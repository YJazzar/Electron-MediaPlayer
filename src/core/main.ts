import {app, BrowserWindow} from 'electron';
import {ApplicationEntry} from "./electron/ApplicationEntry";
import {LoggerFactory} from "../libs/logger/LoggerFactory";

const log = LoggerFactory.getLogger(__filename);
let window : BrowserWindow;


app.whenReady().then(startApplication).catch((err)=>{
    console.log('Could not start tnyPlayer');
    console.log(err);
    process.exit();
});


function startApplication() : void {
    console.log("startApplication() called");

    // Show startup message
    log.info('*******************************')
    log.info('-------------------------------')
    log.info('*****  Program started   *****')
    log.info('-------------------------------')
    log.info('*******************************')

    // Create the browser window.
    window = new BrowserWindow({
        width: 1420,
        height: 850,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load the webPage into electron
    window.loadFile('D:/Projects/tnyPlayer/dist/app/index.html');

    new ApplicationEntry(window);
}


