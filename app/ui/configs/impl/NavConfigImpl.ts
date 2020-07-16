import { Enable } from 're-resizable';
import PanelType from '../PanelType';
import PanelConfig from '../PanelConfig';

const navConfig = {
    id: 'nav-panel-id',
    panelType: PanelType.navPanel,
    panelName: 'Navigation panel',
    className: '',
    classStyles: 'floatLeft bg-gray-400 border border-gray-600',

    defaultSize: {
        defaultWidth: '20%',
        defaultHeight: '100%',
    },
    minWidth: '10%',
    minHeight: '100%',
    maxWidth: '90%',
    maxHeight: '100%',

    resizableSides: {
        top: false,
        left: false,
        right: true,
        bottom: false,
    } as Enable,

    element: undefined,
} as PanelConfig;

export default navConfig;
