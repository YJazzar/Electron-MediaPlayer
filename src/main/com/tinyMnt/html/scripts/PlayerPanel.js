import React from "react";

const config = require("D:/Projects/Electron-MediaPlayer/config.js");
const Logger = require(config.htmlLoggerPath);

// Imports for other custom tags and ReactJS classes

class PlayerPanel extends React.Component {
    render() {

        return (
          <div id="player_container">
            <h1>THIS IS INSIDE THE PLAYER PANEL </h1>
          </div>
        );
    }
}

module.exports = PlayerPanel;