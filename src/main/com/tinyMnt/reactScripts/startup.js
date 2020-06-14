const { ipcRenderer } = require("electron");
const { EventEmitter } = require('events');

const config = require("D:/Projects/tnyPlayer/config.js");
const Logger = require(config.htmlLoggerPath);
const TableEvents = require(config.buildPath + config.reactSourcePath + "mainPanel/TableEvents.js");
const readDirectory = require(config.buildPath + config.jsSourcePath + 'fileOperations/readDirectory.js');
const dbh = require(config.buildPath + config.jsSourcePath + 'backend/dbHandler.js');

//// ****************************************** Functions using ipcRenderer

// This is the signal received when content can be loaded into the webpage
// This is sent from "jsScripts/electron/main.js"
ipcRenderer.on("sendStartup", evokeStartup);

function evokeStartup() {
    Logger.logInfo(__filename, "Starting database");
    
    Logger.logDebug(__filename, "Auto populating table");

    readDirectory(["C:\\Users\\sfjzz\\Videos"], em, "tableFile:appendItems");
}


// Set up the receiving end for PromptFiles.js's event signal
ipcRenderer.on("readDirectory", evokeReadDirectory);

// This function is called when PromptFile.js receives a valid set of paths to import
function evokeReadDirectory(event, paths, action) {
    Logger.logDebug(__filename, "evokeReadDirectory() is now calling readDirectory()");
    Logger.logDebug(__filename, "\tpaths:  " + paths);
    Logger.logDebug(__filename, "\taction: " + action);
    readDirectory(paths, em, action);
}

//// ****************************************** Functions using custom EventEmitter

// Make the event emitter at the core of the application:
const em = new EventEmitter();

// Setting up all event handlers:
// These functions are called when readDirectory() sends back the result to this event emitter
//  which then sends it back to TableEvents
em.on("tableFile:appendItems", (data) => {
    Logger.logDebug(__filename, "Custom EventEmitter signal received -> tableFile:appendItems. Now forwarding to TableEvents.appendTable()");
    Logger.logDb(__filename, "\tData of received from readDirectory() is of length: " + JSON.stringify(data).length)
    TableEvents.appendTable(data);
});

em.on("tableFile:clearItems", (data) => {
    Logger.logDebug(__filename, "Custom EventEmitter signal received -> tableFile:clearItems. Now forwarding to TableEvents.clearTable()");
    TableEvents.clearTable();
});

em.on("tableFile:clearAndLoadItems", (data) => {
    Logger.logDebug(__filename, "Custom EventEmitter signal received -> tableFile:clearAndLoadItems. Now forwarding to TableEvents.clearAndLoadItems()");
    Logger.logDb(__filename, "\tData of received from readDirectory() is of length: " + JSON.stringify(data).length)
    TableEvents.clearAndLoadTable(data);
});
