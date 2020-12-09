import { dialog } from 'electron';
import fs from 'fs';
import LoggerFactory from '../../../libs/logger/LoggerFactory';

const log = LoggerFactory.getLogger(__filename);

export default class SystemFiles {
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

    // Returns true if the path already exists
    static pathExists(filePath: string): boolean {
        if (fs.existsSync(filePath)) {
            return true;
        }
        return false;
    }
}
