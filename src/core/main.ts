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

    // Initialize logger
    log.info('testing this thing and seeing if it can actually work')

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


