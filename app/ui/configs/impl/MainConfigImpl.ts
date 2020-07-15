import { Enable } from 're-resizable';
import PanelType from '../PanelType';
import PanelConfig from '../PanelConfig';

const mainConfig = {
    temp: 0,
    id: 'main-panel-id',
    panelType: PanelType.mainPanel,
    panelName: 'Main panel',
    className: '',
    classStyles: 'floatLeft bg-gray-400 border border-gray-600',

    defaultSize: {
        defaultWidth: '80%',
        defaultHeight: '80%',
    },
    minWidth: '5%',
    minHeight: '15%',
    maxWidth: '90%',
    maxHeight: '85%',

    resizableSides: {
        top: false,
        left: false,
        right: false,
        bottom: true,
    } as Enable,
} as PanelConfig;

export default mainConfig;
