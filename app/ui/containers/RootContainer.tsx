import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import mainConfig from '../configs/impl/MainConfigImpl';
import NavConfig from '../configs/impl/NavConfigImpl';
import playerConfig from '../configs/impl/PlayerControlsConfigImpl';
import { ContainerSize, PanelType } from '../configs/PanelConfig';
import ResizableContainer from './ResizableContainer';

const log = LoggerFactory.getUILogger(__filename);

interface ContainerSizes {
    navPanel?: ContainerSize;
    mainPanel?: ContainerSize;
    playerPanel?: ContainerSize;
}

export default class RootContainer extends React.Component<{}, ContainerSizes> {
    constructor(props: {}) {
        super(props);
        this.state = {
            navPanel: undefined,
            mainPanel: undefined,
            playerPanel: undefined,
        };
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
        let newMainSize = this.state.mainPanel;
        let newPlayerSize = this.state.playerPanel;

        if (
            newNavSize.width &&
            this.state.navPanel?.width &&
            newMainSize?.width &&
            newPlayerSize?.width
        ) {
            const widthChange = this.state.navPanel.width - newNavSize.width;

            newMainSize.width += widthChange;
            newPlayerSize.width += widthChange;

            this.setState({
                mainPanel: newMainSize,
                playerPanel: newPlayerSize,
            }, ()=> console.log("updating sizes now"));
        }
    }

    render() {
        log.info('Creating the rootContainer');

        return (
            <div className="resizableContainerWrapper">
                <ResizableContainer
                    {...NavConfig}
                    initSize={this.initSize.bind(this)}
                    onResize={this.onResize.bind(this)}
                />
                <ResizableContainer
                    {...mainConfig}
                    initSize={this.initSize.bind(this)}
                    onResize={this.onResize.bind(this)}
                />
                <ResizableContainer
                    {...playerConfig}
                    initSize={this.initSize.bind(this)}
                    onResize={this.onResize.bind(this)}
                />
            </div>
        );
    }
}
