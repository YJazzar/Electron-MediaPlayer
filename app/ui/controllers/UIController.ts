import { ipcRenderer, IpcRendererEvent } from 'electron';
import { StyledComponent } from 'styled-components';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import * as Themes from '../components/Themes';
import PlaylistDetails from '../../libs/templates/PlaylistDetails';

const log = LoggerFactory.getUILogger(__filename);

// This class is a singleton class
export default class UIController {
    private static instance: UIController;

    // This is used to cache the application's theme
    private theme: string;

    // Callback to set the initial window size:
    private initialWindowSizeCallback: ((_e: IpcRendererEvent, width: number, height: number) => void) | null;

    // Callback to handle new imports:
    private handleNewImportsCallback: ((_e: IpcRendererEvent, newContents: PlaylistDetails[]) => void) | null;

    private constructor() {
        log.info('Initializing UIController...');
        this.theme = '';
        this.initialWindowSizeCallback = null;
        this.handleNewImportsCallback = null;

        /** Setting up all event handlers: */
        // Note: the event 'window-resized' was implemented in RootContainer.tsx
    }

    // Called by UIEntry.ts
    static getInstance(): UIController {
        if (!UIController.instance) {
            log.debug('Creating an instance of UIController');
            UIController.instance = new UIController();
        }
        return UIController.instance;
    }

    // This is called inside of RootComponent.tsx
    setInitialWindowSizeCB(callBack: (_e: IpcRendererEvent, width: number, height: number) => void) {
        this.initialWindowSizeCallback = callBack;

        // Event to get the initial window size after the mainWindow was finished being created
        ipcRenderer.on('initial-window-size', this.initialWindowSizeCallback);
    }

    // This is called inside of MainContentsPanelContainer.tsx
    setHandleNewImportsCB(callback: (_e: IpcRendererEvent, newContents: PlaylistDetails[]) => void) {
        this.handleNewImportsCallback = callback;

        ipcRenderer.on('status:data/index.json updated', this.handleNewImportsCallback);
    }

    getTheme(): StyledComponent<'div', never, Record<string, unknown>, never> {
        if (this.theme === '') {
            log.info('Fetching theme from server side and caching it in UIController.ts');
            this.theme = ipcRenderer.sendSync('config:getTheme').toLowerCase();
        }

        if (this.theme === 'light') {
            return Themes.LightTheme;
        }
        if (this.theme === 'dark') {
            return Themes.DarkTheme;
        }

        log.error(`The theme ${this.theme} could not be resolved. Using default fallback theme: 'dark'`);
        return Themes.DarkTheme;
    }

    // eslint-disable-next-line class-methods-use-this
    addNewPlaylist(name: string) {
        ipcRenderer.send('actions:addNewPlaylist', name);
    }
}
