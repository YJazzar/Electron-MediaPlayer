/* eslint-disable class-methods-use-this */
import { app } from 'electron';
import fs from 'fs';
import moment from 'moment';
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

    // closeLogs(): void{
    //     this.logger?.transports[1].close
    // }

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

    private getLogFileName(): string {
        return path.resolve(
            this.getLogDirPath(), // Get the folder path where all the app's data is stored
            `${this.getLogDate()}${this.getLatestNumber()}.log`
        );
    }

    private getLogDate(): string {
        return moment().format('YYYY-MM-DD-');
    }

    private getLatestNumber(): number {
        const logDir = this.getLogDirPath();
        const currLogFileName = this.getLogDate();
        const existingLogs: string[] = fs.readdirSync(logDir);

        let max = 0;
        existingLogs.forEach((logFileName: string) => {
            console.log(`Currently on: ${logFileName}`);
            if (logFileName.includes(currLogFileName)) {
                const temp = logFileName.substring(
                    logFileName.indexOf(currLogFileName) +
                        currLogFileName.length
                );
                const newMax = parseInt(`${temp.match(/(\d+)/)}`, 10);
                if (
                    !Number.isNaN(newMax) &&
                    Number.isFinite(newMax) &&
                    newMax >= max
                ) {
                    max = newMax;
                }
            }
        });
        return max + 1;
    }

    private getLogDirPath(): string {
        return path.join(app.getPath('music'), 'tnyPlayer', 'logs');
    }
}
