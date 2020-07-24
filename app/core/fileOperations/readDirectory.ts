import fs from 'fs';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import DirectoryDetails from '../../libs/utils/DirectoryDetails';
import readFileStat from './readFileStat';

const log = LoggerFactory.getLogger(__filename);

// This function only reads in a single directory
/**
 * @param dirPath: string path for directory to read
 * @returns a DirectoryDetails Object
 */
export default function readDirectory(dirPath: string): DirectoryDetails {
    // Create the initial object to return later on
    const ddResult: DirectoryDetails = {
        dirPath,
        fileStatDetails: [],
    };

    try {
        // This variable will contain an array of filenames existing under dirPath
        //     (NOTE: each entry in the files is the fileName only, not the full filePath)
        const files: string[] = fs.readdirSync(dirPath);

        // Read every filename from within this current directory
        files.forEach((fileName: string) => {
            const fileDetail = readFileStat(dirPath, fileName);
            if (fileDetail) {
                ddResult.fileStatDetails.push(fileDetail);
            }
        });
    } catch (error) {
        log.error(error);
    }

    return ddResult;
}
