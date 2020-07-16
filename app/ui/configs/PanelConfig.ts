import { Enable } from 're-resizable';
import ContainerSize from './ContainerSize';
import PanelType from './PanelType';

export default interface PanelConfig {
    temp?: number;
    id: string;
    handleId: string;
    panelType: PanelType;
    panelName: string;
    className: string;
    classStyles: string;

    resizableSides: Enable;
    defaultSize: {
        defaultWidth: number | string;
        defaultHeight: number | string;
    };

    // These will be used as percentages
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;

    currentSize?: ContainerSize;
    broadcastResize?(panelType: PanelType, isResizing: boolean): unknown;
    onResize?(panelType: PanelType, delta: any): unknown;

    element?: React.ReactNode; // The child element for the panel
}
