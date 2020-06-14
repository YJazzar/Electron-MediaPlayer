const config = require("D:/Projects/tnyPlayer/config.js");
const Logger = require(config.htmlLoggerPath);
const Database = require(config.buildPath + config.jsSourcePath + "backend/Database.js");
// const TableEvents = require(config.buildPath + config.reactSourcePath + "mainPanel/TableEvents.js");

let db;

// Creates the database instance
function createDatabase() {
    db = new Database({
        dir: [
            config.resourcesPath + "playlists.json",
            config.resourcesPath + "playHistory.json",
            config.resourcesPath + "importHistory.json",
        ],
        alias: ["playlists", "playHistory", "importHistory"],
        refreshTime: 10 * 1000,
    });

    db.refreshFiles();
}

function addToImportHistory(data) {
    Logger.logDb(__filename, "Adding to import history");

    // Prepare the data to be pushed into the file:
    // (Extract all the paths and push them into an array)
    let paths = [];
    for (let i = 1; i < data.length; i ++)
        paths.push(data[i].path);

    let obj = db.get("importHistory").getJson();
    obj[data[0].path] = paths;
    db.get("importHistory").setJson(obj);
    Logger.logDb(__filename, "Added recent \"Open File\" action into \"importHistory.json\"");
}

function openRecentImports() {
    console.log("Inside of openRecentImports()");
    

}

module.exports = { db, createDatabase, addToImportHistory, openRecentImports };
