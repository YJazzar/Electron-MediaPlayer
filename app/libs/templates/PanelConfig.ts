// import { ipcRenderer } from 'electron';
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

// const darkThemeClassStyles = 'dark bg-transparent p-10 text-gray-400 panel-border-dark';
// const lightThemeClassStyles = 'light bg-transparent p-10 text-black panel-border-light';

// export const SharedPanelClassStyles =
//     ipcRenderer.sendSync('config:getTheme').toLowerCase() === 'light' ? lightThemeClassStyles : darkThemeClassStyles;

/** Styles Explanation (tailwind styles):
 * .bg-transparent = transparent background
 * .p-10 = padding
 * .font-sans = use a sans-font
 * .text-gray-400 = set the text to gray (dark theme only)
 * .text-black = set the text to gray (light theme only)
 * .border-gray-800 = set the borders (between the panels) to gray
 *
 * (Custom styles):
 * .panel-border = set colors of the borders between the panels
 */
