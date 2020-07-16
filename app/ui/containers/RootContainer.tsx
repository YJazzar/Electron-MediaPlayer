import { Rectangle } from 'electron';
import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import mainConfig from '../configs/impl/MainConfigImpl';
import NavConfig from '../configs/impl/NavConfigImpl';
import playerConfig from '../configs/impl/PlayerControlsConfigImpl';
import NumericalSize from '../configs/NumericalSize';
import PanelType from '../configs/PanelType';
import '../styles/app.global.css';
import ResizableContainer from './ResizableContainer';

const log = LoggerFactory.getUILogger(__filename);

// interface ContainerSizes {
//     mainWindow?: ContainerSize; // The main window of the application. Used to keep track of resizing panels when the window itself is resized
//     navPanel?: ContainerSize;
//     mainPanel?: ContainerSize;
//     playerPanel?: ContainerSize;
// }

// NOTE: The state of type 'Size' is the size of the main window spawned for the application
export default class RootContainer extends React.Component<{}, NumericalSize> {
    navPanelRef: React.RefObject<ResizableContainer>;

    mainPanelRef: React.RefObject<ResizableContainer>;

    playerPanelRef: React.RefObject<ResizableContainer>;

    mainWindowSize: NumericalSize;

    constructor(props: {}) {
        super(props);

        this.navPanelRef = React.createRef();
        this.mainPanelRef = React.createRef();
        this.playerPanelRef = React.createRef();
        this.mainWindowSize = {
            width: 0,
            height: 0,
        }
    }

    componentDidMount() {
        log.info(`Root container finished mounting.`);
    }

    initialWindowSize(width: number, height: number) {
        log.debug(`now setting the width ${width} ${height}`);
        this.mainWindowSize = {
            width: width,
            height: height,
        }
    }

    windowResized(newWindowSize: Rectangle) {
        // Calculate the change in pixels and change the recorded state:
        const deltaWidth =
            newWindowSize.width - this.mainWindowSize.width;
        const deltaHeight =
            newWindowSize.height - this.mainWindowSize.height;
        this.mainWindowSize = {
                width: newWindowSize.width,
                height: newWindowSize.height,
        };

        // Send signals for the panels to increase their width and height accordingly:
        // Nav panel resizing: whenever the width changes (height changes automatically with this panel due to css styling)
        this.navPanelRef.current?.currResizeWidth(deltaWidth);

        // Main panel resizing: whenever the height changes
        this.mainPanelRef.current?.currResizeHeight(deltaHeight);
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
            this.navPanelRef.current?.liveResizeWidth(delta.width);
            this.mainPanelRef.current?.liveResizeWidth(-1 * delta.width);
            this.playerPanelRef.current?.liveResizeWidth(-1 * delta.width);
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
