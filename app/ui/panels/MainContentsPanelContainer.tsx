import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import mainConfig from '../configs/MainConfigImpl';
import Table from '../components/Table';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import FileDetails from '../../libs/templates/FileDetails';

const log = LoggerFactory.getUILogger(__filename);

interface State {
    tableContents: FileDetails[];
    playing: boolean;
    currFilePlaying: string;
}

export default class MainContentsPanelContainer extends React.Component<{}, State> {
    tableRef: React.RefObject<Table>;

    constructor(props: {}) {
        super(props);

        // Create the needed ref and init the state
        this.tableRef = React.createRef();
        this.state = {
            tableContents: [],
            playing: false,
            currFilePlaying: '',
        };
    }

    updateTable(newContents: FileDetails[]) {
        log.debug('Updating table from main contents panel container.tsx');
        this.setState({ tableContents: newContents });
    }

    // A listener to check the row that was clicked
    rowClickListener(rowNum: number) {
        return () => {
            console.log('clicked' + rowNum);
            this.setState({
                playing: true,
                currFilePlaying: this.state.tableContents[rowNum].filePath,
            });
        };
    }

    render() {
        return (
            <div className={mainConfig.cssClassStyles}>
                <h1>Main Contents Panel</h1>
                <Table
                    ref={this.tableRef}
                    bodyContents={this.state.tableContents}
                    clickListener={this.rowClickListener.bind(this)}
                />
                {this.state.playing &&
                    <div id="audio-player" style={{display: "none"}}>
                        <ReactAudioPlayer src={this.state.currFilePlaying} autoPlay controls />
                    </div>
                }
            </div>
        );
    }
}
