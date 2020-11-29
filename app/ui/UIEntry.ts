import { ipcRenderer } from 'electron';
import LoggerFactory from '../libs/logger/LoggerFactory';
import RootContainer from './containers/RootContainer';
import UIController from './controllers/UIController';
// import './ui/styles/test.global.css';

const log = LoggerFactory.getUILogger(__filename);

export default class UIEntry {
    private rootComponentRef: React.RefObject<RootContainer>;

    private theme: string;

    // Called by index.tsx
    constructor(rootComponentRef: React.RefObject<RootContainer>) {
        log.debug('Starting UIEntry instance');

        this.rootComponentRef = rootComponentRef;

        // Initialize the UIController instance
        UIController.getInstance();

        this.theme = ipcRenderer.sendSync('config:getTheme');
        log.info(`Current theme set is [${this.theme}]`);
    }
}
