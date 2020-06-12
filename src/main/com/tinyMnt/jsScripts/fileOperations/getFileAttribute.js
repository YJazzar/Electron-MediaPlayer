/**
* This file is responsible of mapping the String of a table header to an actual attribute value
* Ex: getCellText("Name", fileObj) will return the name of the file
*/

const config = require("D:/Projects/Electron-MediaPlayer/config.js");
const Logger = require(config.htmlLoggerPath);

function getCellText(attribute, fileObj) {

    // tableHeaderTitles: ["Name", "Length", "Type", "Size"],
    Logger.logDebug(__filename, "getting attribute: " + attribute);
    Logger.logDebug(__filename, JSON.stringify(fileObj));
    Logger.logDebug(__filename, "The file name is: " + removeExtension(fileObj.name));

    switch(attribute) {
        case "Name": 
            return removeExtension(fileObj.name);

        case "Length":
            return fileObj.duration; // TODO figure this out
        case "Type":
            return fileObj.extension;
        case "Size":
            return fileObj.size;

        case "Date Modified":
            return fileObj.formattedDate + " " + fileObj.formattedTime;

        default:
            Logger.logError(__filename, "Error reading attribute: " + attribute);
            return "Not Found!"
    }


}

function removeExtension(fileName) {
    let temp = fileName.split(".");

    if (temp.length <= 1) {
        return "";  // No file extension found
    }
    return temp[temp.length - 2];
}


module.exports = getCellText;