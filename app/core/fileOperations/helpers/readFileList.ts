import path from 'path';
import LoggerFactory from '../../../libs/logger/LoggerFactory';
import readFileStat from './readFileStat';
import FileDetails from '../../../libs/templates/FileDetails';

const log = LoggerFactory.getLogger(__filename);

// This function will extract the the file path and file name from the full path.
// Ex: ./path/to/file.txt will return dirPath: './path/to', fileName: 'file.txt'
function extractFilePath(filePath: string): { dirPath: string; fileName: string } {
    const fileName = path.basename(filePath);
    const index = filePath.lastIndexOf(fileName);

    return { dirPath: filePath.substring(0, index - 1), fileName };
}

// This function only reads in a single directory
/**
 * @param filePath: string array of the files to read in
 * @returns a FileDetails array
 */
export default async function readFileList(filePaths: string[]): Promise<FileDetails[]> {
    // Create the initial object to return later on
    const filesResult: FileDetails[] = [];

    // Read every filename from within this current directory
    const promises = filePaths.map(async (filePath: string) => {
        const { dirPath, fileName } = extractFilePath(filePath);
        const fileDetail = await readFileStat(dirPath, fileName)
            .then((result) => {
                return result;
            })
            .catch((err) => {
                log.error(err);
            });

        if (fileDetail) {
            filesResult.push(fileDetail);
        }
    });

    await Promise.all(promises);
    return filesResult;
}
