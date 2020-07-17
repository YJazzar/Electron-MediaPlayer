import { ipcRenderer } from 'electron';
import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import NavigationComponent from '../components/NavigationComponent';
import NumericalSize from '../configs/NumericalSize';
import '../styles/app.global.css';
import '../styles/contentResizables.global.css';
import '../styles/navResizables.global.css';
import '../styles/RootComponent.global.css';
import HorizontalResizableContainer from './HorizontalResizableContainer';
import VerticalResizableContainer from './VerticalResizableContainer';


const log = LoggerFactory.getUILogger(__filename);

export default class RootContainer extends React.Component<{}, NumericalSize> {
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
        log.info(`Root container finished mounting.`);
    }

    initialWindowSize(width: number, height: number) {
        log.debug(`now setting the width ${width} ${height}`);
        this.setState({
            width: width,
            height: height,
        });
        this.verticalResizableContainerRef.current?.initWindowSize(width);
    }

    mainWindowResized(
        e: Event,
        newScreenWidth: number,
        newScreenHeight: number
    ) {
        // console.log('updating root');
        const deltaWidth = newScreenWidth - this.state.width;
        const deltaHeight = newScreenHeight - this.state.height;

        // console.log('newScreenWidth = ' + newScreenWidth);
        // console.log('state width = ' + this.state.width);
        // console.log('delta = ' + delta);

        this.verticalResizableContainerRef.current?.mainWindowResized(deltaWidth);
        this.horizontalResizableContainerRef.current?.mainWindowResized(deltaHeight);
        this.setState({
            width: newScreenWidth,
            height: newScreenHeight,
        });
    }

    render() {
        return (
            <div id="root-container">
                <VerticalResizableContainer
                    ref={this.verticalResizableContainerRef}
                    leftDivId={'nav-panel-resizable-left'}
                    rightDivId={'main-player-panel-combined-resizable-right'}
                    handleDivId={'nav-panel-handle'}
                    minWidth={0.1}
                    maxWidth={0.9}
                    cssLeftWidthVarName={'--nav-panel-resizable-width-left'}
                    cssMinWidthVarName={'--nav-panel-min-width'}
                    cssMaxWidthVarName={'--nav-panel-max-width'}
                    leftPanelComponent={this.getNavigationPanel()}
                    // rightPanelComponent={this.getNavigationPanel()}
                    rightPanelComponent={this.getHorizontalResizableContainer()}
                />
            </div>
        );
    }

    getNavigationPanel(): React.ReactChild {
        return <NavigationComponent />;
    }

    getHorizontalResizableContainer(): React.ReactChild {
        return (
            <HorizontalResizableContainer
                ref={this.horizontalResizableContainerRef}
                topDivId={'content-panel-resizable-top'}
                bottomDivId={'player-panel-resizable-bottom'}
                handleDivId={'content-panel-handle'}
                minHeight={0}
                maxHeight={1}
                cssTopHeightVarName={'--content-panel-resizable-height-top'}
                cssBottomHeightVarName={'--player-panel-resizable-height-bottom'}
                cssMinHeightVarName={'--content-panel-min-height'}
                cssMaxHeightVarName={'--content-panel-max-height'}
                // TODO: add component props
            />
        );
    }
}
