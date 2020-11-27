import { ipcRenderer } from 'electron';
import React from 'react';
import styled from 'styled-components';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import FileDetails from '../../libs/templates/FileDetails';

const log = LoggerFactory.getUILogger(__filename);

// The styles of the table:
const TableStyledComp = styled.table`
    width: 100%;
    justify: centered;
    background-color: #dadfe3;
`;

const TBody = styled.tbody`
    color: black;
`;

const THead = styled.thead`
    text-align: center;
    border: 1px solid white;
`;

const TRow = styled.tr``;

const TData = styled.td`
    border: 1px solid white;
    text-align: center;
    ${TRow}:hover & {
        background-color: #fff;
    }
`;

// A listener to check the row that was clicked
function getClickListener(rowNum: number) {
    return () => {
        console.log('clicked');
        console.log(rowNum);
    };
}

interface Props {
    bodyContents: FileDetails[];
}

interface State {
    bodyContents: FileDetails[];
}

export default class Table extends React.Component<Props, State> {
    headerOptions: string[];

    constructor(props: Props) {
        super(props);

        this.state = {bodyContents: props.bodyContents};

        this.headerOptions = ipcRenderer.sendSync('config:getTableHeaderOptions');
    }

    // This function will be used by the ref maintained in MainContentsPanelContainer.tsx
    updateTableBody(newContents: FileDetails[]) {
        log.debug('New contents were received at Table.tsx');
        this.setState({ bodyContents: newContents });
    }

    render() {
        return (
            <div className={''}>
                <h1>TEST</h1>
                <TableStyledComp>
                    <THead>{this.getTableHeaders()}</THead>
                    <TBody>{this.getTableBody()}</TBody>
                </TableStyledComp>
            </div>
        );
    }

    getTableHeaders(): React.ReactChild {
        const th = [];
        for (let i = 0; i < this.headerOptions.length; i++) {
            th.push(
                <TData key={i} className="sticky">
                    {this.headerOptions[i]}
                </TData>
            );
        }

        return <TRow className="top-0 bg-red-600">{th}</TRow>;
    }

    getTableBody(): React.ReactChild[] {
        const contents: FileDetails[] = this.state.bodyContents;
        console.log('Received contents for the table: ');
        console.dir(contents);

        let tr: React.ReactChild[] = [];
        for (let row = 0; row < 50; row++) {
            let td = [];
            for (let i = 0; i < 5; i++) {
                td.push(<TData key={i + row * 3}>{i + row * 3}</TData>);
            }
            tr.push(
                <TRow key={row} onClick={getClickListener(row)}>
                    {td}
                </TRow>
            );
        }

        return tr;
    }
}
