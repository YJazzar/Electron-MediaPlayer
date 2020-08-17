import { app } from 'electron';
import Store from 'electron-store';
import fs from 'fs';
import path from 'path';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import DirectoryDetails from '../../libs/templates/DirectoryDetails';
import readDirectories from './helpers/readDirectories';
import sampleConfig from './sampleConfigs/sampleConfig';

const log = LoggerFactory.getLogger(__filename);

export default class DirectoryOperations {
    static initAppFolders() {
        // Create the log folder
        const logDir = path.join(app.getPath('music'), 'tnyPlayer', 'logs');
        fs.mkdir(logDir, (err) => {
            if (err) {
                log.debug(
                    `Could not create the log folder. fs.mkdir "errno":${err.errno} "code":${err.code}`
                );
            } else {
                log.info(`Successfully created the log directory: ${logDir}`);
            }
        });

        // Create the data folder
        const dataDir = path.join(app.getPath('music'), 'tnyPlayer', 'data');
        fs.mkdir(dataDir, (err) => {
            if (err) {
                log.debug(
                    `Could not create the data folder. fs.mkdir "errno":${err.errno} "code":${err.code}`
                );
            } else {
                log.info(`Successfully created the data directory: ${dataDir}`);
            }
        });

        // Check if the config file exists:
        const configPath = path.join(
            app.getPath('music'),
            'tnyPlayer',
            'config.json'
        );
        try {
            if (fs.existsSync(configPath)) {
                log.debug('The config file already exists...');
            } else {
                log.info(
                    'The config file does not exist... Copying sample config file'
                );
                fs.writeFileSync(configPath, JSON.stringify(sampleConfig));
            }
        } catch (error) {
            log.error(JSON.stringify(error));
        }
    }

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
