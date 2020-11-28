import React from 'react';
import navConfig from '../configs/NavConfigImpl';

export default class NavigationPanelContainer extends React.Component<{}, {}> {
    render() {
        return (
            <div className={navConfig.className + ' ' + navConfig.cssClassStyles}>
                <h1>Navigation Panel</h1>
            </div>
        );
    }
}
