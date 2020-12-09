import { app, dialog } from 'electron';
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

const log = LoggerFactory.getLogger(__filename);

export default class DirectoryOperations {
    // This function will make sure the data and log folders already exist
    // It will also make sure the user has a config file
    static initAppFolders() {
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
                fs.writeFileSync(configPath, JSON.stringify(SampleConfig));
            }
        } catch (error) {
            log.error(JSON.stringify(error));
        }
    }

    // Returns true if the path already exists
    static pathExists(filePath: string): boolean {
        if (fs.existsSync(filePath)) {
            return true;
        }
        return false;
    }

    // This will open the operating system's file chooser and let the users choose a folder
    // The resulting array of paths will be returned as promise.
    static chooseFolder(): Promise<string[] | null> {
        log.debug(`User was prompted to choose a folder`);

        const result: Promise<string[] | null> = dialog
            .showOpenDialog({ properties: ['openDirectory'] })
            .then((folders) => {
                // Check if the operation was cancelled
                if (folders.canceled) {
                    log.info('Folder choosing operation was cancelled');
                    return null;
                }

                log.info('Folder choosing operation was completed');

                return folders.filePaths;
            })
            .catch((err) => {
                log.error(err);
                return null;
            });

        return result;
    }

    // This will open the operating system's file chooser and let the users choose a file or folder
    // The resulting array of paths will be returned as promise.
    static chooseFiles(): Promise<string[] | null> {
        log.debug(`User was prompted to choose a file`);

        const result: Promise<string[] | null> = dialog
            .showOpenDialog({ properties: ['openFile', 'multiSelections'] })
            .then((folders) => {
                // Check if the operation was cancelled
                if (folders.canceled) {
                    log.info('Folder choosing operation was cancelled');
                    return null;
                }

                log.info('Folder choosing operation was completed');

                return folders.filePaths;
            })
            .catch((err) => {
                log.error(err);
                return null;
            });

        return result;
    }

    static async importFolders(callBack: () => void) {
        log.debug('Importing folders using DirectoryOperations.importFolders()');
        const paths: string[] | null = await this.chooseFolder();
        if (paths == null) {
            return;
        }

        // Get the set of directories that will be within the new playlist
        const result: DirectoryDetails[] = await readDirectories(paths);
        const indexStore = new Store({
            cwd: path.join(app.getPath('music'), 'tnyPlayer', 'data'),
            name: 'index',
        });
        const playlistName = 'Playlist #1'; // TODO: allow the user to set the name
        const newPlaylist: PlaylistDetails = {
            directoryPaths: paths,
            playlistName,
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
        callBack();
    }

    static filterNonMediaFiles(oldDetails: FileDetails[]): FileDetails[] {
        const allowedExtensions: string[] = ConfigManager.getInstance().getAllowedFileExtensions();

        const newDetails: FileDetails[] = oldDetails.filter((fileDetails: FileDetails) => {
            return !fileDetails.isDirectory && allowedExtensions.includes(fileDetails.fileExtension);
        });

        return newDetails;
    }
}

// The following is an example of how to add files to the data/index.json file:
/** *
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
* */
