import { Stats } from 'fs';
import moment from 'moment';
import LoggerFactory from '../../../libs/logger/LoggerFactory';
import FileDetails, { DateElements } from '../../../libs/templates/FileDetails';

const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');

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

function getDuration(filePath: string): Promise<string> {
    return ffprobe(filePath, { path: ffprobeStatic.path })
        .then((data: any) => {
            log.debug(filePath);
            log.debug(JSON.stringify(data));
            return data.streams[0].tags.DURATION;
            // return duration;
        })
        .catch(() => {
            log.warning(`Could not get the duration of file: ${filePath}`);
            return -1;
        });
}

function getDateElements(date: Date): DateElements {
    return {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        month: date.getMonth() + 1,
        day: date.getDay(),
        year: date.getFullYear(),
        formattedDate: moment(date).format('l'),
        formattedTime: moment(date).format('LTS'),
    };
}

export default async function getFileDetails(
    filePath: string, // The full resolvable path
    fileName: string, // Filename with with extension included
    fileStatObj: Stats
): Promise<FileDetails> {
    const date: Date = new Date(fileStatObj.mtimeMs);

    const fdResult: FileDetails = {
        isFile: !fileStatObj.isDirectory(),
        isDirectory: fileStatObj.isDirectory(),
        filePath,
        fileName: getFileName(fileName),
        fileExtension: getExtension(fileName),
        size: convertBytes(fileStatObj.size),
        duration: await getDuration(filePath),
        dateElements: getDateElements(date),
    };

    return fdResult; // fdResult;
}
