import PanelConfig, { SharedPanelClassStyles } from '../PanelConfig';
import PanelType from '../PanelType';

const navConfig = {
    panelType: PanelType.navPanel,
    panelName: 'Navigation panel',
    className: 'h-full overflow-auto',
    cssClassStyles: `${SharedPanelClassStyles} border-r-4 rounded`,
    /** Styles explained:
     * .h-full = height: 100%
     * .border-r-4 = border right 4px
     * .rounded-ful;
     */
    sizeProps: {
        defaultWidth: 0.25,
        minWidth: 0.15,
        maxWidth: 0.4,

        defaultHeight: 1.0,
        minHeight: 1.0,
        maxHeight: 1.0,
    },
} as PanelConfig;

export default navConfig;
