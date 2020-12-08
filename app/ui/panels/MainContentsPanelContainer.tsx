import React from 'react';
import mainConfig from '../configs/MainConfigImpl';
import Table from '../components/Table';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import FileDetails from '../../libs/templates/FileDetails';
import ApplicationState from '../../libs/templates/ApplicationState';
import styled from 'styled-components';
import UIController from '../controllers/UIController';

const log = LoggerFactory.getUILogger(__filename);

const MainPanelDiv = styled(UIController.getInstance().getTheme())`
    height: 100%;
    overflow: auto;
    padding: 1rem;
`;

interface State {
	currPlaylistIndex: number;
}

export default class MainContentsPanelContainer extends React.Component<ApplicationState, State> {
    tableRef: React.RefObject<Table>;
    private currPlaylistIndex: number;

	constructor(props: ApplicationState) {
		super(props);

		// Create the needed ref and init the state
		this.tableRef = React.createRef();
		this.state = {
			currPlaylistIndex: -1
        };
        this.currPlaylistIndex = -1;
	}

	// A listener to check the row that was clicked
	rowClickListener(rowNum: number) {
		return () => {
			const fileDets = this.props.playlists[this.currPlaylistIndex].mediaFiles[rowNum];

			log.debug('Playing: ' + fileDets.filePath);
			this.props.playNewFileCB(fileDets.filePath);
		};
	}

	render() {
        this.updateState();
        console.log('MAIN RE_RENDERED');
		let tableContents: FileDetails[] = [];
		if (this.currPlaylistIndex == -1) {
			tableContents = [];
		} else {
            console.log("THESE: " + this.currPlaylistIndex);
            tableContents = this.props.playlists[this.currPlaylistIndex].mediaFiles;
            console.dir(tableContents);
		}

		return (
			<MainPanelDiv className={mainConfig.cssClassStyles}>
				<h1>Main Contents Panel</h1>
				<Table
					ref={this.tableRef}
					bodyContents={tableContents}
					clickListener={this.rowClickListener.bind(this)}
				/>
			</MainPanelDiv>
		);
	}

	// This function will control what files are displayed by the table rendered within this component
	updateState(): void {
        console.log(`Finding the new playlist id: {${this.props.currSelectedPlaylist}}`);
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
