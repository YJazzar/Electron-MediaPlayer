import { Enable } from 're-resizable';

const panelConfigs = {
    navPanel: {
        defaultWidth: '20%',
        defaultHeight: '100%',
        enableSides: {
            top: false,
            left: false,
            right: true,
            bottom: false,
        } as Enable,
    },
    mainPanel: {
        defaultWidth: '80%',
        defaultHeight: '80%',
        enableSides: {
            top: false,
            left: false,
            right: false,
            bottom: true,
        } as Enable,
    },
    playerControlsPanel: {
        defaultWidth: '80%',
        defaultHeight: '20%',
        enableSides: {
            top: false,
            left: false,
            right: false,
            bottom: false,
        } as Enable,
    },
};

export default panelConfigs;
