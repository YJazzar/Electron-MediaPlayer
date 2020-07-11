import {app, BrowserWindow} from 'electron';
import {ApplicationEntry} from "./electron/ApplicationEntry";
import {Logger} from "../libs/logger/Logger";


let window : BrowserWindow;
let log: Logger;

app.whenReady().then(startApplication).catch((err)=>{
    console.log('Could not start tnyPlayer');
    console.log(err);
    process.exit();
});


function startApplication() : void {
    console.log("startApplication() called");

    // Initialize logger
    log = new Logger('debug'); // TODO: Get the logLevel value from a config file instead of hardcoding
    log.info('main.js', 'testing this thing and seeing if it can actually work')

    // Create the browser window.
    window = new BrowserWindow({
        width: 1420,
        height: 850,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load the webPage into electron
    window.loadFile('../app/index.html');

    new ApplicationEntry(window);
}


