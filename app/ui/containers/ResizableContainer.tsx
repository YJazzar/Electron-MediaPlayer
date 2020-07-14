import React from 'react';
import { Resizable } from 're-resizable';
import '../styles/RootComponent.global.css';
import { PanelConfig, ContainerSize } from '../configs/PanelConfig';
import LoggerFactory from '../../libs/logger/LoggerFactory';

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
            width: undefined,
            height: undefined,
        };
        this.resizeRef = React.createRef();
    }

    updateState(callBack?: (...args: any[]) => void): void {
        if (this.resizeRef.current && callBack) {
            this.setState(
                {
                    width: this.resizeRef.current.size.width,
                    height: this.resizeRef.current.size.height,
                },
                callBack
            );
        } else if (this.resizeRef.current) {
            this.setState({
                width: this.resizeRef.current.size.width,
                height: this.resizeRef.current.size.height,
            });
        } else {
            this.nullRefErrorMess();
        }
    }

    // Initialize the state
    componentDidMount() {
        this.updateState(this.initComponentSizeToParent);
    }

    // This function will pass the initial sizes of the containers to the parent
    initComponentSizeToParent() {
        // log.debug(`[${this.props.className}] width: ${this.state.width}`);
        // log.debug(`[${this.props.className}] height: ${this.state.height}`);

        // Store the size with the parent:
        if (this.props.initSize) {
            this.props.initSize(this.state);
        }
    }

    // This function will always be called when a div is being resized
    onResize() {
        this.updateState();
        if (this.props.onResize) {
            this.props.onResize(this.state);
        } else {
            log.error(
                `The onResize() callback was undefined in the panel ${this.props.panelName}.`
            );
            log.error(
                `Please check the props were passed in correctly when initializing ResizableContainer through RootContainer!`
            );
        }
    }

    getContainerSize(): ContainerSize | undefined {
        // Store the size with the parent:
        if (this.state.width && this.state.height) {
            return {
                panelType: this.props.panelType,
                width: this.state.width,
                height: this.state.height,
            } as ContainerSize;
        } else {
            this.couldNotReadSizeError();
            return undefined;
        }
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

    render() {
        return (
            // <div id={this.props.id} className={this.props.className}>
            <Resizable
                ref={this.resizeRef}
                className={`${this.props.className} ${this.props.classStyles}`}
                enable={this.props.resizableSides}
                defaultSize={{
                    width: this.props.defaultSize.defaultWidth,
                    height: this.props.defaultSize.defaultHeight,
                }}
                onResize={this.onResize}
            >
                {this.props.panelType}
                {this.props.panelName}
                {this.props.element}
                {this.props.temp}
            </Resizable>
            // </div>
        );
    }
}
