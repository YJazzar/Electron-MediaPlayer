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
    divRef: HTMLElement | null;

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

        this.divRef = null;

        // Temp vars
        // this.host = this.getResizableElement();
        // this.startingPaneWidth = this.getPaneWidth();
        // this.xOffset = 0;
        // this.isBeingDragged = false;
    }

    // Initialize the state
    componentDidMount() {
        log.info(`The panel [${this.props.panelName}] finished mounting!`);
        this.getResizableElement()?.style.setProperty(
            '--max-width',
            `${this.props.maxWidth}px`
        );
        this.getResizableElement()?.style.setProperty(
            '--min-width',
            `${this.props.maxHeight}px`
        );

        this.divRef = this.getResizableElement();
        this.setState({
            liveWidth: this.getPaneWidth(),
            currWidth: this.getPaneWidth(),
        });
    }

    onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
        console.log('On mouse down');
        this.setState(
            {
                currWidth: this.getPaneWidth(),
                liveWidth: this.getPaneWidth(),
                isBeingResized: true,
            },
            this.addListener
        );
    }

    onMouseMove(event: MouseEvent) {
        console.log('On mouse move');

        // Reject the even if it is not actually being dragged
        if (!this.state.isBeingResized) {
            console.log('rejecting action');
            this.removeListener();
            return;
        }

        // If the dragging just finished, then store the new size
        const primaryButtonPressed = event.buttons === 1;
        if (!primaryButtonPressed) {
            console.log('the user is not clicking anymore::');
            this.setPaneWidth(
                Math.min(
                    Math.max(this.getPaneWidth(), this.props.minWidth),
                    this.props.maxWidth
                )
            );
            this.setState({
                isBeingResized: false,
            });
            this.removeListener();
            return;
        }

        const paneOriginAdjustment = -1; //'left' === 'right' ? 1 : -1;
        const newWidth =
            (this.state.liveWidth - event.pageX) * paneOriginAdjustment + this.state.currWidth;

        this.setPaneWidth(newWidth);
        if (newWidth < this.props.minWidth) {
            this.setState({
                isBeingResized: false,
            });
        }
    }
    newMethod = this.onMouseMove.bind(this);

    addListener() {
        window.addEventListener('mousemove', this.newMethod);
    }

    removeListener() {
        console.log('removing listener mousemove');
        window.removeEventListener('mousemove', this.newMethod);
    }

    render() {
        return (
            <div id={this.props.id}>
                <div
                    id={this.props.handleId}
                    draggable="true"
                    onMouseDown={this.onMouseDown.bind(this)}
                    // onMouseMove={this.onMouseMove.bind(this)}
                ></div>
            </div>
        );
    }

    getHandleElement() {
        return document.getElementById(this.props.handleId);
    }

    getResizableElement() {
        return document.getElementById(this.props.id);
    }

    getPaneWidth() {
        const element = this.getResizableElement();

        if (element) {
            const pxWidth = getComputedStyle(element).getPropertyValue(
                '--resizable-width'
            );
            return parseInt(pxWidth, 10);
        }

        return this.props.minWidth;
    }

    setPaneWidth(width: number) {
        console.log('new width=' + width);
        this.getResizableElement()?.style.setProperty(
            '--resizable-width',
            `${width}px`
        );
    }
}
