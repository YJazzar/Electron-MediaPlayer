import { Box } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import LoggerFactory from '../../libs/logger/LoggerFactory';

const log = LoggerFactory.getUILogger(__filename);

const ParentDiv = styled.div`
    display: flex;
    flex-flow: row;
    height: 100%;
    width: inherit;
`;

const LeftComponent = styled.div`
    width: var(--width-var);
    height: 100%;
    float: top;
`;

const RightComponent = styled.div`
    height: 100%;
    width: inherit;
    flex-grow: 1;
`;

const ResizableHandle = styled(Box)`
    float: bottom;
    height: 100%;
    width: 1px;
    background-color: transparent;
    z-index: 1;

    &::after {
        content: '';
        width: 5px;
        height: 100%;
        position: absolute;
        margin-top: -4px;
        background-color: transparent;
        cursor: ew-resize;
        z-index: 2;
    }
`;

interface Props {
    rightChild: React.ReactChild;
    leftChild: React.ReactChild;

    // All prop lengths must be in percentages
    leftChildMaxWidth: number;
    leftChildMinWidth: number;
    leftChildDefaultWidth: number;
}

interface State {
    mouseOffset: number; // This will be used to make sure he div only moves relative to the mouse
    isBeingResized: boolean;
}

export default class HorizontalResizable extends React.Component<Props, State> {
    rightRef: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);

        this.state = {
            mouseOffset: 0,
            isBeingResized: false,
        };

        this.rightRef = React.createRef();
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    // Initialize the state
    componentDidMount() {
        log.debug(`Horizontally resizable panel was mounted!`);

        // Set the default width only after the component has finished mounting
        this.setWidth(this.props.leftChildDefaultWidth * document.body.clientWidth);
    }

    onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();

        // console.log(`Mouse offset: ${event.pageY} | currWidth: ${this.getLiveWidth()}`);
        this.setState(
            {
                mouseOffset: this.getWidth() - event.clientX,
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

        // Calculate the new right width
        const newWidth = event.clientX + this.state.mouseOffset;
        // console.log(
        //     `newWidth: ${newWidth} | clientY: ${event.clientX} | mouseOff: ${
        //         this.state.mouseOffset
        //     } | currWidth: ${this.getWidth()}`
        // );

        // If the dragging just finished, then store the new size
        const primaryButtonPressed = event.buttons === 1;
        if (!primaryButtonPressed) {
            this.setWidth(Math.min(Math.max(newWidth, this.getMinWidth()), this.getMaxWidth()));
            this.setState({
                isBeingResized: false,
            });
            this.removeListener();
            return;
        }

        // If the dragging continues
        if (newWidth > this.getMinWidth() && newWidth < this.getMaxWidth()) {
            this.setWidth(newWidth);
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
                <LeftComponent ref={this.rightRef}>{this.props.leftChild}</LeftComponent>
                <ResizableHandle onMouseDown={this.onMouseDown.bind(this)} border={1} borderColor="primary.main" />
                <RightComponent>{this.props.rightChild}</RightComponent>
            </ParentDiv>
        );
    }

    mainWindowResized(deltaWidth: number) {
        const newWidth = this.getWidth() + deltaWidth / 5;
        if (newWidth > this.getMinWidth() && newWidth < this.getMaxWidth()) {
            this.setWidth(newWidth);
        }
    }

    // Gets the max of the top component (in pixels)
    getMaxWidth(): number {
        // return 1400;
        return this.props.leftChildMaxWidth * document.body.clientWidth;
    }

    // Gets the min of the top component (in pixels)
    getMinWidth(): number {
        // return 10;
        return this.props.leftChildMinWidth * document.body.clientWidth;
    }

    // Sets the width of the top component (in pixels)
    setWidth(newWidth: number) {
        // console.log(`Setting width: ${newWidth}`);
        if (this.rightRef.current) {
            this.rightRef.current.style.setProperty('--width-var', `${newWidth}px`);
        }
    }

    // Gets the width of the top component (in pixels)
    getWidth(): number {
        const temp: string | undefined = this.rightRef.current?.style.getPropertyValue('--width-var');

        if (typeof temp === undefined) {
            log.error(`The variable '--width-var' was unexpectedly 'undefined' for a horizontal resizable component`);
            return 402;
        } else if (temp) {
            return parseInt(temp, 10);
        }

        log.error(`Could not parse the variable '--width-var'. {--width-var=${temp}}`);
        return 112;
    }
}
