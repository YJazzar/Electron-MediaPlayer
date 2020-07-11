import winston, {createLogger} from "winston";
import {logLevelNames, logLevels} from "./logLevelConstants";
import {getDateTime} from "../utils/DateTime";
const { printf } = winston.format;

class Logger {

    private logger: winston.Logger;
    private readonly logLevel: string;

    constructor(logLevel: string) {
        if (!logLevel) {
            logLevel = logLevelNames.debug;
        }
        this.logLevel = logLevel;
        this.init();
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
                    filename: 'LoggerOutput.log',
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
        this.logger.log({
            level: level,
            time: getDateTime(),
            message: message,
            source: source
        });
    }

    error(source: string, message: string): void {
        this.log(logLevelNames.error, source, message);
    }

    warning(source: string, message: string): void {
        this.log(logLevelNames.warning, source, message);
    }

    database(source: string, message: string): void {
        this.log(logLevelNames.database, source, message);
    }

    info(source: string, message: string): void {
        this.log(logLevelNames.info, source, message);
    }

    debug(source: string, message: string): void {
        this.log(logLevelNames.debug, source, message);
    }
}
