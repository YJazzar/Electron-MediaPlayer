"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var ApplicationEntry_1 = require("./electron/ApplicationEntry");
var window;
var log;
electron_1.app.whenReady().then(startApplication).catch(function (err) {
    console.log('Could not start tnyPlayer');
    console.log(err);
    process.exit();
});
function startApplication() {
    console.log("startApplication() called");
    // Initialize logger
    log = new Logger('debug'); // TODO: Get the logLevel value from a config file instead of hardcoding
    log.info('main.js', 'testing this thing and seeing if it can actually work');
    // Create the browser window.
    window = new electron_1.BrowserWindow({
        width: 1420,
        height: 850,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // Load the webPage into electron
    window.loadFile('../app/index.html');
    new ApplicationEntry_1.ApplicationEntry(window);
}
//# sourceMappingURL=main.js.map