import { ipcRenderer, IpcRendererEvent } from 'electron';
import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import mainConfig from '../configs/MainConfigImpl';
import navConfig from '../configs/NavConfigImpl';
import '../styles/app.global.css';
import MainContentsPanelContainer from '../panels/MainContentsPanelContainer';
import NavigationPanelContainer from '../panels/NavigationPanelContainer';
import PlayerPanelContainer from '../panels/PlayerPanelContainer';
import ApplicationState from '../../libs/templates/ApplicationState';
import UIController from '../controllers/UIController';
import styled from 'styled-components';
import PlaylistDetails from '../../libs/templates/PlaylistDetails';
import DialogManager from './DialogManager';
import FileDetails from '../../libs/templates/FileDetails';
import VerticalResizable from './VerticalResizable';
import HorizontalResizable from './HorizontalResizable';

const log = LoggerFactory.getUILogger(__filename);

const AppDiv = styled(UIController.getInstance().getTheme())`
    width: 100%;
    height: 100%;
`;

interface Props {}

export default class RootContainer extends React.Component<Props, ApplicationState> {
    verticalResizableRef: React.RefObject<VerticalResizable>;
    horizontalResizableRef: React.RefObject<HorizontalResizable>;
    dialogManagerRef: React.RefObject<DialogManager>;

    // References for each of the panels:
    mainPanelRef: React.RefObject<MainContentsPanelContainer>;
    navigationPanelRef: React.RefObject<NavigationPanelContainer>;
    playerPanelRef: React.RefObject<PlayerPanelContainer>;

    windowHeight: number;
    windowWidth: number;

    constructor(props: {}) {
        super(props);

        // Create all the refs needed
        this.verticalResizableRef = React.createRef();
        this.horizontalResizableRef = React.createRef();
        this.dialogManagerRef = React.createRef();
        this.mainPanelRef = React.createRef();
        this.navigationPanelRef = React.createRef();
        this.playerPanelRef = React.createRef();

        // Create the instance of StateController:
        // new StateController(this.mainPanelRef, this.navigationPanelRef, this.playerPanelRef);

        this.addToQueue = this.addToQueue.bind(this);
        this.playFile = this.playFile.bind(this);
        this.state = {
            playing: false,
            currFilePlaying: null,
            playlistNames: [],
            playlists: [],
            currSelectedPlaylist: '',
            queue: [],
            currQueueIndex: -1,
            playNextQueue: this.playNextQueue.bind(this),
            playPrevQueue: this.playPrevQueue.bind(this),
            addToQueue: this.addToQueue,
            playFileCB: this.playFile,
        };
        this.windowHeight = 0;
        this.windowWidth = 0;

        // Create the handles for the ipc messages
        const tempInstance: UIController = UIController.getInstance();
        tempInstance.setInitialWindowSizeCB(this.initialWindowSize.bind(this));
        tempInstance.setHandleNewImportsCB(this.updateApplicationState.bind(this));

        ipcRenderer.on('resize-window', this.mainWindowResized.bind(this));
    }

    componentDidMount() {
        log.debug(`Root container finished mounting.`);
    }

    // This will be called by MainContentsPanelContainer
    // A callback such as this method is needed to lift the state change to the PlayerPanelContainer class
    // It will also call the needed functions to control the queue (because the props passed into the component will also be updated)
    addToQueue(file: FileDetails) {
        // If something is already playing, avoid switching tracks and add it to the queue
        if (!this.state.playing) {
            this.setState({
                playing: true,
                currFilePlaying: file.filePath,
                queue: [file],
                currQueueIndex: 0,
            });
            this.dialogManagerRef.current?.addSnackbar('info', 'Started playing!');

            return;
        }

        const canBeAdded = (newFile: FileDetails): boolean => {
            return this.state.queue.every((currFile: FileDetails) => {
                return newFile.filePath !== currFile.filePath;
            });
        };

        // Add to the queue if it is a new and unique item
        if (canBeAdded(file)) {
            this.setState({
                queue: [...this.state.queue, file],
            });

            this.dialogManagerRef.current?.addSnackbar('info', 'Added to queue!');
        } else {
            log.debug('User clicked on a duplicate element');
            this.dialogManagerRef.current?.addSnackbar('warning', 'Duplicate item detected in queue!');
        }
    }

