import { app } from 'electron';
import IpcMainController from '../../core/controllers/IpcMainController';
import DirectoryOperations from '../../core/fileOperations/DirectoryOperations';

export default function getMenuTemplate(controller: IpcMainController): any[] {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Import Folder',
                    accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',

                    // Action:
                    click() {
                        DirectoryOperations.importFolders(controller.statusUpdateDataIndex.bind(controller));
                    },
                },
                {
                    label: 'Import File(s)',
                    accelerator: process.platform === 'darwin' ? 'Command+O' : 'Ctrl+O',

                    // Action:
                    click() {
                        DirectoryOperations.importFiles(controller.statusUpdateDataIndex.bind(controller));
                    },
                },
                {
                    label: 'Clear Items',
                    // accelerator: process.platform == 'darwin' ? 'Command+A' : 'Ctrl+A',
                    click() {
                        // Action:
                    },
                },
                {
                    label: 'Quit',
                    accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',

                    // Action:
                    click() {
                        app.quit();
                    },
                },
            ],
        },
    ] as any;

    // If the current system is a mac, then add an empty object to the beginning of the template array.
    if (process.platform === 'darwin') {
        template.unshift({});
    }
    return template;
}
