import { Enable } from 're-resizable';
import PanelType from '../PanelType';
import PanelConfig from '../PanelConfig';

const playerControlsConfig = {
    id: 'player-controls-panel-id',
    panelType: PanelType.playerControlsPanel,
    panelName: 'Player Controls panel',
    className: '',
    classStyles: 'floatLeft bg-gray-400 border border-gray-600',

    defaultSize: {
        defaultWidth: '80%',
        defaultHeight: '20%',
    },
    minWidth: '5%',
    minHeight: '5%',
    maxWidth: '90%',
    maxHeight: '90%',

    resizableSides: {
        top: false,
        left: false,
        right: false,
        bottom: false,
    } as Enable,
} as PanelConfig;

export default playerControlsConfig;
