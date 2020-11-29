import { ipcRenderer } from 'electron';
import PanelConfig from '../../libs/templates/PanelConfig';
import PanelType from '../../libs/templates/PanelType';

const navConfig = {
    panelType: PanelType.navPanel,
    panelName: 'Navigation panel',
    className: 'h-full overflow-auto',
    cssClassStyles: `panel-border border-r-4 rounded`,
    /** Styles explained:
     * .h-full = height: 100%
     * .border-r-4 = border right 4px
     * .rounded-ful;
     */

    sizeProps: {
        defaultWidth: ipcRenderer.sendSync('config:getNavPanelWidth'),
        minWidth: 0.15,
        maxWidth: 0.4,

        defaultHeight: 1.0,
        minHeight: 1.0,
        maxHeight: 1.0,
    },
} as PanelConfig;

export default navConfig;
