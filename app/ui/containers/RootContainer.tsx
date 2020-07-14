import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import mainConfig from '../configs/impl/MainConfigImpl';
import NavConfig from '../configs/impl/NavConfigImpl';
import playerConfig from '../configs/impl/PlayerControlsConfigImpl';
import { ContainerSize, PanelType } from '../configs/PanelConfig';
import ResizableContainer from './ResizableContainer';
import cloneDeep from 'lodash.clonedeep';

const log = LoggerFactory.getUILogger(__filename);

interface ContainerSizes {
    navPanel?: ContainerSize;
    mainPanel?: ContainerSize;
    playerPanel?: ContainerSize;
}

export default class RootContainer extends React.Component<{}, ContainerSizes> {
    navPanelRef: React.RefObject<ResizableContainer>;
    mainPanelRef: React.RefObject<ResizableContainer>;
    playerPanelRef: React.RefObject<ResizableContainer>;

    constructor(props: {}) {
        super(props);
        this.state = {
            navPanel: undefined,
            mainPanel: undefined,
            playerPanel: undefined,
        };

        this.navPanelRef = React.createRef();
        this.mainPanelRef = React.createRef();
        this.playerPanelRef = React.createRef();
    }

    componentDidMount() {
        // setInterval(() => {
        //     log.info("Intervale is running");
        //     if (!mainConfig.temp)
        //         mainConfig.temp = 0;
        //     mainConfig.temp += 1;
        // }, 1000);
    }

    // Called by child components every time it mounts
    initSize(initSize: ContainerSize) {
        log.info(
            `Pushing to RootContainer's state: [${initSize.panelType}] width:[${initSize.width}] height:[${initSize.height}]`
        );

        this.setState(() => {
            if (initSize.panelType === PanelType.navPanel) {
                return { navPanel: initSize };
            }
            if (initSize.panelType === PanelType.mainPanel) {
                return { mainPanel: initSize };
            }
            if (initSize.panelType === PanelType.playerControlsPanel) {
                return { playerPanel: initSize };
            }
            return {};
        });
    }

    // Called by child components every time it is resized
    onResize(newSize: ContainerSize) {
        // console.log(`[${newSize.panelType}] [${newSize.width}] [${newSize.height}]`);

        // First check if the element being resized is the Nav Panel.
        if (newSize.panelType == PanelType.navPanel) this.resizeNav(newSize);
    }

    resizeNav(newNavSize: ContainerSize) {
        let newMainSize = cloneDeep(this.state.mainPanel);
        let newPlayerSize = cloneDeep(this.state.playerPanel);

        if (
            // Check that all values that will be used are not undefined
            newNavSize.width &&
            this.state.navPanel?.width &&
            newMainSize?.width &&
            newPlayerSize?.width
        ) {
            const widthChange = newNavSize.width - this.state.navPanel.width;

            newMainSize.width -= widthChange;
            newPlayerSize.width -= widthChange;

            this.setState(() => {
                return {
                    mainPanel: newMainSize,
                    playerPanel: newPlayerSize,
                };
            }, this.updateChildrenStates);
        }
    }

    updateChildrenStates() {
        if (this.mainPanelRef.current && this.state.mainPanel)
            this.mainPanelRef.current.forceResize(this.state.mainPanel);

        if (this.playerPanelRef.current && this.state.playerPanel)
            this.playerPanelRef.current.forceResize(this.state.playerPanel);
    }

    render() {
        return (
            <div id="root-container" className="resizableContainerWrapper">
                <ResizableContainer
                    {...NavConfig}
                    initSize={this.initSize.bind(this)}
                    onResize={this.onResize.bind(this)}
                    ref={this.navPanelRef}
                />
                <ResizableContainer
                    {...mainConfig}
                    initSize={this.initSize.bind(this)}
                    onResize={this.onResize.bind(this)}
                    ref={this.mainPanelRef}
                />
                <ResizableContainer
                    {...playerConfig}
                    initSize={this.initSize.bind(this)}
                    onResize={this.onResize.bind(this)}
                    ref={this.playerPanelRef}
                />
            </div>
        );
    }
}
