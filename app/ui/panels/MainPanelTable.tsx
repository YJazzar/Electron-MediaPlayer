import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
    width: 100%;
    justify: centered;
    background-color: #a17806;
`;

const TBody = styled.tbody``;

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

function getClickListener(rowNum: number) {
    return () => {
        console.log('clicked');
        console.log(rowNum);
    };
}

export default class MainPanelTable extends React.Component<{}, {}> {
    render() {
        return (
            <div className={''}>
                <h1>TEST</h1>
                <Table>
                    <THead>
                        <TRow>{this.getTableHeaders()}</TRow>
                    </THead>
                    <TBody>{this.getTableBody()}</TBody>
                </Table>
            </div>
        );
    }

    getTableHeaders(): React.ReactChild[] {
        const tableHeaders = [
            'Name',
            'Length',
            'Type',
            'Size',
            'Date Modified',
        ];

        const th = [];
        for (let i = 0; i < tableHeaders.length; i++) {
            th.push(<TData key={i}>{tableHeaders[i]}</TData>);
        }

        return th;
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
