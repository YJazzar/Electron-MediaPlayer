import IpcRendererController from './controllers/IpcRendererController';

export default class UIEntry {
    private ipcRendererController: IpcRendererController;

    constructor() {
        this.ipcRendererController = new IpcRendererController();
        this.ipcRendererController.init();
    }
}
