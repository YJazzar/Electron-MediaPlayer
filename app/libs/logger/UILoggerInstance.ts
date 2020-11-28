import { ipcRenderer } from 'electron';
import { logLevelNames } from './logLevelConstants';
import { loggingStringFormatter } from './LogFormatter';
import getDateTime from '../utils/DateTime';

export default class UILoggerInstance {
    private readonly sourcePath: string;

    private readonly logToDevTools: boolean;

    constructor(sourcePath: string, logToDevTools: boolean) {
        this.sourcePath = sourcePath;
        this.logToDevTools = logToDevTools;

        if (!this.logToDevTools) {
            this.logToDevTools = true; // Default value is always true here
        }
    }

    // Method used to actually send log commands to winston
    log(logLevelName: string, sourcePath: string, message: string) {
        if (this.logToDevTools) {
            console.log(loggingStringFormatter(logLevelName, getDateTime(), sourcePath, message));
        }

        // interface definition of this message structure is found in LogMessage.ts
        ipcRenderer.send('Logger', {
            logLevelName,
            sourcePath,
            message,
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
