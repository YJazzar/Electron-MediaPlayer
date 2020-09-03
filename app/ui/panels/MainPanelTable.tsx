import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
    width: 98%;
    justify: centered;
`;

const TBody = styled.tbody``;

const THead = styled.thead`
    text-align: center;
    border: 1px solid white;
`;

const TRow = styled.tr``;

const TData = styled.td`
    border: 1px solid white;
`;

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
            th.push(<TData>{tableHeaders[i]}</TData>);
        }

        return th;
    }

    getTableBody(): React.ReactChild {
        return <h1 />;
    }
}
