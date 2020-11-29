import { ipcRenderer } from 'electron';
import PanelConfig from '../../libs/templates/PanelConfig';
import PanelType from '../../libs/templates/PanelType';
import navConfig from './NavConfigImpl';

const mainConfig = {
    panelType: PanelType.mainPanel,
    panelName: 'Main panel',
    className: '',
    cssClassStyles: `h-full overflow-auto`,
    // cssClassStyles: 'floatLeft bg-gray-400 border border-gray-600',

    sizeProps: {
        defaultWidth: 1 - navConfig.sizeProps.defaultWidth,
        minWidth: 1 - navConfig.sizeProps.maxWidth,
        maxWidth: 1 - navConfig.sizeProps.minWidth,

        defaultHeight: 1 - ipcRenderer.sendSync('config:getPlayerControlsHeight'),
        minHeight: 0.15,
        maxHeight: 0.85,
    },
} as PanelConfig;

export default mainConfig;
