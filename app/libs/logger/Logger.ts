import { app } from 'electron';
import path from 'path';
import winston, { createLogger } from 'winston';
import ConfigManager from '../persist/ConfigManager';
import getDateTime from '../utils/DateTime';
import { customWinstonFormatter } from './LogFormatter';
import { logLevels } from './logLevelConstants';

export default class LoggerImpl {
    logger: winston.Logger | undefined;

    readonly logLevel: string;

    constructor() {
        this.logLevel = ConfigManager.getInstance().getLoggingLevel();
        console.log(`PATH TO LOG: ${this.getLogFileName()}`);
    }

    // TODO: Make a config file to create this portion of the logger
    init(): void {
        // Create the logger
        this.logger = createLogger({
            format: customWinstonFormatter(),
            levels: logLevels,
            transports: this.getTransports(),
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

    // eslint-disable-next-line class-methods-use-this
    getLogFileName(): string {
        return path.resolve(
            path.join(app.getPath('music'), 'tnyPlayer'), // Get the folder path where all the app's data is stored
            ConfigManager.getInstance().getLogFileName()
        );
    }

    private getTransports(): winston.transport[] {
        const transports: winston.transport[] = [];
        transports.push(
            new winston.transports.Console({
                level: this.logLevel,
            })
        );

        if (ConfigManager.getInstance().getLogToFile()) {
            transports.push(
                new winston.transports.File({
                    filename: this.getLogFileName(), // TODO: add this as a property in the config files
                    level: this.logLevel,
                })
            );
        }

        return transports;
    }
}
