
const config = require("D:/Projects/Electron-MediaPlayer/config.js");
const Logger = require(config.buildPath + config.htmlSourcePath + 'scripts/htmlLoggerWrapper.js');
const { List } = require('./List.js');


// This class will store all important information:
//  1. The history of files played
//  2. All folders that have been imported
//  3. All constructed playlists
class Database {
    // Initialize all database objects
    constructor() {
        this.playHistory = new List({type: "Stack"});
        this.playQueue = new List({ type: "Queue" });

    }
}

let db = new Database();