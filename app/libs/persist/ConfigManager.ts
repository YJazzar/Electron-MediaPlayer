import { app } from 'electron';
import Store from 'electron-store';
import path from 'path';
import SampleConfig from '../templates/SampleConfig';
/**
 * This class will be used to get config file options used throughout the application
 * This class is a singleton
 */
export default class ConfigManager {
    private static instance: ConfigManager;

    private store: Store<Record<string, unknown>>;

    // TODO: validate the config file here
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
        return this.store.get('applicationWindow.width', SampleConfig.applicationWindow.width) as number;
    }

    getApplicationWindowHeight(): number {
        return this.store.get('applicationWindow.height', SampleConfig.applicationWindow.height) as number;
    }

    getNavPanelWidth(): number {
        return this.store.get('applicationWindow.navPanelWidth', SampleConfig.applicationWindow.navPanelWidth) as number;
    }

    getPlayerControlsHeight(): number {
        return this.store.get(
            'applicationWindow.playerControlsHeight',
            SampleConfig.applicationWindow.playerControlsHeight
        ) as number;
    }

    getLoggingLevel(): string {
        return this.store.get('logger.minLogLevel', SampleConfig.logger.minLogLevel) as string;
    }

    getLogToFile(): boolean {
        return this.store.get('logger.fileOutput', SampleConfig.logger.fileOutput) as boolean;
    }

    getTableHeaderOptions(): string[] {
        return this.store.get('tableOptions.tableHeaderTitles', SampleConfig.tableOptions.tableHeaderTitles) as string[];
    }

    getAllowedFileExtensions(): string[] {
        return this.store.get('fileExtensions', SampleConfig.fileExtensions) as string[];
    }
}
