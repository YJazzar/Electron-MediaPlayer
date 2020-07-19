import PanelConfig, { SharedPanelClassStyles } from '../PanelConfig';
import PanelType from '../PanelType';

const navConfig = {
    panelType: PanelType.navPanel,
    panelName: 'Navigation panel',
    className: '',
    cssClassStyles: `${SharedPanelClassStyles} h-full overflow-auto`,

    sizeProps: {
        defaultWidth: 0.2,
        minWidth: 0.15,
        maxWidth: 0.4,

        defaultHeight: 1.0,
        minHeight: 1.0,
        maxHeight: 1.0,
    },
} as PanelConfig;

export default navConfig;
