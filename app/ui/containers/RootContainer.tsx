import React from 'react';

import ResizableContainer from './ResizableContainer';
import mainConfig from '../configs/impl/MainConfigImpl';
import NavConfig from '../configs/impl/NavConfigImpl';
import playerConfig from '../configs/impl/PlayerControlsConfigImpl';


export default class RootContainer extends React.Component {
    render() {
        return (
            <div className="resizableContainerWrapper">
                <ResizableContainer
                    id="nav-panel-id"
                    className="floatLeft bg-gray-400 border border-gray-600"
                    panelType="This is the navigation panel"
                    defaultWidth={panelConfigs.navPanel.defaultWidth}
                    defaultHeight={panelConfigs.navPanel.defaultHeight}
                    enable={panelConfigs.navPanel.enableSides}
                ></ResizableContainer>
                <ResizableContainer
                    id="main-panel-id"
                    className="floatRight bg-red-400 border border-gray-600"
                    panelType="This is the main panel"
                    defaultWidth={panelConfigs.mainPanel.defaultWidth}
                    defaultHeight={panelConfigs.mainPanel.defaultHeight}
                    enable={panelConfigs.mainPanel.enableSides}
                />
                <ResizableContainer
                    id="player-controls-panel-id"
                    className="floatRight bg-blue-400 border border-gray-600"
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
