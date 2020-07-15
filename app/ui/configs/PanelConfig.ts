import { Enable } from 're-resizable';
import ContainerSize from './ContainerSize';
import PanelType from './PanelType';

export default interface PanelConfig {
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
