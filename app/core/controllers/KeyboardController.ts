import { globalShortcut } from 'electron';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import IpcMainController from './IpcMainController';

const log = LoggerFactory.getLogger(__filename);

export default class KeyboardController {
    static createGlobalShortcuts() {
        // Note to self: this will literally set the shortcuts globally, even if the window is not focused.
        // globalShortcut.register('Space', () => {
        //     IpcMainController.getInstance().togglePlayPause();
        //     log.debug('Toggled pause/play');
        // });
    }
}
