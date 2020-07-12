import {LoggerFactory} from "../../libs/logger/LoggerFactory";
import {ipcMain} from "electron";

const log = LoggerFactory.getLogger(__filename);

// Used and managed by ApplicationEntry object
export class IpcMainController {

    constructor() {
        this.init();
    }

    private init(): void {
        log.info("Initializing ipcMainController...");

        // This allows for the script to wait until the webpage is loaded
        ipcMain.on("loadDone", function (e, data) {
            log.debug("The main BrowserWindow has been fully loaded.");
        });

        // An event so the html files from the electron browser can use the logger
        ipcMain.on("Logger", (e, message) => {
            LoggerFactory.getLoggerImpl().log(message.logLevelName, message.sourcePath, message.message);
        });
    }
}