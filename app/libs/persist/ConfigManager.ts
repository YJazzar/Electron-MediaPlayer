import { app } from 'electron';
import Store from 'electron-store';
import path from 'path';
import { logLevelNames } from '../logger/logLevelConstants';

/**
 * This class will be used to get config file options used throughout the application
 * This class is a singleton
 */
export default class ConfigManager {
    private static instance: ConfigManager;

    private store: Store<Record<string, unknown>>;

    private constructor() {
        this.store = new Store({
            cwd: path.join(app.getPath('music'), 'tnyPlayer'),
            name: 'config',
        });
    }

    static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }

        return ConfigManager.instance;
    }

    getTheme(): string {
        return this.store.get('theme', 'dark') as string;
    }

    getApplicationWindowWidth(): number {
        return this.store.get('applicationWindow.width', 1420) as number;
    }

    getApplicationWindowHeight(): number {
        return this.store.get('applicationWindow.height', 850) as number;
    }

    getNavPanelWidth(): number {
        return this.store.get(
            'applicationWindow.navPanelWidth',
            0.25
        ) as number;
    }

    getPlayerControlsHeight(): number {
        return this.store.get(
            'applicationWindow.playerControlsHeight',
            0.15
        ) as number;
    }

    getLoggingLevel(): string {
        return this.store.get(
            'logger.minLogLevel',
            logLevelNames.debug
        ) as string;
    }

    getLogToFile(): boolean {
        return this.store.get('logger.fileOutput', true) as boolean;
    }

    getLogFileName(): string {
        return this.store.get(
            'logger.fileName',
            './LoggerOutput.log'
        ) as string;
    }
}
