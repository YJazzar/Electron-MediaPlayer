import LoggerFactory from '../../libs/logger/LoggerFactory';
import FileDetails from '../../libs/templates/FileDetails';
import MainContentsPanelContainer from '../panels/MainContentsPanelContainer';
import NavigationPanelContainer from '../panels/NavigationPanelContainer';
import PlayerPanelContainer from '../panels/PlayerPanelContainer';

const log = LoggerFactory.getUILogger(__filename);

export default class StateController {
    // This can be accessed using "StateController.instance".
    //  NOTE: it needs to be checked if it is null before using
    static instance: StateController;

    // Three global refs to each panel
    mainPanelRef: React.RefObject<MainContentsPanelContainer>;

    navigationPanelRef: React.RefObject<NavigationPanelContainer>;

    playerPanelRef: React.RefObject<PlayerPanelContainer>;

    // The constructor takes in references to all refs created by the root component
    constructor(
        mainPanelRef: React.RefObject<MainContentsPanelContainer>,
        navigationPanelRef: React.RefObject<NavigationPanelContainer>,
        playerPanelRef: React.RefObject<PlayerPanelContainer>
    ) {
        // Set the global ref objects
        this.mainPanelRef = mainPanelRef;
        this.navigationPanelRef = navigationPanelRef;
        this.playerPanelRef = playerPanelRef;
        StateController.instance = this;

        log.debug('Initialized StateController');
    }

    // This will be called to notify the renderer process that the data/index.json has changed
    ipcHandleNewImports(newContents: FileDetails[]) {
        this.mainPanelRef.current?.updateTable(newContents);
    }
}
