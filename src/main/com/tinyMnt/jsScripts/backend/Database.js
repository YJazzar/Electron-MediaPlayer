
const config = require("D:/Projects/tnyPlayer/config.js");
const Logger = require(config.loggerPath);
const FileManager = require(config.buildPath + config.jsSourcePath + "backend/dbFileManager.js");

// const { List } = require('./List.js');


// This class will store all important information:
//  1. The history of files played
//  2. All folders that have been imported
//  3. All constructed playlists
class Database {

    /**
     * 
     * @param {
         dir: []                // An array with the file paths the implementor wants to use
         alias: []              // An array with the aliases to be used for each corresponding file
         refreshTime: <int>     // Time in milliseconds for how long to take before refreshing the database files
     } options 
     */

    // Initialize all database objects
    constructor(options) {
        Logger.logInfo(__filename, "Initializing database...");

        // Store the logger passed in
        this.log = options.logger;

        // Store the filePaths, aliases, and refresh time
        this.filePaths = options.dir;
        this.fileAliases = options.alias;
        this.refreshTime = options.refreshTime;

        // Initialize and read in all of the files
        this.fileManagers = [];
        this.addFileManagers(this.filePaths, this.fileAliases);

        // Create the refresh timer
        this.interval = setInterval(this.refreshFiles.bind(this), this.refreshTime);

        Logger.logInfo(__filename, "Done creating database");
    }

    // Pass the paths as a parameter to allow the Database implementor to create and open new files
    addFileManagers(filePaths, fileAliases) {
        // Iterate through all paths and add each FileManager instance:
        for (let i = 0; i < filePaths.length; i++) {
            this.fileManagers.push(new FileManager(filePaths[i], fileAliases[i]));
        }
    }

    refreshFiles() {
        // Iterate through all FileManager instances and call fresh:
        for (let i = 0; i < this.fileManagers.length; i++) {
            this.fileManagers[i].refresh();
        }
    }

    // This is to get a specific instance of a fileManager
    get(alias) {
        for (let i = 0; i < this.fileManagers.length; i++) {
            if (this.fileManagers[i].fileAlias == alias)
                return this.fileManagers[i];
        }
        Logger.logError(__filename, "Could not file a file with the alias: " + alias);
        return null;
    }

    // This is to get a specific instance of a fileManager
    setFileObj(alias, obj) {
        let fm = this.fileManagers.indexOf(alias);
        fm.overrideObj(obj);
    }

    // @param identifier can be either the filePath or an alias 
    closeFile(identifier) {
        // Iterate through all FileManager instances and find the correct fileManager
        let index = -1;
        for (let i = 0; i < this.fileManagers.length; i++){
            if (this.fileManagers[i].filePath == identifier || this.fileManagers[i].fileAlias == identifier) {
                index = i;
                break;
            }
        }    

        if (index == -1)
            return false;

        // Close this file:
        Logger.logInfo(__filename, "Closing file: \"" + this.fileManagers[index].fileAlias + "\" with path: \"" + this.fileManagers[index].filePath + "\"");
        this.fileManagers[index].refresh();
        this.fileManagers.splice(index, 1);
        return true;
    }


    // The callback can be used to exit the program (it is also optional)
    closeAllFiles(callback) {
        // Iterate through all FileManager instances and find the correct fileManager
        for (let i = 0; i < this.fileManagers.length; i++)
            this.fileManagers[i].writeFileContentsSync();
            
        // Close this file:
        this.fileManagers.length = 0;
        Logger.logInfo(__filename, "All files have been removed");
    }

    forceRefresh(identifier) {
        // If no identified was supplied, refresh all files opened
        if (identifier == undefined) {
            for (let i = 0; i < this.fileManagers.length; i++) 
                this.fileManagers[i].changedBool = true;
            
            return true;
        }

        // Iterate through all FileManager instances and find the correct fileManager
        for (let i = 0; i < this.fileManagers.length; i++) {
            if (this.fileManagers[i].filePath == identifier || this.fileManagers[i].fileAlias == identifier) {
                this.fileManagers[i].changedBool = true;
                break;
            }
        }

    }


}

module.exports = Database;