const config = require("D:/Projects/tnyPlayer/config.js");
const Logger = require(config.loggerPath);

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



module.exports = convertBytes;