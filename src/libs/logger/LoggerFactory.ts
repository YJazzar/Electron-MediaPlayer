import {LoggerImpl} from "./Logger";
import {LoggerInstance} from "./LoggerInstance";


export class LoggerFactory {

    private static logger: LoggerImpl;

    static getLogger(sourcePath: string): LoggerInstance {
        if (!this.logger) {
            console.log('Creating a logger instance!');
            this.init();
        }

        return new LoggerInstance(this.logger, sourcePath)
    }

    static init(): void {
        this.logger = new LoggerImpl(null);
        this.logger.init();
    }
}