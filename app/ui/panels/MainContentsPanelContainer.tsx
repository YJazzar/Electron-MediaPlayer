import React from 'react';
import mainConfig from '../configs/MainConfigImpl';
import Table from '../components/Table';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import FileDetails from '../../libs/templates/FileDetails';
import ApplicationState from '../../libs/templates/ApplicationState';

const log = LoggerFactory.getUILogger(__filename);

interface State {
    tableContents: FileDetails[];
}

export default class MainContentsPanelContainer extends React.Component<ApplicationState, State> {
    tableRef: React.RefObject<Table>;

    constructor(props: ApplicationState) {
        super(props);

        // Create the needed ref and init the state
        this.tableRef = React.createRef();
        this.state = {
            tableContents: [],
        };
    }

    updateTable(newContents: FileDetails[]) {
        log.debug('Updating table from main contents panel container.tsx');
        this.setState({ tableContents: newContents });
    }

    // A listener to check the row that was clicked
    rowClickListener(rowNum: number) {
        return () => {
            log.debug('Playing: ' + this.state.tableContents[rowNum].filePath);
            this.props.playNewFile(this.state.tableContents[rowNum].filePath);
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
            </div>
        );
    }
}
