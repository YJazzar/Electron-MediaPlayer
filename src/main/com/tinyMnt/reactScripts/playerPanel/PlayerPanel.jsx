import React from "react";

const config = require("D:/Projects/tnyPlayer/config.js");
const Logger = require(config.htmlLoggerPath);

// Imports for other custom tags and ReactJS classes
import(config.buildPath + config.cssSourcePath + "navPanel.css");

class PlayerPanel extends React.Component {
  render() {
    return (
      <div id="player_container">
        <div id="player-location"></div>
        <h1>THIS IS INSIDE THE PLAYER PANEL </h1>
      </div>
    );
  }
}

module.exports = PlayerPanel;
