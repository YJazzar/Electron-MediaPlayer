import { Enable } from 're-resizable';

export enum PanelType {
    navPanel,
    mainPanel,
    playerControlsPanel,
}

export interface ContainerSize {
    panelType?: PanelType;
    width?: number;
    height?: number;
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

    currentSize?: ContainerSize;
    initSize?(actualSize: ContainerSize): unknown;
    onResize?(oldSize: ContainerSize, newSize: ContainerSize): unknown;

    element?: React.ReactNode; // The child element for the panel
}
