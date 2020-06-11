import React from "react";

const config = require("D:/Projects/Electron-MediaPlayer/config.js");
const Logger = require(config.htmlLoggerPath);

// Imports for other custom tags and ReactJS classes

class NavPanel extends React.Component {
    render() {

        return (
          <div id="nav_container">
            <h1>NAV THIS IS INSIDE THE NAV PANEL </h1>
          </div>
        );
    }
}

module.exports = NavPanel;