    // This will be called by the Queue.tsx component when the user clicks on an item in the queue
    // Note: for this function to work, the given "file" object must exist in ApplicationState.queue already
    playFile(file: FileDetails) {
        console.log('PlayFile called');

        // Check that it isn't the file playing already
        const index = this.state.queue.indexOf(file);
        if (index === 0) {
            return;
        }

        // Check the file is already in the queue
        if (index !== -1) {
            this.setState({
                currFilePlaying: file.filePath,
                currQueueIndex: index,
            });

            this.dialogManagerRef.current?.addSnackbar('info', `Skipped to ${file.fileName}!`);
        } else {
            log.error(
                'The function RootContainer.playFile(file: FileDetails) was called on a file that does not exist in the queue!'
            );
            this.dialogManagerRef.current?.addSnackbar('error', 'Could not play the file!');
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
    // Or called from within PlayerControls.tsx when the 'skip forwards button' is used
    playNextQueue() {
        // If nothing new can be chosen from the queue, then pause the player
        if (this.state.queue.length === 1 || this.state.currQueueIndex === this.state.queue.length - 1) {
            this.setState({
                playing: false,
                currFilePlaying: '',
                currQueueIndex: -1,
            });
        } else {
            this.setState({
                playing: true,
                currFilePlaying: this.state.queue[this.state.currQueueIndex + 1].filePath, // Get the second element
                // queue: this.state.queue.slice(1), // Remove the first element
                currQueueIndex: this.state.currQueueIndex + 1,
            });
        }
    }

     // Called from within PlayerControls.tsx when the 'skip backwards button' is used
    playPrevQueue() {
        // If nothing can be chosen from the queue, then pause the player
        if (this.state.currQueueIndex === 0) {
            this.setState({
                playing: false,
                currFilePlaying: '',
                currQueueIndex: -1,
            });
        } else {
            // Either wrap around the queue, or get the prev file
            const newIndex = this.state.currQueueIndex === -1 ? this.state.queue.length - 1 : this.state.currQueueIndex - 1;
            this.setState({
                playing: true,
                currFilePlaying: this.state.queue[newIndex].filePath, // Get the second element
                // queue: this.state.queue.slice(1), // Remove the first element
                currQueueIndex: newIndex,
            });
        }
    }

    // This is the callback provided to the UIController class.
    // This callback will handle updating the Application State every time the user imports a new playlist
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

        this.windowWidth = width;
        this.windowHeight = height;
    }

    mainWindowResized(_e: Event, newScreenWidth: number, newScreenHeight: number) {
        const deltaWidth = newScreenWidth - this.windowWidth;
        const deltaHeight = newScreenHeight - this.windowHeight;

        this.horizontalResizableRef .current?.mainWindowResized(deltaWidth);
        this.verticalResizableRef.current?.mainWindowResized(deltaHeight);

        this.windowHeight = newScreenHeight;
        this.windowWidth = newScreenWidth;
    }

    render() {
        return (
            <AppDiv id="root-container">
                <HorizontalResizable
                    ref={this.horizontalResizableRef}
                    leftChild={this.getNavigationPanel()}
                    rightChild={this.getVerticalResizable()}
                    leftChildDefaultWidth={navConfig.sizeProps.defaultWidth}
                    leftChildMaxWidth={navConfig.sizeProps.maxWidth}
                    leftChildMinWidth={navConfig.sizeProps.minWidth}
                />

                <DialogManager ref={this.dialogManagerRef} />
            </AppDiv>
        );
    }

    getVerticalResizable(): React.ReactChild {
        return (
            <VerticalResizable
                ref={this.verticalResizableRef}
                topChild={this.getMainContentsPanel()}
                bottomChild={this.getPlayerPanel()}
                topChildDefaultHeight={mainConfig.sizeProps.defaultHeight}
                topChildMaxHeight={mainConfig.sizeProps.maxHeight}
                topChildMinHeight={mainConfig.sizeProps.minHeight}
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
