config = {
    buildPath: "D:/Projects/Electron-MediaPlayer/build/",
    sourcePath: "main/com/tinyMnt/",
    cssSourcePath: "main/com/tinyMnt/css/", 
    htmlSourcePath: "main/com/tinyMnt/html/", 
    jsSourcePath: "main/com/tinyMnt/jsScripts/",
    reactSourcePath: "main/com/tinyMnt/reactScripts/",
    loggerPath: "D:/Projects/Electron-MediaPlayer/build/" + "main/com/tinyMnt/jsScripts/" + 'logger/Logger.js',
    htmlLoggerPath: "D:/Projects/Electron-MediaPlayer/src/main/com/tinyMnt/jsScripts/logger/htmlLogWrapper.js",
    defaultLoggingLevel: "debug",

    entryHTML: "app.html",
    tableOptions: {
        tableHeaderTitles: ["Name", "Length", "Type", "Size", "Date Modified"],
        fileExtensions: ["mp3", "mp4", "mkv"]
    }
}

/**
 * buildPath = the path were all the built files will be placed
 * sourcePath = the path were all the main packages will be found
 *      *All other source paths are there for code readability*
 * defaultLoggingLevel = the level of logging to be used if no command line argument is passed
 */

module.exports = config