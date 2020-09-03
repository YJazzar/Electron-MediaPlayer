import React from 'react';
import mainConfig from '../configs/MainConfigImpl';
import MainPanelTable from './MainPanelTable';



export default class MainContentsPanelContainer extends React.Component<
    {},
    {}
> {
    render() {
        return (
            <div className={mainConfig.cssClassStyles}>
                <h1>Main Contents Panel</h1>
                <MainPanelTable/>
            </div>
        );
    }
}
