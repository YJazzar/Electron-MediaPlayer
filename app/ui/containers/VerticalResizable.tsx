import { Box } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import LoggerFactory from '../../libs/logger/LoggerFactory';

const log = LoggerFactory.getUILogger(__filename);

const ParentDiv = styled.div`
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 100%;
`;

const TopComponent = styled.div`
    height: var(--height-var);
    width: 100%;
    float: top;
`;

const BottomComponent = styled.div`
    width: 100%;
    height: 100%;
    flex-grow: 1;
`;

const ResizableHandle = styled(Box)`
    float: right;
    height: 99%;
    width: 1px;
    z-index: 1;

    &::after {
        content: '';
        width: 5px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin-left: -4px;
        background-color: transparent;
        cursor: ew-resize;
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
    }

    onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();

        // console.log(`Mouse offset: ${event.pageY} | currHeight: ${this.getLiveHeight()}`);
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
            console.log('Button unpressed at: ' + newHeight);
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
        console.log('Adding listener');
    }

    removeListener() {
        window.removeEventListener('mousemove', this.onMouseMove);
        console.log('Removing listener');
    }

    render() {
        return (
            <ParentDiv>
                <TopComponent ref={this.topRef}>{this.props.topChild}</TopComponent>
                <ResizableHandle onMouseDown={this.onMouseDown.bind(this)} border={1} borderColor="primary.main" />
                <BottomComponent>{this.props.bottomChild}</BottomComponent>
            </ParentDiv>
        );
    }

    mainWindowResized(deltaHeight: number) {
        const newHeight = this.getLiveHeight() + deltaHeight / 5;
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
        // document.getElementById(topID)?.style.setProperty('--height-var', `${newHeight}px`); //works
        if (this.topRef.current) this.topRef.current.style.setProperty('--height-var', `${newHeight}px`);
    }

    // Gets the height of the top component (in pixels)
    getLiveHeight(): number {
        const temp: string | undefined = this.topRef.current?.style.getPropertyValue('--height-var');

        if (typeof temp === undefined) {
            return 111;
        } else if (temp) {
            return parseInt(temp, 10);
        }
        console.log('Failed: ' + temp);
        return 112;
    }
}
