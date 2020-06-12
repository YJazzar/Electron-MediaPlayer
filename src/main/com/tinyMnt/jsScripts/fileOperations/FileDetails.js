const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
const config = require("D:/Projects/Electron-MediaPlayer/config.js");
const Logger = require(config.loggerPath);
const convertBytes = require(config.buildPath + config.jsSourcePath + "fileOperations/convertBytes.js");

// Extracts usefule information from the "stats" object
// More info on the fs.stats object can be found at: https://nodejs.org/api/fs.html#fs_class_fs_stats 
function getFileData(filePath, fileName, stats) {
    let obj = {};

    // Get basic info:
    obj.path = filePath;        // Contains the full path (Ex: C:path/to/file.ext)
    obj.name = fileName;        // Contains the name of the file only (Ex: file.ext)
    obj.isDirectory = stats.isDirectory();
    obj.isFile = stats.isFile();
    obj.size = convertBytes(stats.size);
    obj.extension = getExtension(fileName);

    // The next section will convert time from UNIX EPOCH (which is returned by stats.mtimeMs) into something readable
    // The Date() object (for future reference if needed)
    obj.date = new Date(stats.mtimeMs);

    // Get the sub-information needed to construct HH:MM:SS
    obj.dateElements = {};
    obj.dateElements.hours = obj.date.getHours();
    obj.dateElements.minutes = "0" + obj.date.getMinutes();
    obj.dateElements.seconds = "0" + obj.date.getSeconds();

    // Get the sub-information needed to construct MM/DD/YYYY
    obj.dateElements.month = obj.date.getMonth() + 1;
    obj.dateElements.day = obj.date.getDate();
    obj.dateElements.year = obj.date.getFullYear();

    // Will display time in HH:MM:SS format
    obj.formattedTime = obj.dateElements.hours + ':' + obj.dateElements.minutes.substr(-2) + ':' + obj.dateElements.seconds.substr(-2);

    // Will display date in MM/DD/YYYY
    obj.formattedDate = obj.dateElements.month + '/' + obj.dateElements.day + '/' + obj.dateElements.year;

    // Return the object so it can be resolved by the calling promise
    return obj;
}

function getExtension(fileName) {
    let temp = fileName.split(".");

    if (temp.length <= 1) {
        return "";  // No file extension found
    }
    return temp[temp.length - 1];
}

// Given the file object (with the same structure as the one generated above), this will return an object with useful info
async function getMediaInfo(file) {
    Logger.logInfo(__filename, "calling getMediaInfo() on: " + file.path);

    
    return await ffprobe(file.path, { path: ffprobeStatic.path })
        .then(function (result) {
            Logger.logDebug(__filename, "call was successful on: " + file.path);
            return result;
        })
        .catch(function (err) {
            Logger.logError(__filename, err);
            return undefined;
        });
    
}

module.exports = { getFileData, getMediaInfo};