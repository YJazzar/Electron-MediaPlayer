import { app } from 'electron';
import Store from 'electron-store';
import fs from 'fs';
import path from 'path';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import DirectoryDetails from '../../libs/templates/DirectoryDetails';
import FileDetails from '../../libs/templates/FileDetails';
import readDirectories from './helpers/readDirectories';
import sampleConfig from './sampleConfigs/sampleConfig';

const log = LoggerFactory.getLogger(__filename);

export default class DirectoryOperations {
    // This function will make sure the data and log folders already exist
    // It will also make sure the user has a config file
    static initAppFolders() {
        // Create the tnyPlayer/log folder
        const logDir = path.join(app.getPath('music'), 'tnyPlayer', 'logs');
        if (!this.pathExists(logDir)) {
            fs.mkdir(logDir, (err) => {
                if (err) {
                    log.debug(`Could not create the log folder. fs.mkdir "errno":${err.errno} "code":${err.code}`);
                } else {
                    log.info(`Successfully created the log directory: ${logDir}`);
                }
            });
        } else {
            log.info(`Successfully detected the log directory: ${logDir}`);
        }

        // Create the tnyPlayer/data folder
        const dataDir = path.join(app.getPath('music'), 'tnyPlayer', 'data');
        if (!this.pathExists(dataDir)) {
            fs.mkdir(dataDir, (err) => {
                if (err) {
                    log.debug(`Could not create the data folder. fs.mkdir "errno":${err.errno} "code":${err.code}`);
                } else {
                    log.info(`Successfully created the data directory: ${dataDir}`);
                }
            });
        } else {
            log.info(`Successfully detected the data directory: ${dataDir}`);
        }

        // Check if the tnyPlayer/data/index.json file exists:
        const indexPath = path.join(app.getPath('music'), 'tnyPlayer', 'data', 'index.json');
        try {
            if (this.pathExists(indexPath)) {
                log.debug(`Successfully detected the data/index.json file at: ${indexPath}`);
            } else {
                log.info(`The config file does not exist... Creating empty file at: ${indexPath}`);
                fs.writeFileSync(indexPath, '{"size": 0}');
            }
        } catch (error) {
            log.error(JSON.stringify(error));
        }

        // Check if the tnyPlayer/config.json file exists:
        const configPath = path.join(app.getPath('music'), 'tnyPlayer', 'config.json');
        try {
            if (this.pathExists(configPath)) {
                log.debug(`Successfully detected the config.json file at: ${configPath}`);
            } else {
                log.info(`The config file does not exist... Copying sample config file to : ${configPath}`);
                fs.writeFileSync(configPath, JSON.stringify(sampleConfig));
            }
        } catch (error) {
            log.error(JSON.stringify(error));
        }

        const indexStore = new Store({
            cwd: path.join(app.getPath('music'), 'tnyPlayer', 'data'),
            name: 'index',
        });
    }

    // Returns true if the path already exists
    static pathExists(filePath: string): boolean {
        if (fs.existsSync(filePath)) {
            return true;
        }
        return false;
    }

    // This function will be called when a media file needs to be imported to tnyPlayer/data/index.js
    // It will return the new state of adding the file to the JSON object array
    // static async importToData(indexCurrState: FileDetails[], fileDetails: FileDetails): FileDetails[] {
    //     indexCurrState.push(fileDetails);
    //     return indexCurrState;
    // }

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

    static async importTest() {
        const indexStore = new Store({
            cwd: path.join(app.getPath('music'), 'tnyPlayer', 'data'),
            name: 'index',
        });

        log.debug('Running importTest()');
        const paths: string[] = [path.join(app.getPath('videos'), 'Filler Vids')];
        const result: DirectoryDetails[] = await readDirectories(paths);

        let i = indexStore.get('size') as number;

        // After getting all the details, add them to the current index file:
        for (let dir = 0; dir < result.length; dir += 1) {
            for (let file = 0; file < result[dir].fileStatDetails.length; file += 1) {
                indexStore.set(`${i}`, result[dir].fileStatDetails[file]);
                i += 1;
            }
        }
        indexStore.set('size', i);
    }
}
