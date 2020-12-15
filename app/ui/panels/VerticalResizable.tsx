import { Box } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import LoggerFactory from '../../libs/logger/LoggerFactory';

const log = LoggerFactory.getUILogger(__filename);

// function FlexibleDiv(props: { liveHeight: number; child: React.ReactChild; className: string }) {
//     return (
//         <div className={props.className} style={{ height: `${props.liveHeight}px` }}>
//             {props.child}
//         </div>
//     );
// }

const TopComponent = styled.div`
    /* --height-var: 100px; */
    height: var(--height-var);
    width: 100%;
    float: top;
`;

const BottomComponent = styled.div`
    width: 100%;
`;

const ResizableHandle = styled(Box)`
    float: bottom;
    height: 1px;
    width: 100%;
    background-color: transparent;
    z-index: 1;

    &::after {
        content: '';
        width: 100%;
        height: 5px;
        position: absolute;
        left: 0;
        right: 0;
        margin-top: -4px;
        background-color: transparent;
        cursor: ns-resize;
        z-index: 2;
    }
`;

interface Props {
    topChild: React.ReactChild;
    bottomChild: React.ReactChild;

    // All prop lengths must be in percentages
    topChildMaxHeight: number;
    topChildMinHeight: number;
    topChildDefaultHeight: number;
}

interface State {
    mouseOffset: number;
    isBeingResized: boolean;
}

const topID = 'unique';

export default class VerticalResizable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.setLiveHeight(400);
        this.state = {
            mouseOffset: 0,
            isBeingResized: false,
        };

        this.onMouseMove = this.onMouseMove.bind(this);
    }

    // Initialize the state
    componentDidMount() {
        log.debug(`Vertically resizable panel was mounted!`);

        this.initWindowSize; // Callback after the state has been set
    }

    // This function makes it so that both div can reliably show up upon starting the application
    initWindowSize() {
        const topHeight = this.props.topChildDefaultHeight * document.body.clientHeight;

        this.setLiveHeight(topHeight);
    }

    // setNewTopHeight(newTopHeight: number, isBeingResized: boolean) {
    //     const bottomHeight = document.body.clientHeight - newTopHeight;

    //     console.log(`[Setting] height  |  top: ${newTopHeight}  | bottom: ${bottomHeight}`);
    //     this.removeListener();
    //     this.setLiveHeight(newTopHeight);
    //     this.setState({
    //         topCurrHeight: newTopHeight,
    //         isBeingResized: isBeingResized,
    //     });
    //     this.addListener();
    // }

    onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
        console.log(`Mouse offset: ${event.pageY}`);
        this.setState(
            {
                mouseOffset: this.getLiveHeight() - event.clientY,
                isBeingResized: true,
            },
            this.addListener
        );
    }

    // This listener will only be added while the divider is being dragged by the user
    onMouseMove(event: MouseEvent) {
        // Reject even if it is not actually being dragged
        if (!this.state.isBeingResized) {
            this.removeListener();
            return;
        }

        // Calculate the new top height
        const newHeight = event.clientY + this.state.mouseOffset;
        console.log(`Delta: ${newHeight} | clientY: ${event.clientY} | mouseoff: ${this.state.mouseOffset}`);
        // console.log(
        //     `newHeight: ${newHeight}  |  currHeight: ${this.state.topCurrHeight}  |  liveHeight: ${this.getLiveHeight()}`
        // );

        // If the dragging just finished, then store the new size
        const primaryButtonPressed = event.buttons === 1;
        if (!primaryButtonPressed) {
            console.log('Button unpressed');
            this.setLiveHeight(Math.min(Math.max(newHeight, this.getMinHeight()), this.getMaxHeight()));
            this.setState({
                isBeingResized: false,
            });
            this.removeListener();
            return;
        }

        // If the dragging continues
        if (newHeight > this.getMinHeight()) {
            this.setLiveHeight(newHeight);
        }
    }

    addListener() {
        window.addEventListener('mousemove', this.onMouseMove);
        console.log('Adding listener');
    }

    removeListener() {
        window.removeEventListener('mousemove', this.onMouseMove);
        console.log('Removing listener');
    }

    render() {
        console.log('render');

        // const bottomHeight = document.body.clientHeight - this.state.topLiveHeight;

        return (
            <div>
                <TopComponent id={topID} className={''}>
                    {this.props.topChild}
                </TopComponent>
                <ResizableHandle onMouseDown={this.onMouseDown.bind(this)} border={1} borderColor="primary.main" />
                <BottomComponent className={''}>{this.props.bottomChild}</BottomComponent>
            </div>
        );
    }

    // mainWindowResized(deltaHeight: number) {
    //     const newHeight = this.getPaneWidth() + deltaHeight / 5;
    //     if (newHeight > this.getMinHeight() && newHeight < this.getMaxHeight()) {
    //         this.setPaneWidth(newHeight);
    //     }
    // }

    getMaxHeight(): number {
        return this.props.topChildMaxHeight * document.body.clientHeight;
    }

    getMinHeight(): number {
        return this.props.topChildMinHeight * document.body.clientHeight;
    }

    setLiveHeight(newHeight: number) {
        // console.log(`Setting with: ${newHeight}`);
        document.getElementById(topID)?.style.setProperty('--height-var', `${newHeight}px`);
    }

    getLiveHeight(): number {
        const temp: string | undefined = document.getElementById(topID)?.style.getPropertyValue('--height-var');

        if (typeof temp === undefined) {
            return 111;
        } else if (temp) {
            return parseInt(temp, 10);
        }
        console.log('Failed: ' + temp);
        return 112;
    }
}
