import { Box } from '@material-ui/core';
import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import PanelConfig from '../../libs/templates/PanelConfig';

const log = LoggerFactory.getUILogger(__filename);

/**
 * Vars not used that are defined in PanelConfig:
 *      - id
 */
interface Props {
    topDivId: string;
    bottomDivId: string;
    handleDivId: string;

    cssTopHeightVarName: string;
    cssBottomHeightVarName: string;
    cssMinHeightVarName: string;
    cssMaxHeightVarName: string;

    // Components passed to be rendered as a child of each side of the panels
    topPanelComponent: React.ReactChild;
    bottomPanelComponent: React.ReactChild;

    topPanelConfig: PanelConfig;
}

// live lengths will always be rendered
// curr lengths will be used to use in calculating new lengths (when being dragged)
interface State {
    liveHeight: number;
    currHeight: number;
    isBeingResized: boolean;
}

export default class HorizontalResizableContainer extends React.Component<Props, State> {
    newMethod = this.onMouseMove.bind(this);

    constructor(props: Props) {
        super(props);
        // live lengths will always be rendered
        // curr lengths will be used to use in calculating new lengths (when being dragged)
        this.state = {
            liveHeight: 0,
            currHeight: 0,
            isBeingResized: false,
        };
    }

    // Initialize the state
    componentDidMount() {
        log.debug(`The horizontally resizable panel finished mounting!`);

        this.setState({
            liveHeight: this.getPaneHeight(),
            currHeight: this.getPaneHeight(),
        });
    }

    onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
        this.setState(
            {
                currHeight: this.getPaneHeight(),
                liveHeight: this.getPaneHeight(),
                isBeingResized: true,
            },
            this.addListener
        );
    }

    onMouseMove(event: MouseEvent) {
        // Reject the even if it is not actually being dragged
        if (!this.state.isBeingResized) {
            this.removeListener();
            return;
        }

        const paneOriginAdjustment = -1; //'left' === 'right' ? 1 : -1;
        const newHeight = (this.state.liveHeight - event.pageY) * paneOriginAdjustment + this.state.currHeight;

        // If the dragging just finished, then store the new size
        const primaryButtonPressed = event.buttons === 1;
        if (!primaryButtonPressed) {
            this.setPaneHeight(Math.min(Math.max(this.getPaneHeight(), this.getMinHeight()), this.getMaxHeight()));
            this.setState({
                isBeingResized: false,
            });
            this.removeListener();
            return;
        }
        if (newHeight > this.getMinHeight() && newHeight < this.getMaxHeight()) {
            this.setPaneHeight(newHeight);
        }
    }

    // This function makes it so that both divs can reliably show up upon starting the application
    initWindowSize() {
        const height = this.props.topPanelConfig.sizeProps.defaultHeight * window.innerHeight;

        this.setPaneHeight(height);
    }

    addListener() {
        window.addEventListener('mousemove', this.newMethod);
    }

    removeListener() {
        window.removeEventListener('mousemove', this.newMethod);
    }

    render() {
        // The following style object is placed here to make sure min and max heights are re-calculated
        const style = {} as {
            [key: string]: string;
        };
        style[this.props.cssMaxHeightVarName] = `${this.getMaxHeight()}px`;
        style[this.props.cssMinHeightVarName] = `${this.getMinHeight()}px`;

        return (
            <div id="box">
                <div id={this.props.topDivId} style={style}>
                    {this.props.topPanelComponent}
                </div>
                {/* The next element is used to show the border colors */}
                <Box
                    id={this.props.handleDivId}
                    onMouseDown={this.onMouseDown.bind(this)}
                    border={1}
                    borderColor={'purple[500'}
                />
                <div id={this.props.bottomDivId} style={style}>
                    {this.props.bottomPanelComponent}
                </div>
            </div>
        );
    }

    // Helper functions
    getHandleElement() {
        return document.getElementById(this.props.handleDivId);
    }

    getTopResizableElement() {
        return document.getElementById(this.props.topDivId);
    }

    getBottomResizableElement() {
        return document.getElementById(this.props.bottomDivId);
    }

    getPaneHeight() {
        const element = this.getTopResizableElement();

        if (element) {
            const pxHeight = getComputedStyle(element).getPropertyValue(this.props.cssTopHeightVarName);
            return parseInt(pxHeight, 10);
        }

        return this.getMinHeight();
    }

    setPaneHeight(height: number) {
        this.getTopResizableElement()?.style.setProperty(this.props.cssTopHeightVarName, `${height}px`);

        const newBottomHeight = window.innerHeight - height;

        this.getBottomResizableElement()?.style.setProperty(this.props.cssBottomHeightVarName, `${newBottomHeight}px`);
    }

    mainWindowResized(deltaHeight: number) {
        const newHeight = this.getPaneHeight() + deltaHeight / 5;
        if (newHeight > this.getMinHeight() && newHeight < this.getMaxHeight()) {
            this.setPaneHeight(newHeight);
        }
    }

    getMinHeight(): number {
        return this.props.topPanelConfig.sizeProps.minHeight * window.innerHeight;
    }

    getMaxHeight(): number {
        return this.props.topPanelConfig.sizeProps.maxHeight * window.innerHeight;
    }
}
