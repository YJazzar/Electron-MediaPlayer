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
    navPanelRef: React.RefObject<ResizableContainer>;
    mainPanelRef: React.RefObject<ResizableContainer>;
    playerPanelRef: React.RefObject<ResizableContainer>;

    constructor(props: {}) {
        super(props);

        this.navPanelRef = React.createRef();
        this.mainPanelRef = React.createRef();
        this.playerPanelRef = React.createRef();
    }

    componentDidMount() {
        log.info(`Root container finished mounting.`);
    }

    // Continuously Called by child components every time it is resized
    onResize(panelType: PanelType, delta: any) {
        // First check if the element being resized is the Nav Panel.
        if (panelType == PanelType.navPanel) {
            this.resizeBasedOnNavPanel(delta);
        }

        if (panelType == PanelType.mainPanel) {
            this.resizeBasedOnMainPanel(delta);
        }
    }

    resizeBasedOnNavPanel(delta: any) {
        if (this.navPanelRef.current) {
            this.navPanelRef.current.liveResizeWidth(delta.width);
        }
        if (this.mainPanelRef.current) {
            this.mainPanelRef.current.liveResizeWidth(-1 * delta.width);
        }
        if (this.playerPanelRef.current) {
            this.playerPanelRef.current.liveResizeWidth(-1 * delta.width);
        }
    }

    // Only need to update main panel and player panel heights
    resizeBasedOnMainPanel(delta: any) {
        if (this.mainPanelRef.current) {
            this.mainPanelRef.current.liveResizeHeight(delta.height);
        }
        if (this.playerPanelRef.current) {
            this.playerPanelRef.current.liveResizeHeight(-1 * delta.height);
        }
    }

    broadcastResize(panelType: PanelType, isResizing: boolean) {
        this.mainPanelRef.current?.setIsResizing(isResizing);
        this.playerPanelRef.current?.setIsResizing(isResizing);
        this.navPanelRef.current?.setIsResizing(isResizing);
    }

    render() {
        return (
            <div id="root-container" className="resizableContainerWrapper">
                <ResizableContainer
                    {...NavConfig}
                    onResize={this.onResize.bind(this)}
                    broadcastResize={this.broadcastResize.bind(this)}
                    ref={this.navPanelRef}
                />
                <ResizableContainer
                    {...mainConfig}
                    onResize={this.onResize.bind(this)}
                    broadcastResize={this.broadcastResize.bind(this)}
                    ref={this.mainPanelRef}
                />
                <ResizableContainer
                    {...playerConfig}
                    onResize={this.onResize.bind(this)}
                    broadcastResize={this.broadcastResize.bind(this)}
                    ref={this.playerPanelRef}
                />
            </div>
        );
    }
}
