const config = require("D:/Projects/Electron-MediaPlayer/config.js");
const Logger = require(config.loggerPath);
const convertBytes = require(config.buildPath + config.jsSourcePath + "fileOperations/convertBytes.js");

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

    // Get the sub-information needed to construct HH:MM:SS
    obj.hours = obj.date.getHours();
    obj.minutes = "0" + obj.date.getMinutes();
    obj.seconds = "0" + obj.date.getSeconds();

    // Get the sub-information needed to construct MM/DD/YYYY
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

module.exports = getFileData;