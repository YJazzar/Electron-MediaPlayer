import React from 'react';
import { Resizable } from 're-resizable';
import '../styles/RootComponent.global.css';
import { PanelConfig, ContainerSize } from '../configs/PanelConfig';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import { underline } from 'chalk';

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
            width: undefined,
            height: undefined,
        };
        this.resizeRef = React.createRef();
    }

    // Initialize the state
    componentDidMount() {
        if (this.resizeRef.current) {
            this.setState(
                {
                    width: this.resizeRef.current.size.width,
                    height: this.resizeRef.current.size.height,
                },
                () => this.initComponentSizeToParent()
            );
        } else {
            this.nullRefErrorMess();
        }
    }

    nullRefErrorMess() {
        log.error(`resizeRef for the panel {${this.props.panelName}} was null`);
    }

    // This function will pass the initial sizes of the containers to the parent
    initComponentSizeToParent() {
        // log.debug(`[${this.props.className}] width: ${this.state.width}`);
        // log.debug(`[${this.props.className}] height: ${this.state.height}`);

        // Store the size with the parent:
        if (this.props.initSize && this.state.width && this.state.height) {
            const containerSize = {
                panelType: this.props.panelType,
                width: this.state.width,
                height: this.state.height,
            } as ContainerSize;
            this.props.initSize(containerSize);
        } else {
            this.couldNotReadSizeError();
        }
    }

    couldNotReadSizeError() {
        log.error(
            `An error occurred when trying to send the size of ${this.props.panelName} to the parent`
        );
        log.error(
            'Please confirm the log files printed that a size was stored'
        );
    }

    onResize() {
        if (this.resizeRef.current) {
            let size = this.resizeRef.current.size;
        } else {
            log.error(
                'The size object for the resizableRef in a panel was null'
            );
        }
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
