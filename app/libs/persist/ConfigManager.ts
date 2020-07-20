import { app } from 'electron';
import Store from 'electron-store';
import path from 'path';
import LoggerFactory from '../logger/LoggerFactory';

const log = LoggerFactory.getLogger(__filename);

/**
 * This class will be used to get config file options used throughout the application
 * This class is a singleton
 */
export default class ConfigManager {
    private static instance: ConfigManager;

    private store: Store<Record<string, unknown>>;

    private constructor() {
        log.database('Creating an instance of ConfigManager.ts');
        this.store = new Store({
            cwd: path.join(app.getPath('music'), 'tnyPlayer'),
            name: 'config',
        });
    }

    static getInstance() {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }

        return ConfigManager.instance;
    }

    getTheme(): string {
        return this.store.get('theme', 'dark') as string;
    }
}