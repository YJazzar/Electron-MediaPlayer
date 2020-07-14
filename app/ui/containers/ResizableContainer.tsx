import React from 'react';
import { Resizable, ResizeDirection, Size } from 're-resizable';
import '../styles/RootComponent.global.css';
import { PanelConfig, ContainerSize } from '../configs/PanelConfig';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import cloneDeep from 'lodash.clonedeep';

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

    // Initialize the state
    componentDidMount() {
        this.updateState(this.initComponentSizeToParent);
    }

    private updateState(callBack?: (...args: any[]) => void): void {
        if (this.resizeRef.current) {
            this.setState(
                {
                    width: this.resizeRef.current.size.width,
                    height: this.resizeRef.current.size.height,
                },
                callBack
            );
        } else {
            this.nullRefErrorMess();
        }
    }

    // This function will pass the initial sizes of the containers to the parent
    private initComponentSizeToParent() {
        // log.debug(`[${this.props.className}] width: ${this.state.width}`);
        // log.debug(`[${this.props.className}] height: ${this.state.height}`);

        // Store the size with the parent:
        if (this.props.initSize) {
            this.props.initSize(this.state);
        }
    }

    // This function will always be called when a div is being resized
    private onResize(
        event: MouseEvent | TouchEvent,
        direction: ResizeDirection,
        refToElement: HTMLDivElement,
        delta: Size
    ) {
        const parentCallBack = this.props.onResize;
        if (this.resizeRef.current && parentCallBack) {
            const oldSize = cloneDeep(this.state);
            const newSize = {
                width: this.resizeRef.current.size.width,
                height: this.resizeRef.current.size.height,
            };

            parentCallBack(oldSize, newSize);
        } else {
            log.error(
                `The onResize() callback was undefined in the panel ${this.props.panelName}.`
            );
            log.error(
                `Please check the props were passed in correctly when initializing ResizableContainer through RootContainer!`
            );
        }
    }

    forceResize(newSize: ContainerSize) {
        if (newSize.height && newSize.width)
            this.resizeRef.current?.updateSize({
                width: newSize.width,
                height: newSize.height,
            });

        // if (this.state.width && newSize.width)
        // console.log(this.state.width + " :: " + newSize.width);

        // this.setState({
        //     width: newSize.width,
        //     height: newSize.height,
        // });
        //     if (this.state.width)
        //     this.setState({
        //         width: this.state.width + 1,
        //         height: newSize.height,
        //     });
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

    getWidth() {
        if (this.state.width) return this.state.width;
        return this.props.defaultSize.defaultWidth;
    }

    getHeight() {
        if (this.state.height) return this.state.height;
        return this.props.defaultSize.defaultHeight;
    }

    render() {
        return (
            <Resizable
                ref={this.resizeRef}
                className={`${this.props.className} ${this.props.classStyles}`}
                enable={this.props.resizableSides}
                defaultSize={{
                    width: this.props.defaultSize.defaultWidth,
                    height: this.props.defaultSize.defaultHeight,
                }}
                onResize={this.onResize.bind(this)}
            >
                {this.props.panelType}
                {this.props.panelName}
                {this.props.element}
                {this.props.temp}
            </Resizable>
        );
    }
}
