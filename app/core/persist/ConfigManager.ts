import { app } from 'electron';
import Store from 'electron-store';
import path from 'path';
import LoggerFactory from '../../libs/logger/LoggerFactory';

const log = LoggerFactory.getLogger(__filename);

export default class ConfigManager {
    private store: Store<Record<string, unknown>>;

    constructor() {
        log.database('Creating the database store');
        this.store = new Store({
            cwd: path.join(app.getPath('music'), 'tnyPlayer'),
            name: 'config',
        });
    }
}
