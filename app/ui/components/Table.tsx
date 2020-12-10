import { TableBody, TableContainer, TableRow } from '@material-ui/core';
import { Table as TableMaterial} from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableHead from '@material-ui/core/TableHead/TableHead';
import { ipcRenderer } from 'electron';
import React from 'react';
import FileDetails from '../../libs/templates/FileDetails';

// const log = LoggerFactory.getUILogger(__filename);

// The styles of the table:
interface Props {
    bodyContents: FileDetails[];
    clickListener: (newDilePath: string) => () => void; // A clickListener function that returns a function
                                                        // I know ill get confused by this later on (this is passed from main panel)
}

export default class Table extends React.Component<Props, {}> {
    headerOptions: string[];

    constructor(props: Props) {
        super(props);

        this.headerOptions = ipcRenderer.sendSync('config:getTableHeaderOptions');
    }

    render() {
        return (
            <TableContainer component={Paper}>
                <TableMaterial stickyHeader={true}>
                    <TableHead>{this.getTableHeaders()}</TableHead>
                    <TableBody>{this.getTableBody()}</TableBody>
                </TableMaterial>
            </TableContainer>
        );
    }

    getTableHeaders(): React.ReactChild {
        const th = [];
        for (let i = 0; i < this.headerOptions.length; i++) {
            th.push(
                <TableCell key={i}>
                    {this.headerOptions[i]}
                </TableCell>
            );
        }

        return <TableRow className="">{th}</TableRow>;
    }

    getTableBody(): React.ReactChild[] {

        const contents: FileDetails[] = this.props.bodyContents.filter((file: FileDetails) => {
            return !file.isDirectory && file.duration != -1;
        });
        console.log('Current contents for the table: ');
        console.dir(contents);

        // This will contain all of the table body rows to be displayed
        const tableRows: React.ReactChild[] = [];
        let tempData: React.ReactChild[];
        for (let rowNum = 0; rowNum < contents.length; rowNum += 1) {
            tempData = [];
            for (let col = 0; col < this.headerOptions.length; col += 1) {
                const key = rowNum * this.headerOptions.length + col;
                tempData.push(<TableCell key={key}>{this.getDataCellContents(contents[rowNum], col)}</TableCell>);
            }
            tableRows.push(
                <TableRow key={rowNum} hover={true} onClick={this.props.clickListener(contents[rowNum].filePath)}>
                    {tempData}
                </TableRow>
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
