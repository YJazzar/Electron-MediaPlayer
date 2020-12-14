import { ipcRenderer, IpcRendererEvent } from 'electron';
import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import mainConfig from '../configs/MainConfigImpl';
import navConfig from '../configs/NavConfigImpl';
import '../styles/app.global.css';
import '../styles/contentResizables.global.css';
import '../styles/navResizables.global.css';
// import '../styles/theme.global.css';
import HorizontalResizableContainer from './HorizontalResizableContainer';
import MainContentsPanelContainer from '../panels/MainContentsPanelContainer';
import NavigationPanelContainer from '../panels/NavigationPanelContainer';
import PlayerPanelContainer from '../panels/PlayerPanelContainer';
import VerticalResizableContainer from './VerticalResizableContainer';
import ApplicationState from '../../libs/templates/ApplicationState';
import UIController from '../controllers/UIController';
import styled from 'styled-components';
import PlaylistDetails from '../../libs/templates/PlaylistDetails';
import DialogManager from '../panels/DialogManager';
import FileDetails from '../../libs/templates/FileDetails';

const log = LoggerFactory.getUILogger(__filename);

/* ${UIController.getInstance().getThemeCSS()} */
const AppDiv = styled(UIController.getInstance().getTheme())``;

interface Props {}

export default class RootContainer extends React.Component<Props, ApplicationState> {
    verticalResizableContainerRef: React.RefObject<VerticalResizableContainer>;
    horizontalResizableContainerRef: React.RefObject<HorizontalResizableContainer>;
    dialogManagerRef: React.RefObject<DialogManager>;

    // References for each of the panels:
    mainPanelRef: React.RefObject<MainContentsPanelContainer>;
    navigationPanelRef: React.RefObject<NavigationPanelContainer>;
    playerPanelRef: React.RefObject<PlayerPanelContainer>;

    constructor(props: {}) {
        super(props);

        // Create all the refs needed
        this.verticalResizableContainerRef = React.createRef();
        this.horizontalResizableContainerRef = React.createRef();
        this.dialogManagerRef = React.createRef();
        this.mainPanelRef = React.createRef();
        this.navigationPanelRef = React.createRef();
        this.playerPanelRef = React.createRef();

        // Create the instance of StateController:
        // new StateController(this.mainPanelRef, this.navigationPanelRef, this.playerPanelRef);

        this.playNewFile = this.playNewFile.bind(this);
        this.state = {
            playing: false,
            currFilePlaying: null,
            window: {
                width: 0,
                height: 0,
            },
            playNewFileCB: this.playNewFile,
            playlistNames: [],
            playlists: [],
            currSelectedPlaylist: '',
            queue: [],
            getNextQueue: this.getNextQueue.bind(this),
        };

        // Create the handles for the ipc messages
        UIController.getInstance().setInitialWindowSizeCB(this.initialWindowSize.bind(this));
        UIController.getInstance().setHandleNewImportsCB(this.updateApplicationState.bind(this));
        ipcRenderer.on('resize-window', this.mainWindowResized.bind(this));
    }

    componentDidMount() {
        log.debug(`Root container finished mounting.`);
    }

    // This will be called by MainContentsPanelContainer
    // A callback such as this method is needed to lift the state change to the PlayerPanelContainer class
    // It will also call the needed functions to implement a queue (because the props passed into the component will also be updated)
    playNewFile(file: FileDetails) {
        // If something is already playing, avoid switching tracks and add it to the queue
        if (!this.state.playing) {
            this.setState({
                playing: true,
                currFilePlaying: file.filePath,
                queue: [file],
            });
            this.dialogManagerRef.current?.openInfoSnackbar({} as any, 'Started playing!');
        }
        // Add to the queue if it is a new and unique item
        else if (!this.state.queue.includes(file)) {
            console.dir(this.state.queue)
            this.setState({
                queue: [...this.state.queue, file],
            });

            this.dialogManagerRef.current?.openInfoSnackbar({} as any, 'Added to queue!');
        } else {
            log.debug('User clicked on a duplicate element');
            this.dialogManagerRef.current?.openWarningSnackbar({} as any, 'Duplicate item detected in queue!');
        }
    }

    // This will be called from within NavigationPanelContainer
    // It will be used to change the ApplicationState so it points to a different playlist
    changePlaylist(newPlaylist: string) {
        this.setState({
            currSelectedPlaylist: newPlaylist,
        });
    }

