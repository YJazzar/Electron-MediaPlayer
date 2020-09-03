import { ipcRenderer } from 'electron';
import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import mainConfig from '../configs/MainConfigImpl';
import navConfig from '../configs/NavConfigImpl';
import '../styles/app.global.css';
import '../styles/contentResizables.global.css';
import '../styles/navResizables.global.css';
import '../styles/theme.global.css';
import HorizontalResizableContainer from './HorizontalResizableContainer';
import MainContentsPanelContainer from '../panels/MainContentsPanelContainer';
import NavigationPanelContainer from '../panels/NavigationPanelContainer';
import PlayerPanelContainer from '../panels/PlayerPanelContainer';
import VerticalResizableContainer from './VerticalResizableContainer';


const log = LoggerFactory.getUILogger(__filename);

const theme = ipcRenderer.sendSync('config:getTheme').toLowerCase();

interface Props {}

interface State {
    width: number;
    height: number;
}

export default class RootContainer extends React.Component<Props, State> {
    verticalResizableContainerRef: React.RefObject<VerticalResizableContainer>;
    horizontalResizableContainerRef: React.RefObject<
        HorizontalResizableContainer
    >;

    constructor(props: {}) {
        super(props);

        this.verticalResizableContainerRef = React.createRef();
        this.horizontalResizableContainerRef = React.createRef();
        this.state = {
            width: 0,
            height: 0,
        };

        ipcRenderer.on('resize-window', this.mainWindowResized.bind(this));
    }

    componentDidMount() {
        log.debug(`Root container finished mounting.`);
    }

    initialWindowSize(width: number, height: number) {
        log.debug(`now setting the width ${width} ${height}`);
        this.setState({
            width: width,
            height: height,
        });
        this.verticalResizableContainerRef.current?.initWindowSize();
        this.horizontalResizableContainerRef.current?.initWindowSize();
    }

    mainWindowResized(
        e: Event,
        newScreenWidth: number,
        newScreenHeight: number
    ) {
        const deltaWidth = newScreenWidth - this.state.width;
        const deltaHeight = newScreenHeight - this.state.height;

        this.verticalResizableContainerRef.current?.mainWindowResized(
            deltaWidth
        );
        this.horizontalResizableContainerRef.current?.mainWindowResized(
            deltaHeight
        );
        this.setState({
            width: newScreenWidth,
            height: newScreenHeight,
        });
    }

    render() {
        return (
            <div id="root-container" className={theme}>
                <VerticalResizableContainer
                    ref={this.verticalResizableContainerRef}
                    leftDivId={'nav-panel-resizable-left'}
                    rightDivId={'main-player-panel-combined-resizable-right'}
                    handleDivId={'nav-panel-handle'}
                    cssLeftWidthVarName={'--nav-panel-resizable-width-left'}
                    cssMinWidthVarName={'--nav-panel-min-width'}
                    cssMaxWidthVarName={'--nav-panel-max-width'}
                    leftPanelComponent={this.getNavigationPanel()}
                    rightPanelComponent={this.getHorizontalResizableContainer()}
                    leftPanelConfig={navConfig}
                />
            </div>
        );
    }

    getHorizontalResizableContainer(): React.ReactChild {
        return (
            <HorizontalResizableContainer
                ref={this.horizontalResizableContainerRef}
                topDivId={'content-panel-resizable-top'}
                bottomDivId={'player-panel-resizable-bottom'}
                handleDivId={'content-panel-handle'}
                cssTopHeightVarName={'--content-panel-resizable-height-top'}
                cssBottomHeightVarName={
                    '--player-panel-resizable-height-bottom'
                }
                cssMinHeightVarName={'--content-panel-min-height'}
                cssMaxHeightVarName={'--content-panel-max-height'}
                topPanelComponent={this.getMainContentsPanel()}
                bottomPanelComponent={this.getPlayerPanel()}
                topPanelConfig={mainConfig}
            />
        );
    }

    // Helper functions to get the contents of each panel
    getNavigationPanel(): React.ReactChild {
        return <NavigationPanelContainer />;
    }

    getMainContentsPanel(): React.ReactChild {
        return <MainContentsPanelContainer />;
    }

    getPlayerPanel(): React.ReactChild {
        return <PlayerPanelContainer />;
    }
}
