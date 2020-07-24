import { app } from 'electron';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import readDirectories from './readDirectories';

const log = LoggerFactory.getLogger(__filename);

export default class DirectoryOperations {
    static async testFunction() {
        log.info('now calling readDirectory function');

        const paths: string[] = [app.getPath('videos')];
        readDirectories(paths);

        log.debug('After the calll');
        // return result;
    }
}
