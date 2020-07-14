import React from 'react';
import ResizableContainer from './ResizableContainer';
import panelConfigs from '../constants/ResizableContainerConstants';
// import ReactDOM from 'react-dom';

export default class RootContainer extends React.Component {
    render() {
        return (
            <div className="resizableContainerWrapper">
                <ResizableContainer
                    id="nav-panel-id"
                    className="floatLeft"
                    panelType="This is the navigation panel"
                    defaultWidth={panelConfigs.navPanel.defaultWidth}
                    defaultHeight={panelConfigs.navPanel.defaultHeight}
                    enable={panelConfigs.navPanel.enableSides}
                ></ResizableContainer>
                <ResizableContainer
                    id="main-contents-panel-id"
                    className="floatRight"
                    panelType="This is the main panel"
                    defaultWidth={panelConfigs.mainPanel.defaultWidth}
                    defaultHeight={panelConfigs.mainPanel.defaultHeight}
                    enable={panelConfigs.mainPanel.enableSides}
                />
                <ResizableContainer
                    id="nav-panel-id"
                    className="floatRight"
                    panelType="This is the player controls panel"
                    defaultWidth={panelConfigs.playerControlsPanel.defaultWidth}
                    defaultHeight={
                        panelConfigs.playerControlsPanel.defaultHeight
                    }
                    enable={panelConfigs.playerControlsPanel.enableSides}
                />
            </div>
        );
    }
}
