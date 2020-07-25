import { Stats } from 'fs';
import { getVideoDurationInSeconds } from 'get-video-duration';
import LoggerFactory from '../../../libs/logger/LoggerFactory';
import FileDetails from '../../../libs/templates/FileDetails';

const log = LoggerFactory.getLogger(__filename);

function getFileName(fileName: string) {
    const temp = fileName.split('.');
    if (temp.length >= 1) {
        return temp[0];
    }
    return ''; // No file name found
}

function getExtension(fileName: string) {
    const temp = fileName.split('.');
    if (temp.length <= 1) {
        return ''; // No file extension found
    }
    return temp[temp.length - 1];
}

// Converts bytes to the most appropriate size indicator
//      Source: https://coderrocketfuel.com/article/how-to-convert-bytes-to-kb-mb-gb-or-tb-format-in-node-js
function convertBytes(bytes: number) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes === 0) {
        return '0 Bytes';
    }

    const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);

    if (i === 0) {
        return `${bytes} ${sizes[i]}`;
    }

    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

function getDuration(filePath: string): Promise<number> {
    return getVideoDurationInSeconds(filePath)
        .then((duration: number) => {
            return duration;
        })
        .catch(() => {
            log.warning(`Could not get the duration of file: ${filePath}`);
            return 0;
        });
}

export default async function getFileDetails(
    filePath: string, // The full resolvable path
    fileName: string, // Filename with with extension included
    fileStatObj: Stats
): Promise<FileDetails> {
    const fdResult: FileDetails = {
        isFile: !fileStatObj.isDirectory(),
        isDirectory: fileStatObj.isDirectory(),
        filePath,
        fileName: getFileName(fileName),
        fileExtension: getExtension(fileName),
        size: convertBytes(fileStatObj.size),
        duration: await getDuration(filePath),
    };

    return fdResult; // fdResult;
}
