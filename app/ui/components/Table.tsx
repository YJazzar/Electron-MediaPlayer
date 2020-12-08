import { ipcRenderer } from 'electron';
import React from 'react';
import styled from 'styled-components';
import FileDetails from '../../libs/templates/FileDetails';

// const log = LoggerFactory.getUILogger(__filename);

// The styles of the table:
const TableStyledComp = styled.table`
    width: 100%;
    background-color: #dadfe3;
`;

const TBody = styled.tbody`
    color: black;
`;

const THead = styled.thead`
    text-align: center;
    border: 1px solid white;
    background-color: #434343;
`;

const TRow = styled.tr``;

const TData = styled.td`
    border: 1px solid white;
    text-align: center;
    ${TRow}:hover & {
        background-color: #fff;
    }
`;

interface Props {
    bodyContents: FileDetails[];
    clickListener: (rowNum: number) => () => void;  // A clickListener function that returns a function
                                                    // I know ill get confused by this later on (this is passed from main panel)
}

// interface State {
//     bodyContents: FileDetails[];
// }

export default class Table extends React.Component<Props, {}> {
    headerOptions: string[];

    constructor(props: Props) {
        super(props);

        this.headerOptions = ipcRenderer.sendSync('config:getTableHeaderOptions');
    }

    render() {
        return (
            <div className="">
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

        return <TRow className="">{th}</TRow>;
    }

    getTableBody(): React.ReactChild[] {
        const contents: FileDetails[] = this.props.bodyContents;
        console.log('Current contents for the table: ');
        console.dir(contents);

        // This will contain all of the table body rows to be displayed
        const tableRows: React.ReactChild[] = [];
        let tempData: React.ReactChild[];
        for (let rowNum = 0; rowNum < contents.length; rowNum += 1) {
            tempData = [];
            for (let col = 0; col < this.headerOptions.length; col += 1) {
                const key = rowNum * this.headerOptions.length + col;
                tempData.push(<TData key={key}>{this.getDataCellContents(contents[rowNum], col)}</TData>);
            }
            tableRows.push(
                <TRow key={rowNum} onClick={this.props.clickListener(rowNum)}>
                    {tempData}
                </TRow>
            );
        }

        return tableRows;
    }

    getDataCellContents(fileDetails: FileDetails, colNumber: number): string {
        const header = this.headerOptions[colNumber];

        //  ["Name", "Length", "Type", "Size", "Date Modified"]
        if (header === 'Name') {
            return fileDetails.fileName;
        }
        if (header === 'Length') {
            return fileDetails.duration + '';
        }
        if (header === 'Type') {
            return fileDetails.fileExtension;
        }
        if (header === 'Size') {
            return fileDetails.size;
        }
        if (header === 'Date Modified') {
            return fileDetails.dateElements.formattedDate;
        }

        return `null for ${header}`;
    }
}
