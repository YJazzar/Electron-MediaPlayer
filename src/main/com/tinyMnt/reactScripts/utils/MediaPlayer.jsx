import React from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
const config = require("D:/Projects/tnyPlayer/config.js");

const Logger = require(config.htmlLoggerPath);


class ResponsivePlayer extends React.Component {
  render() {
    Logger.logVerbose(__filename, "Now playing: " + this.props.filePath);
    
    return (
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          // url="C:/Users/sfjzz/Videos/2020-05-26 13-17-56.mkv" test file
          url={this.props.filePath}
          // width="100%"
          // height="100%"
          playing={true}
          controls={true}
          volume={0.5}
        />
      </div>
    );
  }
}

function run(filePath) {
  Logger.logDebug(__filename, "Rendering MediaPlayer at id=render-here. filePath=" + filePath);
  ReactDOM.render(
    <ResponsivePlayer filePath={filePath}/>,
    document.getElementById("player-location")
  );
}

module.exports = { run };

