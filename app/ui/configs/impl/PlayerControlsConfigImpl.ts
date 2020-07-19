import PanelConfig, { SharedPanelClassStyles } from '../PanelConfig';
import PanelType from '../PanelType';
import mainConfig from './MainConfigImpl';
import navConfig from './NavConfigImpl';

const playerControlsConfig = {
    panelType: PanelType.playerControlsPanel,
    panelName: 'Player Controls panel',
    className: '',
    cssClassStyles: `${SharedPanelClassStyles} h-full overflow-auto`,
    // cssClassStyles: 'floatLeft bg-gray-400 border border-gray-600',

    sizeProps: {
        defaultWidth: 1 - navConfig.sizeProps.defaultWidth,
        minWidth: 1 - navConfig.sizeProps.maxWidth,
        maxWidth: 1 - navConfig.sizeProps.minWidth,

        defaultHeight: 1 - mainConfig.sizeProps.defaultHeight,
        minHeight: 1 - mainConfig.sizeProps.maxHeight,
        maxHeight: 1 - mainConfig.sizeProps.minHeight,
    },
} as PanelConfig;

export default playerControlsConfig;
