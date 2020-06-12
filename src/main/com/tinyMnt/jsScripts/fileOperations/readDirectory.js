// A test file to experiment with: 
//  How to read a directory and get information on what files 
//   exist inside it (and extract helpful information from each file)
const fs = require('fs');
const config = require("D:/Projects/Electron-MediaPlayer/config.js");
const Logger = require(config.loggerPath);
const FileDetails = require(config.buildPath + config.jsSourcePath + "fileOperations/FileDetails.js");
const applyFilter = require(config.buildPath + config.jsSourcePath + "fileOperations/filterResults.js");

// Call the function with a string representing the path of the directory in question
// For safe usage, call with the full path. 
//      @param path: an array of all the paths that need to read
//      @param emitter: the ipcMain of the main window (from main.js)
//      @param eventType: the name of the event to send through the emitter
//      @return result: an array with information of all files in a directory
//                      the first object in result is an object that contains the path of the directory
async function readDirectory(paths, emitter, eventType) {
    Logger.logVerbose(__filename, "Starting readDirectory() call with: ")
    Logger.logVerbose(__filename, "\tpaths: " + paths);
    Logger.logVerbose(__filename, "\teventType: " + eventType);

    let result = [{ path: paths }];

    // For each path, find al files inside each and add them to "result"
    let currPath = "";
    for (let p = 0; p < paths.length; p++) {
        currPath = paths[p];

        // Look at this website for more explanation (bottom of the page): 
        //      https://code-maven.com/list-content-of-directory-with-nodejs
        // Here, 'items' is a string array holding the names of the files (of the given directory)
        let items = await readdir(currPath).catch(err => {
            Logger.logError(__filename, err);
        });;


        // For each file, call the function fs.stat() to get more information about it
        for (var i = 0; i < items.length; i++) {
            let file = currPath + '/' + items[i];

            // After the file path was found, we query for more information and display it
            // The query happens through the Promise made by the local stat() function
            // The resolved value is simply the object constructed with useful information
            // The "await" is placed there to make sure the "result" array contains all needed information 
            //   before the for-loop continues to the next iteration.
            await stat(file, items[i]).then(data => {
                if (applyFilter(data)) {
                    result.push(data);
                    data.mediaInfo = FileDetails.getMediaInfo(data);

                    Logger.logInfo(__filename, data.mediaInfo);
                }
            }).catch(err => {
                Logger.logError(__filename, err);
            });
        }

        Logger.logInfo(__filename, "readDirectory() finished processing: " + currPath);


    }

    // Since you cannot return, we send the data back through a send function.
    emitter.send(eventType, result);
}

// Makes a promise from fs.readdir() function call
function readdir(path) {
    // Return a promise that runs the external call
    return new Promise((resolve, reject) => {
        fs.readdir(path, async function (err, items) {
            if (err)
                reject(err);

            // Return the list of items
            resolve(items);
        });
    });
}

// Makes a promise from the fs.stat() function call
function stat(filePath, fileName) {
    // Return a promise that runs the system call
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stat) => {
            if (err) {
                reject(err);
            }

            // Return a resolve value with all of the information extracted
            resolve(FileDetails.getFileData(filePath, fileName, stat));
        });
    });
}




module.exports = readDirectory;