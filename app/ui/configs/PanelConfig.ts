import { Enable } from 're-resizable';

export enum PanelType {
    navPanel,
    mainPanel,
    playerControlsPanel,
}

export interface ContainerSize {
    panelType?: PanelType;

    // Will be used to have a responsive changing side
    liveWidth: number | any;
    liveHeight: number | any;

    // Will be used to counteract the delta variable
    //  from exponentially adding to itself
    currWidth: number | any;
    currHeight: number | any;

    // To make decisions easier, use this variable:
    isBeingResized: boolean;
}

export interface PanelConfig {
    temp?: number;
    id: string;
    panelType: PanelType;
    panelName: string;
    className: string;
    classStyles: string;

    resizableSides: Enable;
    defaultSize: {
        defaultWidth: number | string;
        defaultHeight: number | string;
    };
    minWidth: number | string;
    minHeight: number | string;
    maxWidth: number | string;
    maxHeight: number | string;

    currentSize?: ContainerSize;
    broadcastResize?(panelType: PanelType, isResizing: boolean): unknown;
    onResize?(panelType: PanelType, delta: any): unknown;

    element?: React.ReactNode; // The child element for the panel
}
