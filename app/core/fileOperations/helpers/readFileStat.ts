import fs from 'fs';
import path from 'path';
import LoggerFactory from '../../../libs/logger/LoggerFactory';
import getFileDetails from './getFileDetails';
import FileDetails from '../../../libs/templates/FileDetails';

const log = LoggerFactory.getLogger(__filename);

export default async function readFileStat(dirPath: string, fileName: string): Promise<FileDetails | undefined> {
    // Construct the full path of the current file
    const filePath: string = path.join(dirPath, fileName);

    try {
        const statResult = fs.statSync(filePath);
        return await getFileDetails(filePath, fileName, statResult);
    } catch (err) {
        log.error(`Could not get information on the file: [${filePath}]`);
        return Promise.reject(err);
    }
}
