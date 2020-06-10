
// Set up the logging elements

const config = require("D:/Projects/Electron-MediaPlayer/config.js");
const Logger = require(config.buildPath + config.htmlSourcePath + 'scripts/htmlLoggerWrapper.js');
const indexjsPath = "D:\\Projects\\Electron-MediaPlayer\\src\\com\\tinyMnt\\main\\javascript\\htmlScripts\\index.js";

// These values will be available to each of the corresponding files paths due to jquery. They will be used for logging.
const mainPaneljsPath = "D:\\Projects\\Electron-MediaPlayer\\src\\com\\tinyMnt\\main\\javascript\\htmlScripts\\mainPanel.js";
const navigationjsPath = "D:\\Projects\\Electron-MediaPlayer\\src\\com\\tinyMnt\\main\\javascript\\htmlScripts\\navigation.js";
const playerControlsjsPath = "D:\\Projects\\Electron-MediaPlayer\\src\\com\\tinyMnt\\main\\javascript\\htmlScripts\\playerControls.js";
