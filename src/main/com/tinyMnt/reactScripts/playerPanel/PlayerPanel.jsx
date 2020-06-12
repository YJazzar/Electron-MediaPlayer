import React from "react";

const config = require("D:/Projects/Electron-MediaPlayer/config.js");
const Logger = require(config.htmlLoggerPath);

// Imports for other custom tags and ReactJS classes
import (config.buildPath + config.cssSourcePath + "navPanel.css");

class PlayerPanel extends React.Component {
    render() {

        return (
          <div id="player_container">
            <span>
              <div id="temp-react-player-loc"></div>
              <h1>THIS IS INSIDE THE PLAYER PANEL </h1>
            </span>
          </div>
        );
    }
}

module.exports = PlayerPanel;