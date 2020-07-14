import { Enable } from 're-resizable';
import { PanelConfig, PanelType } from '../PanelConfig';

const mainConfig = {
    id: 'main-panel-id',
    panelType: PanelType.mainPanel,
    panelName: 'Main panel',
    className: '',
    classStyles: 'floatLeft bg-gray-400 border border-gray-600',

    defaultSize: {
        defaultWidth: '80%',
        defaultHeight: '80%',
    },
    resizableSides: {
        top: false,
        left: false,
        right: false,
        bottom: true,
    } as Enable,
} as PanelConfig;

export default mainConfig;
