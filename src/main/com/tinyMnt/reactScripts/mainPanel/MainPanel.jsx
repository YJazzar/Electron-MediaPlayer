import React from "react";
const config = require("D:/Projects/Electron-MediaPlayer/config.js");


// Import other scripts
const Logger = require(config.htmlLoggerPath);
const Table = require(config.buildPath + config.reactSourcePath + "mainPanel/Table.js");

class MainPanel extends React.Component {
  render() {
    Logger.logDebug(__filename, "Rendering MainPanel component");
    return (
      <div id="main_container" className="">

        <h1>File List:</h1>
        <a className="waves-effect waves-light btn" id="submit:clearTable">Clear Table</a>
    

        <link rel="stylesheet" href={config.buildPath + config.cssSourcePath + "mainPanel.css"}></link>

          <Table/>

      </div>
    );
  }
}

module.exports = MainPanel;
