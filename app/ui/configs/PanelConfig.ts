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

// TODO: store this as the dark theme
export const SharedPanelClassStyles =
    'bg-transparent p-10 text-gray-400 panel-border';
// TODO: store this as the light theme:
// 'bg-transparent p-10 text-black panel-border';

/** Styles Explanation:
 * .b--transparent = transparent background
 * .p-10 = padding
 * .font-sans = use a sans-font
 * .text-gray-400 = set the text to gray
 * .border-gray-800 = set the borders (between the panels) to gray
 */
