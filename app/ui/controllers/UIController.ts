/* eslint-disable class-methods-use-this */
import { ipcRenderer, IpcRendererEvent } from 'electron';
import styled, { StyledComponent } from 'styled-components';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import * as Themes from '../components/Themes';
import PlaylistDetails from '../../libs/templates/PlaylistDetails';

const log = LoggerFactory.getUILogger(__filename);

// This class is a singleton class
export default class UIController {
    private static instance: UIController;

    // This is used to cache the application's theme
    private theme: string;

    private constructor() {
        log.info('Initializing UIController...');
        this.theme = '';

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
    setInitialWindowSizeCB(callback: (_e: IpcRendererEvent, width: number, height: number) => void) {
        // Event to get the initial window size after the mainWindow was finished being created
        ipcRenderer.on('initial-window-size', callback);
    }

    // This is called inside of MainContentsPanelContainer.tsx
    setHandleNewImportsCB(callback: (_e: IpcRendererEvent, newContents: PlaylistDetails[]) => void) {
        ipcRenderer.on('status:data/index.json updated', callback);
    }

    setAddPlaylistResultsCBs(
        successCB: (_e: IpcRendererEvent) => void,
        failedCB: (_e: IpcRendererEvent) => void,
        errorCB: (_e: IpcRendererEvent) => void
    ) {
        ipcRenderer.on('actions:addNewPlaylist:success', successCB);
        ipcRenderer.on('actions:addNewPlaylist:failed', failedCB);
        ipcRenderer.on('actions:addNewPlaylist:error', errorCB);
    }

    setAddPlaylistDisplay(displayCB: () => void) {
        ipcRenderer.on('actions:addNewPlaylist:display', displayCB);
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
        this.theme = 'dark';
        return Themes.DarkTheme;
    }

    getThemeName(): string {
        if (this.theme === '') {
            log.info('Fetching theme from server side and caching it in UIController.ts');
            this.theme = ipcRenderer.sendSync('config:getTheme').toLowerCase();
        }

        return this.theme;
    }

    addNewPlaylistSubmit(name: string) {
        ipcRenderer.send('actions:addNewPlaylist:submit', name);
    }
}
