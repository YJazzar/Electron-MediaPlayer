import {BrowserWindow} from "electron";


export class ApplicationEntry {

    private window: BrowserWindow;

    constructor(window: BrowserWindow) {
        console.log("Application entry point initialized!");
        this.window = window;
    }

}