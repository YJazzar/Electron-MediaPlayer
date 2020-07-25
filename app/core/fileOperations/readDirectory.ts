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
export default async function readDirectory(
    dirPath: string
): Promise<DirectoryDetails> {
    // Create the initial object to return later on
    const ddResult: DirectoryDetails = {
        dirPath,
        fileStatDetails: [],
    };

    // This variable will contain an array of filenames existing under dirPath
    //     (NOTE: each entry in the files is the fileName only, not the full filePath)
    const files: string[] = fs.readdirSync(dirPath);

    // Read every filename from within this current directory
    const promises = files.map(async (fileName: string) => {
        const fileDetail = await readFileStat(dirPath, fileName)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err);
            });

        if (fileDetail) {
            ddResult.fileStatDetails.push(fileDetail);
        }
    });

    await Promise.all(promises);
    return ddResult;
}
