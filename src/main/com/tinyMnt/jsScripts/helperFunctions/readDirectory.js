// A test file to experiment with: 
//  How to read a directory and get information on what files 
//   exist inside it (and extract helpful information from each file)
const fs = require('fs');
const config = require("D:/Projects/Electron-MediaPlayer/config.js");
const Logger = require(config.loggerPath);

// Call the function with a string representing the path of the directory in question
// For safe usage, call with the full path. 
//      @param path: an array of all the paths that need to read
//      @param emitter: the ipcMain of the main window (from main.js)
//      @param eventType: the name of the event to send through the emitter
//      @return result: an array with information of all files in a directory
//                      the first object in result is an object that contains the path of the directory
function readDirectory(paths, emitter, eventType) {
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
        let items = readdir(currPath).catch(err => {
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
            stat(file, items[i]).then(data => {
                result.push(data);
            }).catch(err => {
                Logger.logError(__filename, err);
            });
            Logger.logDebug("result is now length: " + result.length);
        }
        
        Logger.loginfo(__filename, "readDirectory() finished processing: " + paths);

        // Since you cannot return, we send the data back through a send function.
        emitter.send(eventType, result);
    }
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
            resolve(getFileData(filePath, fileName, stat));
        });
    });
}

// Extracts usefule information from the "stats" object
// More info on the fs.stats object can be found at: https://nodejs.org/api/fs.html#fs_class_fs_stats 
function getFileData(filePath, fileName, stats) {
    let obj = {};

    // Get basic info:
    obj.path = filePath;
    obj.name = fileName;
    obj.isDirectory = stats.isDirectory();
    obj.isFile = stats.isFile();
    obj.size = convertBytes(stats.size);

    // The next section will convert time from UNIX EPOCH (which is returned by stats.mtimeMs) into something readable
    // The Date() object (for future reference if needed)
    obj.date = new Date(stats.mtimeMs);

    // Get the subinformation needed to construct HH:MM:SS
    obj.hours = obj.date.getHours();
    obj.minutes = "0" + obj.date.getMinutes();
    obj.seconds = "0" + obj.date.getSeconds();

    // Get the subinformation needed to construct MM/DD/YYYY
    obj.month = obj.date.getMonth() + 1;
    obj.day = obj.date.getDate();
    obj.year = obj.date.getFullYear();

    // Will display time in HH:MM:SS format
    obj.formattedTime = obj.hours + ':' + obj.minutes.substr(-2) + ':' + obj.seconds.substr(-2);

    // Will display date in MM/DD/YYYY
    obj.formattedDate = obj.month + '/' + obj.day + '/' + obj.year;

    // Return the object so it can be resolved by the calling promise
    return obj;
}


// Converts bytes to the most appropriate size indicator
//      Source: https://coderrocketfuel.com/article/how-to-convert-bytes-to-kb-mb-gb-or-tb-format-in-node-js 
const convertBytes = function (bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

    if (bytes == 0) {
        return "0 Bytes"
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

    if (i == 0) {
        return bytes + " " + sizes[i]
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}


module.exports = readDirectory;