import React from "react";
import ReactDOM from "react-dom";

const config = require("D:/Projects/Electron-MediaPlayer/config.js");
const Logger = require(config.htmlLoggerPath);

// Imports for other custom tags and ReactJS classes
const MainPanel = require(config.buildPath + config.htmlSourcePath + "scripts/MainPanel.js");
const NavPanel = require(config.buildPath + config.htmlSourcePath + "scripts/NavPanel.js");
const PlayerPanel = require(config.buildPath + config.htmlSourcePath + "scripts/PlayerPanel.js");

class App extends React.Component {
  render() {
    Logger.logVerbose(__filename, "Rendering the <App/> tag");
    return (
      <div className="row">
        <NavPanel className="col s3 full_height" />
        <MainPanel className="col s9" />

        <div className="row">
          {/* <div className="col s3"></div> */}
          <PlayerPanel className="col s9" />
        </div>
      </div>
    );
  }
}

window.onload = () => {
  Logger.logVerbose(__filename, "Rendering <App/> tag and loading into index.html at #app-load-point");
  ReactDOM.render(<App />, document.getElementById("app-load-point"));
};
