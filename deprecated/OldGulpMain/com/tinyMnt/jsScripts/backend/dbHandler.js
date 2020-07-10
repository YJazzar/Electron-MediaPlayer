const config = require("D:/Projects/tnyPlayer/config.js");
const Logger = require(config.htmlLoggerPath);
const Database = require(config.buildPath + config.jsSourcePath + "backend/Database.js");

/**
 * This class is another layer added to the database to make some functions faster
 *  (such as saving certain types of actions, making a playlist, etc)
 */


// Creates the database instance
class dbHandler  {
    
    constructor(readDirectory) {
        this.readDirectory = readDirectory;
        this.db = new Database({
            dir: [
                config.resourcesPath + "playlists.json",
                config.resourcesPath + "playHistory.json",
                config.resourcesPath + "importHistory.json",
            ],
            alias: ["playlists", "playHistory", "importHistory"],
            refreshTime: 10 * 1000,
        });
        this.db.refreshFiles();
    }

    addToImportHistory(data) {
        Logger.logDb(__filename, "Adding to import history");

        // Prepare the data to be pushed into the file:
        // (Extract all the paths and push them into an array)
        let paths = [];
        for (let i = 1; i < data.length; i++)
            paths.push(data[i].path);

        let obj = this.db.get("importHistory").getJson();
        obj[data[0].path] = paths;
        this.db.get("importHistory").setJson(obj);
        Logger.logDb(__filename, "Added recent \"Open File\" action into \"importHistory.json\"");
    }
    
    openRecentImports(em, action) {
        let fm = this.db.get("importHistory");
        let paths = Object.keys(fm.getJson());
        Logger.logDb(__filename, "The keys retrieved were: " + paths);
        this.readDirectory([paths[0]], em, action);


    }
}

module.exports = dbHandler;
