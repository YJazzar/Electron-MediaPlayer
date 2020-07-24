import { exit } from 'process';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import readDirectory from './readDirectory';
import DirectoryDetails from '../../libs/utils/DirectoryDetails';

const log = LoggerFactory.getLogger(__filename);

/**
 * @param dirPaths: string[] an array of paths for directories to read
 * @returns an object containing an array with a list of the files in each directory
 * Structure of return object: (the first element in each array is the full path of the parent directory)
 * {
 *  [dirName: string, ...fileNames]
 *  (... all other directories read in)
 * }
 */
export default function readDirectories(dirPaths: string[]): void {
    log.debug(`Now reading the directory contents of: ${dirPaths.toString()}`);

    const result: DirectoryDetails[] = [];
    // Read every directory (to get the list of files in the directory)
    dirPaths.forEach((dirPath: string) => {
        result.push(readDirectory(dirPath));
    });

    console.log(JSON.stringify(result));
    exit(0);
}
