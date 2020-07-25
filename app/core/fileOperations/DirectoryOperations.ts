import { app } from 'electron';
import Store from 'electron-store';
import path from 'path';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import DirectoryDetails from '../../libs/templates/DirectoryDetails';
import readDirectories from './helpers/readDirectories';

const log = LoggerFactory.getLogger(__filename);

export default class DirectoryOperations {
    static async testFunction() {
        log.debug('now calling readDirectory function');

        const paths: string[] = [app.getPath('videos')];
        const result: DirectoryDetails[] = await readDirectories(paths);

        // TODO: temp code
        const store = new Store({
            cwd: path.join(app.getPath('music'), 'tnyPlayer'),
            name: 'history',
        });
        // NOTE: will need to iterate and store them in separate files later on
        store.store = { ...result[0] };
        log.info('SAVED!!');
    }
}
