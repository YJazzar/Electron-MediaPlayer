import winston, {createLogger} from "winston";
import {logLevelNames, logLevels} from "./logLevelConstants";
import {getDateTime} from "../utils/DateTime";
const { printf } = winston.format;

// export interface Logger {
//
//     logger: winston.Logger;
//     logLevel: string;
//     init(): void;
//     log(level: string, source: string, message: string): void;
//
// }

export class LoggerImpl  {

    logger: winston.Logger;
    readonly logLevel: string;

    constructor(logLevel: string) {
        if (!logLevel) {
            logLevel = logLevelNames.debug;
        }
        this.logLevel = logLevel;
    }

    // TODO: Make a config file to create this portion of the logger
    init(): void {
        // Create the logger
        this.logger = createLogger({
            format: this.customFormatter(),
            levels: logLevels,
            transports: [
                new winston.transports.Console({
                    level: this.logLevel
                }),
                new winston.transports.File({
                    filename: './LoggerOutput.log',     // TODO: add this as a property in the config files
                    level: this.logLevel
                }),
            ]
        });
    }

    customFormatter() {
        return printf(({ level, time, source, message }) => {
            let formattedLevel = (`         [${level}]`);
            formattedLevel = formattedLevel.substring(formattedLevel.length-10);
            let formattedSource = source.substring(source.length-35, source.length);
            return `${formattedLevel} [${time}] [${formattedSource}]: ${message}`;
            // Old format:
            // return `[${level}] [${time}] [${source}]: ${message}`;
        });
    }

    // The function that will log all messages
    log(level: string, source: string, message: string): void {
        console.dir(this.logger)
        this.logger.log({
            level: level,
            time: getDateTime(),
            message: message,
            source: source
        });
    }

    get LogLevel(): string {
        return this.logLevel;
    }
}
