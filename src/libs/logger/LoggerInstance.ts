import {LoggerImpl} from "./Logger";
import {logLevelNames} from "./logLevelConstants";
import {ipcRenderer} from "electron";
import {loggingStringFormatter} from "./LogFormatter";
import {getDateTime} from "../utils/DateTime";

/**
 * This class will be used to log without needing to pass the parameter "source"
 * with every log statement
 */
export class LoggerInstance {

    private logger: LoggerImpl;
    private readonly sourcePath: string;

    constructor(logger: LoggerImpl, sourcePath: string) {
        this.logger = logger;
        this.sourcePath = sourcePath;
    }

    // Add methods used to actually send log commands to winston
    error(message: string): void {
        this.logger.log(logLevelNames.error, this.sourcePath, message);
    }

    warning(message: string): void {
        this.logger.log(logLevelNames.warning, this.sourcePath, message);
    }

    database(message: string): void {
        this.logger.log(logLevelNames.database, this.sourcePath, message);
    }

    info(message: string): void {
        this.logger.log(logLevelNames.info, this.sourcePath, message);
    }

    debug(message: string): void {
        this.logger.log(logLevelNames.debug, this.sourcePath, message);
    }
}

export class UILoggerInstance {

    private readonly sourcePath: string;
    private readonly logToDevTools: boolean;

    constructor(sourcePath: string, logToDevTools: boolean) {
        if (!logToDevTools)
            logToDevTools = true;   // Default value is always true here

        this.sourcePath = sourcePath;
        this.logToDevTools = logToDevTools;
    }

    // Method used to actually send log commands to winston
    log(logLevelName: string, sourcePath: string, message: string) {
        if (this.logToDevTools) {
            console.log(loggingStringFormatter(logLevelName, getDateTime(), sourcePath, message));
        }

        ipcRenderer.send('Logger', {
            logLevelName,
            sourcePath,
            message
        });
    }

    error(message: string): void {
        this.log(logLevelNames.error, this.sourcePath, message);
    }

    warning(message: string): void {
        this.log(logLevelNames.warning, this.sourcePath, message);
    }

    database(message: string): void {
        this.log(logLevelNames.database, this.sourcePath, message);
    }

    info(message: string): void {
        this.log(logLevelNames.info, this.sourcePath, message);
    }

    debug(message: string): void {
        this.log(logLevelNames.debug, this.sourcePath, message);
    }
}