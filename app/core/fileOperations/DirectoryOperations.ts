import { app } from 'electron';
import Store from 'electron-store';
import fs from 'fs';
import path from 'path';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import DirectoryDetails from '../../libs/templates/DirectoryDetails';
import FileDetails from '../../libs/templates/FileDetails';
import readDirectories from './helpers/readDirectories';
import SampleConfig from '../../libs/templates/SampleConfig';
import ConfigManager from '../../libs/persist/ConfigManager';
import PlaylistDetails from '../../libs/templates/PlaylistDetails';
import SystemFiles from './helpers/SystemFiles';

const log = LoggerFactory.getLogger(__filename);

export default class DirectoryOperations {
    // This function will make sure the data and log folders already exist
    // It will also make sure the user has a config file
    static initAppFolders() {
        // Create the tnyPlayer/data folder
        const dataDir = path.join(app.getPath('music'), 'tnyPlayer', 'data');
        if (!SystemFiles.pathExists(dataDir)) {
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
            if (SystemFiles.pathExists(indexPath)) {
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
            if (SystemFiles.pathExists(configPath)) {
                log.debug(`Successfully detected the config.json file at: ${configPath}`);
            } else {
                log.info(`The config file does not exist... Copying sample config file to : ${configPath}`);
                fs.writeFileSync(configPath, JSON.stringify(SampleConfig));
            }
        } catch (error) {
            log.error(JSON.stringify(error));
        }
    }

    // @param name: the name of the new playlist being added
    static async addNewPlaylist(name: string) {
        log.debug('Importing folders using DirectoryOperations.importFolders()');
        const paths: string[] | null = await SystemFiles.chooseFolder();
        if (paths == null) {
            return;
        }

        // Get the set of directories that will be within the new playlist
        const result: DirectoryDetails[] = await readDirectories(paths);
        const indexStore = new Store({
            cwd: path.join(app.getPath('music'), 'tnyPlayer', 'data'),
            name: 'index',
        });

        // Make the new general structure of the playlist to be added
        const newPlaylist: PlaylistDetails = {
            directoryPaths: paths,
            playlistName: name,
            mediaFiles: [],
        };

        // After getting all the details, add them to the current index file:
        let i = indexStore.get('size') as number;
        if (Number.isNaN(i) || i == null) {
            i = 0;
        }
        for (let dir = 0; dir < result.length; dir += 1) {
            for (let file = 0; file < result[dir].fileStatDetails.length; file += 1) {
                newPlaylist.mediaFiles.push(result[dir].fileStatDetails[file]);
            }
        }
        newPlaylist.mediaFiles = DirectoryOperations.filterNonMediaFiles(newPlaylist.mediaFiles);

        indexStore.set(`${i}`, newPlaylist);
        indexStore.set('size', i + 1);
    }

    static filterNonMediaFiles(oldDetails: FileDetails[]): FileDetails[] {
        const allowedExtensions: string[] = ConfigManager.getInstance().getAllowedFileExtensions();

        const newDetails: FileDetails[] = oldDetails.filter((fileDetails: FileDetails) => {
            return !fileDetails.isDirectory && allowedExtensions.includes(fileDetails.fileExtension);
        });

        return newDetails;
    }
}
