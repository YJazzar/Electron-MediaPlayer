import winston, { createLogger } from 'winston';
import { logLevelNames, logLevels } from './logLevelConstants';
import getDateTime from '../utils/DateTime';
import { customWinstonFormatter } from './LogFormatter';

export default class LoggerImpl {
    logger: winston.Logger | undefined;

    readonly logLevel: string;

    constructor(logLevel?: string) {
        if (!logLevel) {
            this.logLevel = logLevelNames.debug;
        } else {
            this.logLevel = logLevel;
        }
    }

    // TODO: Make a config file to create this portion of the logger
    init(): void {
        // Create the logger
        this.logger = createLogger({
            format: customWinstonFormatter(),
            levels: logLevels,
            transports: [
                new winston.transports.Console({
                    level: this.logLevel,
                }),
                new winston.transports.File({
                    filename: './LoggerOutput.log', // TODO: add this as a property in the config files
                    level: this.logLevel,
                }),
            ],
        });
    }

    // The function that will log all messages
    log(level: string, source: string, message: string): void {
        if (this.logger) {
            this.logger.log({
                level,
                time: getDateTime(),
                message,
                source,
            });
        }
    }

    getLogLevel(): string {
        return this.logLevel;
    }
}
