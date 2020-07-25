import fs from 'fs';
import path from 'path';
import LoggerFactory from '../../../libs/logger/LoggerFactory';
import FileDetails from '../../../libs/utils/FileDetails';
import getFileDetails from './getFileDetails';

const log = LoggerFactory.getLogger(__filename);

export default async function readFileStat(
    dirPath: string,
    fileName: string
): Promise<FileDetails | undefined> {
    // Construct the full path of the current file
    const filePath: string = path.join(dirPath, fileName);

    console.log(`now processing file: ${filePath}`);
    try {
        const statResult = fs.statSync(filePath);
        return await getFileDetails(filePath, fileName, statResult);
    } catch (err) {
        log.error(`Could not get information on the file: [${filePath}]`);
        return Promise.reject(err);
    }
}
