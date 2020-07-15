import { Resizable, ResizeDirection } from 're-resizable';
import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import { ContainerSize, PanelConfig } from '../configs/PanelConfig';
import '../styles/RootComponent.global.css';

const log = LoggerFactory.getUILogger(__filename);

/**
 * Vars not used that are defined in PanelConfig:
 *      - id
 */
export default class ResizableContainer extends React.Component<
    PanelConfig,
    ContainerSize
> {
    resizeRef: React.RefObject<Resizable>;

    constructor(panelConfig: PanelConfig) {
        super(panelConfig);
        this.state = {
            panelType: this.props.panelType,
            liveWidth: undefined,
            liveHeight: undefined,
            currWidth: undefined,
            currHeight: undefined,
            isBeingResized: false,
        };
        this.resizeRef = React.createRef();
    }

    // Initialize the state
    componentDidMount() {
        this.updateState(() =>
            log.info(`The panel [${this.props.panelName}] finished mounting.`)
        );
    }

    // This will only be evoked after the resizing event has completed
    private updateState(callBack?: (...args: any[]) => void): void {
        if (this.resizeRef.current) {
            this.setState(
                {
                    liveWidth: this.resizeRef.current.size.width,
                    liveHeight: this.resizeRef.current.size.height,
                    currWidth: this.resizeRef.current.size.width,
                    currHeight: this.resizeRef.current.size.height,
                },
                callBack
            );
        } else {
            this.nullRefErrorMess();
        }
    }

    // This function will always be called when a div is being resized
    private onResize(
        event: MouseEvent | TouchEvent,
        direction: ResizeDirection,
        refToElement: HTMLElement,
        delta: any
    ) {
        // Call the Parent function so that it can
        if (this.state.panelType !== undefined && this.props.onResize) {
            this.props.onResize(this.state.panelType, delta);
        } else {
            log.error(
                `The onResize() callback was undefined in the panel ${this.props.panelName}.`
            );
            log.error(
                `Please check the props were passed in correctly when initializing ResizableContainer through RootContainer!`
            );
        }
    }

    liveResizeWidth(delta: number) {
        // console.log('delta = ' + delta);
        if (this.state.liveWidth) {
            this.setState({
                liveWidth: this.state.currWidth + delta,
            });
        }
    }
    liveResizeHeight(delta: number) {
        // Check the minHeight is not being violated:



        if (this.state.liveHeight) {
            this.setState({
                liveHeight: this.state.currHeight + delta,
            });
        }
    }

    // Called by the parent when a neighboring panel starts/stops resizing
    setIsResizing(isResizing: boolean) {
        // If it is about to start resizing, then set the flag to true
        if (isResizing) {
            this.setState({
                isBeingResized: isResizing,
            });
        }

        // If it just stopped resizing, then update state based on live
        if (!isResizing) {
            this.setState({
                currWidth: this.state.liveWidth,
                currHeight: this.state.liveHeight,
            });
        }
    }

    // Methods to start/stop the resizing events on sibling components
    onResizeStart() {
        if (this.props.broadcastResize)
            this.props.broadcastResize(this.props.panelType, true);
    }
    onResizeStop() {
        if (this.props.broadcastResize)
            this.props.broadcastResize(this.props.panelType, false);
    }

    render() {
        // console.log('rendering: ' + this.props.panelName);
        return (
            <Resizable
                ref={this.resizeRef}
                className={`${this.props.className} ${this.props.classStyles}`}
                enable={this.props.resizableSides}
                defaultSize={{
                    width: this.props.defaultSize.defaultWidth,
                    height: this.props.defaultSize.defaultHeight,
                }}
                size={{
                    width: this.getWidth(),
                    height: this.getHeight(),
                }}
                minWidth={this.props.minWidth}
                minHeight={this.props.minHeight}
                maxWidth={this.props.maxWidth}
                maxHeight={this.props.maxHeight}

                onResize={this.onResize.bind(this)}
                onResizeStart={this.onResizeStart.bind(this)}
                onResizeStop={this.onResizeStop.bind(this)}
            >
                {this.props.panelType}
                {this.props.panelName}
                {this.props.element}
                {this.props.temp}
            </Resizable>
        );
    }

    getWidth() {
        if (this.state.liveWidth) {
            return this.state.liveWidth;
        }
        return this.props.defaultSize.defaultWidth;
    }

    getHeight() {
        if (this.state.liveHeight) {
            return this.state.liveHeight;
        }
        return this.props.defaultSize.defaultHeight;
    }

    // helper method used in componentDidMount() to print error
    nullRefErrorMess() {
        log.error(`resizeRef for the panel {${this.props.panelName}} was null`);
    }

    // helper method used in initComponentSizeToParent() to print error
    couldNotReadSizeError() {
        log.error(
            `An error occurred when trying to send the size of ${this.props.panelName} to the parent`
        );
        log.error(
            'Please confirm the log files printed that a size was stored'
        );
    }
}
