import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import NavConfig from '../configs/impl/NavConfigImpl';
import NumericalSize from '../configs/NumericalSize';
import '../styles/app.global.css';
import ResizableContainer from './ResizableContainer';
import HorizontalResizableContainer from './HorizontalResizableContainer';
import { ipcRenderer } from 'electron';

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

    // mainWindowSize: NumericalSize;

    horizontalResizableContainerRef: React.RefObject<HorizontalResizableContainer>;

    constructor(props: {}) {
        super(props);

        this.navPanelRef = React.createRef();
        this.mainPanelRef = React.createRef();
        this.playerPanelRef = React.createRef();
        this.horizontalResizableContainerRef = React.createRef();
        // this.mainWindowSize = {
        //     width: 0,
        //     height: 0,
        // };

        this.state ={
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
        this.horizontalResizableContainerRef.current?.initWindowSize(width, height);
    }


    mainWindowResized(e: Event, newScreenWidth: number, newScreenHeight: number) {
        // console.log('updating root');
        const delta = newScreenWidth-this.state.width;

        // console.log('newScreenWidth = ' + newScreenWidth);
        // console.log('state width = ' + this.state.width);
        console.log('delta = ' + delta);

        this.horizontalResizableContainerRef.current?.mainWindowResized(delta);
        this.setState({
            width: newScreenWidth
        });
    }

    render() {

        return (
            // <div id="root-container">
                <HorizontalResizableContainer
                    ref={this.horizontalResizableContainerRef}
                    leftDivId={'resizable-left'}
                    rightDivId={'resizable-right'}
                    handleDivId={'horz-handle'}
                    minWidth={0.1}
                    maxWidth={0.9}
                    cssLeftWidthVarName={'--resizable-width-left'}
                    cssRightWidthVarName={'--resizable-width-right'}
                    cssMinWidthVarName={'--min-width'}
                    cssMaxWidthVarName={'--max-width'}
                    // {...NavConfig}
                    // onResize={this.onResize.bind(this)}
                    // broadcastResize={this.broadcastResize.bind(this)}
                    // ref={this.navPanelRef}
                />
                    /* <ResizableContainer
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
                    /> */
            // </div>
        );
    }
}

/**
 *  divId: string;
    handleDivId: string;
    // Used for controller resizing behavior:
    // Note: these will be percentages (ex: 0.5 for 50%)
    minWidth: number;
    maxWidth: number;

    cssWidthVarName: string;    // = --resizable-width
    cssMinWidthVarName: string;    // = --min-width
    cssMaxWidthVarName: string;    // = --max-width
 */
