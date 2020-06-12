import React from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
const config = require("D:/Projects/Electron-MediaPlayer/config.js");

const Logger = require(config.htmlLoggerPath);

class MediaPlayer extends React.Component {
  render() {
    Logger.logVerbose(__filename, "Inside MediaPlayer rendererr");
    return (
      <div>
        <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" playing={true} controls={true} volume={0.5}/>
        <h1>TESTT</h1>
      </div>
    );
  }
}

class ResponsivePlayer extends React.Component {
  render() {
    return (
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          width="100%"
          height="100%"
        />
      </div>
    );
  }
}

function run() {
  Logger.logVerbose(__filename, "Starting MediaPlayer.run()");


  Logger.logVerbose(__filename, "Rendering MediaPlayer at id=render-here");
  ReactDOM.render(<ResponsivePlayer />, document.getElementById("PUTHERE"));
}

module.exports = { run };

