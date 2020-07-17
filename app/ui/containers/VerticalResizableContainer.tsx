import React from 'react';
import LoggerFactory from '../../libs/logger/LoggerFactory';
import '../styles/RootComponent.global.css';

const log = LoggerFactory.getUILogger(__filename);

/**
 * Vars not used that are defined in PanelConfig:
 *      - id
 */
interface Props {
    leftDivId: string;
    rightDivId: string;
    handleDivId: string;

    // Used for controller resizing behavior:
    // Note: these will be percentages (ex: 0.5 for 50%)
    minWidth: number;
    maxWidth: number;

    cssLeftWidthVarName: string;
    cssMinWidthVarName: string;
    cssMaxWidthVarName: string;

    // Components passed to be rendered as a child of each side of the panels
}

interface State {
    // live lengths will always be rendered
    liveWidth: number;

    // curr lengths will be used to use in calculating new lengths (when being dragged)
    currWidth: number;

    isBeingResized: boolean;
}

export default class VerticalResizableContainer extends React.Component<
    Props,
    State
> {
    newMethod = this.onMouseMove.bind(this);

    constructor(props: Props) {
        super(props);
        this.state = {
            // live lengths will always be rendered
            liveWidth: 0,
            // curr lengths will be used to use in calculating new lengths (when being dragged)
            currWidth: 0,

            isBeingResized: false,
        };
    }

    // Initialize the state
    componentDidMount() {
        log.info(`The horizontally resizable nav panel finished mounting!`);

        this.setState({
            liveWidth: this.getPaneWidth(),
            currWidth: this.getPaneWidth(),
        });
    }

    onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
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
        // Reject the even if it is not actually being dragged
        if (!this.state.isBeingResized) {
            this.removeListener();
            return;
        }

        const paneOriginAdjustment = -1; //'left' === 'right' ? 1 : -1;
        const newWidth =
            (this.state.liveWidth - event.pageX) * paneOriginAdjustment +
            this.state.currWidth;

        // If the dragging just finished, then store the new size
        const primaryButtonPressed = event.buttons === 1;
        if (!primaryButtonPressed) {
            this.setPaneWidth(
                Math.min(
                    Math.max(this.getPaneWidth(), this.getMinWidth()),
                    this.getMaxWidth()
                )
            );
            this.setState({
                isBeingResized: false,
            });
            this.removeListener();
            return;
        }

        this.setPaneWidth(newWidth);
        if (newWidth < this.getMinWidth() * 0.5) {
            this.setState({
                isBeingResized: false,
            });
        }
    }

    // This function makes it so that both divs can reliably show up upon starting the application
    initWindowSize(width: number, height: number) {
        width =
            ((this.props.minWidth + this.props.maxWidth) / 4) *
            document.body.clientWidth;
        this.setPaneWidth(width);
    }

    addListener() {
        window.addEventListener('mousemove', this.newMethod);
    }

    removeListener() {
        console.log('removing listener mousemove');
        window.removeEventListener('mousemove', this.newMethod);
    }

    render() {
        // The following style object is placed here to make sure min and max widths are re-calculated
        const style = {} as {
            [key: string]: string;
        };
        style[this.props.cssMaxWidthVarName] = `${this.getMaxWidth()}px`;
        style[this.props.cssMinWidthVarName] = `${this.getMinWidth()}px`;

        if (!this.state.isBeingResized) {
            // this.setPaneWidth(this.getPaneWidth());
        }

        return (
            <div>
                <div id={this.props.leftDivId} style={style}>
                    <div
                        id={this.props.handleDivId}
                        onMouseDown={this.onMouseDown.bind(this)}
                    />

                </div>
                <div id={this.props.rightDivId} style={style}>

                </div>
            </div>
        );
    }

    // Helper functions
    getHandleElement() {
        return document.getElementById(this.props.handleDivId);
    }

    getLeftResizableElement() {
        return document.getElementById(this.props.leftDivId);
    }

    getPaneWidth() {
        const element = this.getLeftResizableElement();

        if (element) {
            const pxWidth = getComputedStyle(element).getPropertyValue(
                this.props.cssLeftWidthVarName
            );
            return parseInt(pxWidth, 10);
        }

        return this.getMinWidth();
    }

    setPaneWidth(width: number) {
        this.getLeftResizableElement()?.style.setProperty(
            this.props.cssLeftWidthVarName,
            `${width}px`
        );
    }

    mainWindowResized(deltaWidth: number) {
        const newWidth = this.getPaneWidth() + deltaWidth / 5;
        if (newWidth > this.getMinWidth() && newWidth < this.getMaxWidth()) {
            this.setPaneWidth(newWidth);
        }
    }

    getMinWidth(): number {
        return this.props.minWidth * document.body.clientWidth;
    }

    getMaxWidth(): number {
        return this.props.maxWidth * document.body.clientWidth;
    }
}
