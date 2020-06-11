import React from "react";
import ReactDOM from "react-dom";
const config = require("D:/Projects/Electron-MediaPlayer/config.js");

const Logger = require(config.htmlLoggerPath);

// Imports for other custom tags and ReactJS classes
// Use *.js instead of jsx because that will be their file extension once its compiled
const MainPanel = require(config.buildPath + config.reactSourcePath + "mainPanel/MainPanel.js");
const NavPanel = require(config.buildPath + config.reactSourcePath + "navPanel/NavPanel.js");
const PlayerPanel = require(config.buildPath + config.reactSourcePath + "playerPanel/PlayerPanel.js");

class App extends React.Component {

  render() {
    Logger.logVerbose(__filename, "Rendering the <App/> tag");
    return (
      <div className="row">
        <NavPanel className="col s3" />
        <MainPanel className="col s9" />

        <div className="row">
          <PlayerPanel/>
        </div>
        
      </div>
    );
  }
}

window.onload = () => {
  Logger.logVerbose(__filename, "Rendering <App/> tag and loading into index.html at #app-load-point");
  ReactDOM.render(<App />, document.getElementById("app-load-point"));
};
