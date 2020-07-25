import { app } from 'electron';
import Store from 'electron-store';
import path from 'path';
import { exit } from 'process';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import readDirectories from './helpers/readDirectories';

const log = LoggerFactory.getLogger(__filename);

export default class DirectoryOperations {
    static async testFunction() {
        const store = new Store({
            cwd: path.join(app.getPath('music'), 'tnyPlayer'),
            name: 'history',
        });

        log.info('now calling readDirectory function');

        const paths: string[] = [app.getPath('videos')];
        store.store = { ...(await readDirectories(paths))[0] };
        console.log('✨SAVED!!');
        exit(0);
        // return result;
    }
}
