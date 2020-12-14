import React from 'react';
import mainConfig from '../configs/MainConfigImpl';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import FileDetails from '../../libs/templates/FileDetails';
import ApplicationState from '../../libs/templates/ApplicationState';
import styled from 'styled-components';
import UIController from '../controllers/UIController';
import MainTable from '../components/MainTable';

const log = LoggerFactory.getUILogger(__filename);

// ${UIController.getInstance().getThemeCSS()}
const MainPanelDiv = styled(UIController.getInstance().getTheme())`
    height: 100%;
    overflow: auto;
    padding: 1rem;
`;

interface State {
    currPlaylistIndex: number;
}

export default class MainContentsPanelContainer extends React.Component<ApplicationState, State> {
    tableRef: React.RefObject<MainTable>;
    private currPlaylistIndex: number;

    constructor(props: ApplicationState) {
        super(props);

        // Create the needed ref and init the state
        this.tableRef = React.createRef();
        this.state = {
            currPlaylistIndex: -1,
        };
        this.currPlaylistIndex = -1;
    }

    // A listener to check the row that was clicked
    rowClickListener(file: FileDetails) {
        return () => {
            this.props.playNewFileCB(file);
        };
    }

    render() {
        this.updateState();

        let tableContents: FileDetails[] = [];
        if (this.currPlaylistIndex == -1) {
            tableContents = [];
        } else {
            tableContents = this.props.playlists[this.currPlaylistIndex].mediaFiles;
        }

        return (
            <MainPanelDiv id={'MainPanelDiv'} className={mainConfig.cssClassStyles}>
                <h1>Main Contents Panel</h1>
                <MainTable ref={this.tableRef} bodyContents={tableContents} clickListener={this.rowClickListener.bind(this)} />
            </MainPanelDiv>
        );
    }

    // This function will control what files are displayed by the table rendered within this component
    updateState(): void {
        // Return early if no playlist was selected yet
        if (this.props.currSelectedPlaylist === '') {
            this.currPlaylistIndex = -1;
            return;
        }

        // log.debug(`Finding the new playlist id: {${this.props.currSelectedPlaylist}}`);
        for (let i = 0; i < this.props.playlists.length; i++) {
            if (this.props.currSelectedPlaylist === this.props.playlists[i].playlistName) {
                this.currPlaylistIndex = i;
                return;
            }
        }

        log.warning(`Could not find the playlist: "${this.props.currSelectedPlaylist}"`);
        this.currPlaylistIndex = -1;
    }
}
