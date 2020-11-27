import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import mainConfig from '../configs/MainConfigImpl';
import Table from '../components/Table';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import FileDetails from '../../libs/templates/FileDetails';

const log = LoggerFactory.getUILogger(__filename);

export default class MainContentsPanelContainer extends React.Component<{}, { test: boolean }> {

    tableRef: React.RefObject<Table>;

    constructor(props: {}) {
        super(props);

        // Create the needed ref and init the state
        this.tableRef = React.createRef();
        this.state = {
            test: false,
        };
    }

    updateTable(newContents: FileDetails[]) {
        log.debug('Updating table from main contents panel container.tsx');

        this.tableRef.current?.updateTableBody(newContents);
    }

    render() {
        return (
            <div className={mainConfig.cssClassStyles}>
                <h1>Main Contents Panel</h1>
                <Table ref={this.tableRef} bodyContents={[]} />
            </div>
        );
    }
}
