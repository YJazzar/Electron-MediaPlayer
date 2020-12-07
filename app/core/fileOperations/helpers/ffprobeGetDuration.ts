import { exec } from 'child_process';
import { app } from 'electron';
import path from 'path';

const appRootDir = require('app-root-dir');

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

const prodExecPath = path.join(path.resolve(app.getPath('exe')), '..', 'resources', 'bin');
const devExecPath = path.join(appRootDir.get(), 'resources', getPlatform());

const execPath = process.env.NODE_ENV === 'production' ? prodExecPath : devExecPath;

const cmd = `${path.join(execPath, process.platform === 'win32' ? 'ffprobe.exe' : 'ffprobe')}`;

export default function ffprobeGetDuration(filePath: string): Promise<number> {
    const params = [];
    params.push('-v', 'error', '-show_entries', 'format=duration', '-of default=noprint_wrappers=1:nokey=1', `"${filePath}"`);

    // The command to run is constructed:
    const command = `${cmd} ${params.join(' ')}`;

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                return reject(error);
            }
            // log.debug(`stdout: ${stdout}`);
            // log.database(`stderr: ${stderr}`);
            return resolve(parseFloat(stdout));
        });
    });
}
