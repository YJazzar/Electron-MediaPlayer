import { ipcRenderer } from 'electron';
import React from 'react';
import styled from 'styled-components';

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

export default class Table extends React.Component<{}, {}> {
    headerOptions: string[];

    constructor(props: {}) {
        super(props);
        this.headerOptions = ipcRenderer.sendSync('config:getTableHeaderOptions');
    }


    render() {
        return (
            <div className={''}>
                <h1>TEST</h1>
                <TableStyledComp>
                    <THead >{this.getTableHeaders()}</THead>
                    <TBody>{this.getTableBody()}</TBody>
                </TableStyledComp>
            </div>
        );
    }

    getTableHeaders(): React.ReactChild {
        const th = [];
        for (let i = 0; i < this.headerOptions.length; i++) {
            th.push(<TData key={i} className="sticky">{this.headerOptions[i]}</TData>);
        }

        return <TRow className="top-0 bg-red-600">{th}</TRow>;
    }

    getTableBody(): React.ReactChild[] {
        // TODO: Change test data to real data:
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
