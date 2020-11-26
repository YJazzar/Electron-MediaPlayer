import React from 'react';
import mainConfig from '../configs/MainConfigImpl';
import Table from '../components/Table';



export default class MainContentsPanelContainer extends React.Component<
    {},
    {}
> {
    render() {
        return (
            <div className={mainConfig.cssClassStyles}>
                <h1>Main Contents Panel</h1>
                <Table/>
            </div>
        );
    }
}
