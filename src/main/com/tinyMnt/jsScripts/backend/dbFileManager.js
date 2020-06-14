const fs = require("fs");
const Logger = require(config.htmlLoggerPath);

class FileManager {
    constructor(filePath, fileAlias) {

        // Perpetually store the file path and alias
        this.filePath = filePath;
        this.fileAlias = fileAlias;

        // Get and store the file contents;
        this.fileCache = this.readFileContentsSync();

        // Make a variable to keep track of changes
        this.changedBool = false;

        // Log done message
        Logger.logDb(__filename, "Done reading: " + this.filePath);
    }

    readFileContentsSync() {
        return JSON.parse(fs.readFileSync(this.filePath));
    }

    // Will return the JSON object representing the file
    readFileContents() {
        // Synchronously read the file data, store it into this.fileCache, and return it
        return fs.readFile(this.filePath, 'utf8', function (err, data) {
            if (err) {
                Logger.logError(__filename, err);
                return undefined;
            }

            this.fileCache = JSON.parse(data);

            Logger.logDb(__filename, "Contents of: " + this.filePath + " was done reading.");

            return this.fileCache;
        }.bind(this));
    }

    // Output the data to the file on a separate thread
    writeFileContents() {
        // Synchronously write to the file and save
        return fs.writeFile(this.filePath, JSON.stringify(this.fileCache), function (err) {
            if (err) {
                Logger.logError(__filename, err);
                return false;
            }

            Logger.logDb(__filename, "Wrote to file: " + this.filePath);

            return true;
        }.bind(this))
    }

    // Used when closing the file
    writeFileContentsSync() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.fileCache));

        Logger.logDb(__filename, "Wrote to file: " + this.filePath);

        return true;
    }

    // Updates the local copies if the file was changed
    refresh() {
        if (!this.changedBool)
            return;

        Logger.logDebug(__filename, "Saving changes to file: " + this.filePath);
        this.writeFileContents();
        this.changedBool = false;
    }

    // The following functions must be used to safely edit the contents of the file
    setKey(key, value) {

        let keys = key.split(".");
        let obj = this.fileCache[key[0]];
        for (let i = 1; i < keys.length; i++) {
            obj = obj[keys[i]];
        }


        this.fileCache[key] = value;
        this.changedBool = true;

        return value;
    }

    getValue(key) {
        return this.fileCache[key];
    }

    // A function to completely reset the contents of a file to whatever the implementor likes:
    setJson(obj) {
        this.fileCache = obj;
        this.changedBool = true;
    }

    getJson() {
        return this.fileCache;
    }

}

module.exports = FileManager;