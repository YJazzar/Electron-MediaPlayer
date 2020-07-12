import LoggerImpl from './Logger';
import { logLevelNames } from './logLevelConstants';

/**
 * This class will be used to log without needing to pass the parameter "source"
 * with every log statement
 */
export default class LoggerInstance {
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
