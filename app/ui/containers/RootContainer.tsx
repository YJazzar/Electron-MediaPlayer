import { ipcRenderer } from 'electron';
import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import NumericalSize from '../configs/NumericalSize';
import '../styles/app.global.css';
import '../styles/navResizables.global.css';
import VerticalResizableContainer from './VerticalResizableContainer';

const log = LoggerFactory.getUILogger(__filename);

export default class RootContainer extends React.Component<{}, NumericalSize> {
    horizontalResizableContainerRef: React.RefObject<
        VerticalResizableContainer
    >;

    constructor(props: {}) {
        super(props);

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
        this.horizontalResizableContainerRef.current?.initWindowSize(
            width,
            height
        );
    }

    mainWindowResized(
        e: Event,
        newScreenWidth: number,
        newScreenHeight: number
    ) {
        // console.log('updating root');
        const delta = newScreenWidth - this.state.width;

        // console.log('newScreenWidth = ' + newScreenWidth);
        // console.log('state width = ' + this.state.width);
        console.log('delta = ' + delta);

        this.horizontalResizableContainerRef.current?.mainWindowResized(delta);
        this.setState({
            width: newScreenWidth,
        });
    }

    render() {
        return (
            <div id="root-container">
                <VerticalResizableContainer
                    ref={this.horizontalResizableContainerRef}
                    leftDivId={'nav-panel-resizable-left'}
                    rightDivId={'main-player-panel-combined-resizable-right'}
                    handleDivId={'nav-panel-handle'}
                    minWidth={0.1}
                    maxWidth={0.9}
                    cssLeftWidthVarName={'--nav-panel-resizable-width-left'}
                    cssMinWidthVarName={'--nav-panel-min-width'}
                    cssMaxWidthVarName={'--nav-panel-max-width'}
                />

            </div>
        );
    }
}
