import React from 'react';
import mainConfig from '../../configs/MainConfigImpl';
import styled from 'styled-components';

// const Table = styled.table`
// `;

// const TBody = styled.tbody`
// `;

// const THead = styled.thead`
// `;

// const TRow = styled.tr`
// `;

// const TData = styled.td`
// `;

export default class MainContentsPanelContainer extends React.Component<
    {},
    {}
> {
    render() {
        return (
            <div className={mainConfig.cssClassStyles}>
                <h1>Main Contents Panel</h1>
                {this.getTable()}
            </div>
        );
    }

    getTable(): React.ReactChild {
        const tableHeaders = [
            'Name',
            'Length',
            'Type',
            'Size',
            'Date Modified',
        ];

        const th = [];
        for (let i = 0; i < tableHeaders.length; i++) {
            th.push(<td>{tableHeaders[i]}</td>);
        }

        return (
            <table className={".w-9/12"}>
                <thead>
                    <tr>{th}</tr>
                </thead>
            </table>
        );
    }
}
