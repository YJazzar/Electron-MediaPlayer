import { Box } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import LoggerFactory from '../../libs/logger/LoggerFactory';

const log = LoggerFactory.getUILogger(__filename);

const ParentDiv = styled.div`
    display: flex;
    flex-flow: column;
    height: 100%;
    width: inherit;
`;

const TopComponent = styled.div`
    height: var(--height-var);
    width: 100%;
    float: top;
`;

const BottomComponent = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const ResizableHandle = styled(Box)`
    float: right;
    width: inherit;
    height: 1px;
    z-index: 1;

    &::after {
        content: '';
        height: 5px;
        width: inherit;
        position: absolute;
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
    mouseOffset: number; // This will be used to make sure he div only moves relative to the mouse
    isBeingResized: boolean;
}

export default class VerticalResizable extends React.Component<Props, State> {
    topRef: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);

        this.state = {
            mouseOffset: 0,
            isBeingResized: false,
        };

        this.topRef = React.createRef();
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    // Initialize the state
    componentDidMount() {
        log.debug(`Vertically resizable panel was mounted!`);

        // Set the default height only after the component has finished mounting
        console.log(`umm ${this.props.topChildDefaultHeight} ${document.body.clientHeight}`);
        this.setLiveHeight(this.props.topChildDefaultHeight * document.body.clientHeight);
        // this.initWidth();
    }

    onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();

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
        // console.log(`newHeight: ${newHeight} | clientY: ${event.clientY} | mouseOff: ${this.state.mouseOffset} | currHeight: ${this.getLiveHeight()}`);

        // If the dragging just finished, then store the new size
        const primaryButtonPressed = event.buttons === 1;
        if (!primaryButtonPressed) {
            this.setLiveHeight(Math.min(Math.max(newHeight, this.getMinHeight()), this.getMaxHeight()));
            this.setState({
                isBeingResized: false,
            });
            this.removeListener();
            return;
        }

        // If the dragging continues
        if (newHeight > this.getMinHeight() && newHeight < this.getMaxHeight()) {
            this.setLiveHeight(newHeight);
        }
    }

    addListener() {
        window.addEventListener('mousemove', this.onMouseMove);
    }

    removeListener() {
        window.removeEventListener('mousemove', this.onMouseMove);
    }

    render() {
        return (
            <ParentDiv>
                <TopComponent ref={this.topRef}>{this.props.topChild}</TopComponent>
                <ResizableHandle  onMouseDown={this.onMouseDown.bind(this)} border={1} borderColor="primary.main" />
                <BottomComponent>{this.props.bottomChild}</BottomComponent>
            </ParentDiv>
        );
    }

    mainWindowResized(deltaHeight: number) {
        // console.log(deltaHeight);
        const newHeight = this.getLiveHeight() + deltaHeight;
        if (newHeight > this.getMinHeight() && newHeight < this.getMaxHeight()) {
            this.setLiveHeight(newHeight);
        }
    }

    // Gets the max of the top component (in pixels)
    getMaxHeight(): number {
        return this.props.topChildMaxHeight * document.body.clientHeight;
    }

    // Gets the min of the top component (in pixels)
    getMinHeight(): number {
        return this.props.topChildMinHeight * document.body.clientHeight;
    }

    // Sets the height of the top component (in pixels)
    setLiveHeight(newHeight: number) {
        // console.log(`Setting with: ${newHeight}`);
        if (this.topRef.current) this.topRef.current.style.setProperty('--height-var', `${newHeight}px`);
    }

    // Gets the height of the top component (in pixels)
    getLiveHeight(): number {
        const temp: string | undefined = this.topRef.current?.style.getPropertyValue('--height-var');

        if (typeof temp === undefined) {
            log.error(`The variable '--height-var' was unexpectedly 'undefined' for a vertical resizable component`);
            return 400;
        } else if (temp) {
            return parseInt(temp, 10);
        }

        log.error(`Could not parse the variable '--height-var'. {--height-var=${temp}}`);
        return 401;
    }
}
