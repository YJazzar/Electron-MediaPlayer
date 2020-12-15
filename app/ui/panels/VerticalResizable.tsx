import { Box } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import LoggerFactory from '../../libs/logger/LoggerFactory';

const log = LoggerFactory.getUILogger(__filename);

function FlexibleDiv(props: { liveHeight: number; child: React.ReactChild; className: string }) {
    return (
        <div className={props.className} style={{ height: `${props.liveHeight}px` }}>
            {props.child}
        </div>
    );
}

const TopComponent = styled(FlexibleDiv)`
    width: 100%;
    float: top;
`;

const BottomComponent = styled(FlexibleDiv)`
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

// live lengths will always be rendered
// curr lengths will be used to use in calculating new lengths (when being dragged)
interface State {
    topLiveHeight: number;
    topCurrHeight: number;
    isBeingResized: boolean;
}

export default class VerticalResizable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            topLiveHeight: 100,
            topCurrHeight: 100,
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

        this.setState({
            topLiveHeight: topHeight,
            topCurrHeight: topHeight,
        });
    }

    setNewTopHeight(newTopHeight: number, isBeingResized: boolean) {
        const bottomHeight = document.body.clientHeight - newTopHeight;

        console.log(`[Setting] height  |  top: ${newTopHeight}  | bottom: ${bottomHeight}`);

        this.setState({
            topLiveHeight: newTopHeight,
            topCurrHeight: newTopHeight,
            isBeingResized: isBeingResized,
        });
    }

    onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
        this.setState(
            {
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
        const newHeight = event.pageY - this.state.topLiveHeight + this.state.topCurrHeight;

        // If the dragging just finished, then store the new size
        const primaryButtonPressed = event.buttons === 1;
        if (!primaryButtonPressed) {
            console.log('Button unpressed');
            this.setNewTopHeight(Math.min(Math.max(this.state.topLiveHeight, this.getMinHeight()), this.getMaxHeight()), false);
            this.removeListener();
            return;
        }
        // console.log(``);
        // console.log(`newHeight: ${newHeight}  | live: ${this.state.top.liveHeight} (${event.pageY})  | curr: ${this.state.top.currHeight}`);

        // If the dragging continues
        if (newHeight > this.getMinHeight()) {
            this.setState({
                topLiveHeight: newHeight,
            });
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

        const bottomHeight = document.body.clientHeight - this.state.topLiveHeight;

        return (
            <div>
                <TopComponent liveHeight={this.state.topLiveHeight} child={this.props.topChild} className={''} />
                <ResizableHandle onMouseDown={this.onMouseDown.bind(this)} border={1} borderColor="primary.main" />
                <BottomComponent liveHeight={bottomHeight} child={this.props.bottomChild} className={''} />
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
}
