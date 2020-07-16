import { Resizable } from 're-resizable';
import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import ContainerSize from '../configs/ContainerSize';
import PanelConfig from '../configs/PanelConfig';
import '../styles/resizables.global.css';
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
    minPaneSize = 150;
    maxPaneSize = document.body.clientWidth * 0.5;
    host: HTMLElement | null;
    startingPaneWidth: number;
    xOffset: number;
    isBeingDragged: boolean;

    constructor(panelConfig: PanelConfig) {
        super(panelConfig);
        this.state = {
            panelType: this.props.panelType,
            // live lengths will always be rendered
            liveWidth: 0,
            liveHeight: 0,
            // curr lengths will be used to use in calculating new lengths (when being dragged)
            currWidth: 0,
            currHeight: 0,

            isBeingResized: false,
        };

        // this.resizeRef = React.createRef();

        // Temp vars
        this.host = this.getResizableElement();
        this.startingPaneWidth = this.getPaneWidth();
        this.xOffset = 0;
        this.isBeingDragged = false;
    }

    // Initialize the state
    componentDidMount() {
        log.info(`The panel [${this.props.panelName}] finished mounting!`);
        this.getResizableElement()?.style.setProperty(
            '--max-width',
            `${this.maxPaneSize}px`
        );
        this.getResizableElement()?.style.setProperty(
            '--min-width',
            `${this.minPaneSize}px`
        );

        // Temp vars
        this.host = this.getResizableElement();
        this.startingPaneWidth = this.getPaneWidth();
    }

    setPaneWidth(e: MouseEvent, width: number) {
        console.log('new width=' + width);
        this.getResizableElement()?.style.setProperty(
            '--resizable-width',
            `${width}px`
        );
    }

    getResizableElement() {
        return document.getElementById('resizable');
    }

    getHandleElement() {
        return document.getElementById('handle');
    }

    getPaneWidth() {
        const element = this.getResizableElement();

        if (element) {
            const pxWidth = getComputedStyle(element).getPropertyValue(
                '--resizable-width'
            );
            return parseInt(pxWidth, 10);
        }

        return this.minPaneSize;
    }

    // startDragging(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    //     event.preventDefault();

    //     console.log('Dragging event detected FIRST');
    //     this.xOffset = event.pageX;
    //     this.isBeingDragged = true;

    //     this.getHandleElement()?.addEventListener(
    //         'mousedown',
    //         this.mouseDragHandler
    //     );
    // }

    // mouseDragHandler(moveEvent: MouseEvent) {
    //     moveEvent.preventDefault();

    //     console.log('Dragging event detected SECOND');
    //     // Reject the even if it is not actually being dragged

    //     // If the dragging just finished, then store the new size
    //     const primaryButtonPressed = moveEvent.buttons === 1;
    //     if (!primaryButtonPressed) {
    //         this.setPaneWidth(
    //             Math.min(
    //                 Math.max(this.getPaneWidth(), this.minPaneSize),
    //                 this.maxPaneSize
    //             )
    //         );
    //         return;
    //     }

    //     const paneOriginAdjustment = -1; //'left' === 'right' ? 1 : -1;
    //     this.setPaneWidth(
    //         (this.xOffset - moveEvent.pageX) * paneOriginAdjustment +
    //             this.startingPaneWidth
    //     );
    // }

    onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
        console.log('On mouse down');
        this.startingPaneWidth = this.getPaneWidth();
        this.isBeingDragged = true;
        this.xOffset = event.pageX;
        // window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onMouseMove(event: MouseEvent) {
        console.log('On mouse move');

        // Reject the even if it is not actually being dragged
        if (!this.isBeingDragged) {
            console.log('rejecting action');
            return;
        }

        // If the dragging just finished, then store the new size
        const primaryButtonPressed = event.buttons === 1;
        if (!primaryButtonPressed) {
            console.log('the user is not clicking anymore::');
            this.setPaneWidth(
                event,
                Math.min(
                    Math.max(this.getPaneWidth(), this.minPaneSize),
                    this.maxPaneSize
                )
            );
            this.isBeingDragged = false;
            window.removeEventListener('mousemove', this.onMouseMove.bind(this));
            return;
        }

        const paneOriginAdjustment = -1; //'left' === 'right' ? 1 : -1;
        const newWidth =
            (this.xOffset - event.pageX) * paneOriginAdjustment +
            this.startingPaneWidth;

        this.setPaneWidth(
            event,
            (this.xOffset - event.pageX) * paneOriginAdjustment +
                this.startingPaneWidth
        );
        if (newWidth <= 1) {
            this.isBeingDragged = false;
        }
    }

    render() {
        return (
            <div id="resizable">
                <div
                    id="handle"
                    draggable="true"
                    onMouseDown={this.onMouseDown.bind(this)}
                    // onMouseMove={this.onMouseMove.bind(this)}
                ></div>
            </div>

            // <div
            //     className={`${this.props.className} ${this.props.classStyles}`}
            // >
            //     <Resizable
            //         ref={this.resizeRef}
            //         enable={this.props.resizableSides}
            //         defaultSize={{
            //             width: this.props.defaultSize.defaultWidth,
            //             height: this.props.defaultSize.defaultHeight,
            //         }}
            //         size={{
            //             width: this.getWidth(),
            //             height: this.getHeight(),
            //         }}
            //         minWidth={this.props.minWidth}
            //         minHeight={this.props.minHeight}
            //         maxWidth={this.props.maxWidth}
            //         maxHeight={this.props.maxHeight}
            //         onResize={this.onResize.bind(this)}
            //         onResizeStart={this.onResizeStart.bind(this)}
            //         onResizeStop={this.onResizeStop.bind(this)}
            //     >
            //         {this.props.panelType}
            //         {this.props.panelName}
            //         {this.props.element}
            //         {this.props.temp}
            //     </Resizable>
            // </div>
        );
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
