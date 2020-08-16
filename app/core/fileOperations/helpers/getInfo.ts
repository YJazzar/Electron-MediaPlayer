import { spawnSync } from 'child_process';
import { app } from 'electron';
import path from 'path';
import LoggerFactory from '../../../libs/logger/LoggerFactory';

const appRootDir = require('app-root-dir');

const log = LoggerFactory.getLogger(__filename);

function getPlatform(): string {
    switch (process.platform) {
        case 'aix':
        case 'freebsd':
        case 'linux':
        case 'openbsd':
        case 'android':
            return 'linux';
        case 'darwin':
        case 'sunos':
            return 'mac';
        case 'win32':
            return 'win';

        default:
            return 'win';
    }
}

const prodExecPath = path.join(
    path.resolve(app.getPath('exe')),
    '..',
    'resources',
    'bin'
);
const devExecPath = path.join(appRootDir.get(), 'resources', getPlatform());

const execPath =
    process.env.NODE_ENV === 'production' ? prodExecPath : devExecPath;

const cmd = `${path.join(
    execPath,
    process.platform === 'win32' ? 'ffprobe.exe' : 'ffprobe'
)}`;

export default function getInfo(filePath: any): Promise<number> {
    const params = [];
    // ffprobe -i <file> -show_entries format=duration -v quiet -of csv="p=0"
    params.push(
        '-v error',
        '-show_entries format=duration',
        '-of default=noprint_wrappers=1:nokey=1',
        `"${filePath}"`
    );

    const command = `${cmd} ${params.join(' ')}`;

    log.debug('Now running the following command:');
    log.debug(command);

    const ffprobe = spawnSync(command, function (
        error: any,
        stdout: string,
        stderr: string
    ) {
        if (error) {
            console.log(error.stack);
            console.log(`Error code: ${error.code}`);
            console.log(`Signal received: ${error.signal}`);
        }
        console.log(`Child Process STDOUT: ${stdout}`);
        console.log(`Child Process STDERR: ${stderr}`);
    });

    return Promise.resolve(6999);
}
