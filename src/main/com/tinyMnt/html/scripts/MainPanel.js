import React from "react";

const config = require("D:/Projects/Electron-MediaPlayer/config.js");
const Logger = require(config.htmlLoggerPath);

// Imports for other custom tags and ReactJS classes

class MainPanel extends React.Component {
    render() {

        return (
          <div id="main_container">
            <h1>THIS IS INSIDE THE MAIN PANEL </h1>
          </div>
        );
    }
}

module.exports = MainPanel;