    // Called from within PlayerSlider.tsx when the current playing file ends playing
    getNextQueue() {
        // If nothing new can be chosen from the queue, then pause the player
        if (this.state.queue.length === 1) {
            this.setState({
                playing: false,
                currFilePlaying: '',
                queue: [],
            });
        } else {
            this.setState({
                playing: true,
                currFilePlaying: this.state.queue[1].filePath, // Get the second element
                queue: this.state.queue.slice(1), // Remove the first element
            });
        }
    }

    // This is the callback provided to the UIController class.
    // This callback will handel updating the Application State every time the user imports a new playlist
    updateApplicationState(_e: IpcRendererEvent, playlistDetails: PlaylistDetails[]): void {
        // Extract the list of playlists for updating the state
        const playlistNames: string[] = [];
        for (let i = 0; i < playlistDetails.length; i++) {
            playlistNames.push(playlistDetails[i].playlistName);
        }

        // Update the application's state as needed:
        this.setState({
            playlistNames,
            playlists: playlistDetails,
        });

        // this.mainPanelRef.current?.updateState();
        // Once the state has been updated, the render() functions for all sub-components will be called
    }

    initialWindowSize(_e: IpcRendererEvent, width: number, height: number) {
        log.debug(`initial-window-size was received... now setting the width ${width} ${height}`);
        this.setState({
            window: {
                width: width,
                height: height,
            },
        });

        this.verticalResizableContainerRef.current?.initWindowSize();
        this.horizontalResizableContainerRef.current?.initWindowSize();
    }

    mainWindowResized(e: Event, newScreenWidth: number, newScreenHeight: number) {
        const deltaWidth = newScreenWidth - this.state.window.width;
        const deltaHeight = newScreenHeight - this.state.window.height;

        this.verticalResizableContainerRef.current?.mainWindowResized(deltaWidth);
        this.horizontalResizableContainerRef.current?.mainWindowResized(deltaHeight);
        this.setState({
            window: {
                width: newScreenWidth,
                height: newScreenHeight,
            },
        });
    }

    render() {
        return (
            <AppDiv id="root-container">
                <DialogManager ref={this.dialogManagerRef}/>
                <VerticalResizableContainer
                    ref={this.verticalResizableContainerRef}
                    leftDivId={'nav-panel-resizable-left'}
                    rightDivId={'main-player-panel-combined-resizable-right'}
                    handleDivId={'nav-panel-handle'}
                    cssLeftWidthVarName={'--nav-panel-resizable-width-left'}
                    cssMinWidthVarName={'--nav-panel-min-width'}
                    cssMaxWidthVarName={'--nav-panel-max-width'}
                    leftPanelComponent={this.getNavigationPanel()}
                    rightPanelComponent={this.getHorizontalResizableContainer()}
                    leftPanelConfig={navConfig}
                />
            </AppDiv>
        );
    }

    getHorizontalResizableContainer(): React.ReactChild {
        return (
            <HorizontalResizableContainer
                ref={this.horizontalResizableContainerRef}
                topDivId={'content-panel-resizable-top'}
                bottomDivId={'player-panel-resizable-bottom'}
                handleDivId={'content-panel-handle'}
                cssTopHeightVarName={'--content-panel-resizable-height-top'}
                cssBottomHeightVarName={'--player-panel-resizable-height-bottom'}
                cssMinHeightVarName={'--content-panel-min-height'}
                cssMaxHeightVarName={'--content-panel-max-height'}
                topPanelComponent={this.getMainContentsPanel()}
                bottomPanelComponent={this.getPlayerPanel()}
                topPanelConfig={mainConfig}
            />
        );
    }

    // Helper functions to get the contents of each panel
    getNavigationPanel(): React.ReactChild {
        return (
            <NavigationPanelContainer
                ref={this.navigationPanelRef}
                {...this.state}
                changePlaylist={this.changePlaylist.bind(this)}
            />
        );
    }

    getMainContentsPanel(): React.ReactChild {
        return <MainContentsPanelContainer ref={this.mainPanelRef} {...this.state} />;
    }

    getPlayerPanel(): React.ReactChild {
        return <PlayerPanelContainer ref={this.playerPanelRef} {...this.state} />;
    }
}
