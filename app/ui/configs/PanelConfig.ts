import PanelType from './PanelType';

export default interface PanelConfig {
    panelType: PanelType;
    panelName: string;
    className: string;
    cssClassStyles: string;

    // Used for controlling resizing behavior:
    // Note: these will be percentages (ex: 0.5 for 50%)
    sizeProps: {
        defaultWidth: number;
        minWidth: number;
        maxWidth: number;

        defaultHeight: number;
        minHeight: number;
        maxHeight: number;
    };
}

export const SharedPanelClassStyles =
    'bg-transparent border-white border-2 p-1 text-gray-100';
