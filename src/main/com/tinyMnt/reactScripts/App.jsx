import React from "react";
import ReactDOM from "react-dom";
const config = require("D:/Projects/tnyPlayer/config.js");

const Logger = require(config.htmlLoggerPath);
const dbh = require(config.buildPath + config.jsSourcePath + 'backend/dbHandler.js');


// Imports for other custom tags and ReactJS classes
// Use *.js instead of jsx because that will be their file extension once its compiled
const MainPanel = require(config.buildPath + config.reactSourcePath + "mainPanel/MainPanel.js");
const NavPanel = require(config.buildPath + config.reactSourcePath + "navPanel/NavPanel.js");
const PlayerPanel = require(config.buildPath + config.reactSourcePath + "playerPanel/PlayerPanel.js");


class App extends React.Component {

  componentDidMount() {
    
  }  

  render() {
    Logger.logVerbose(__filename, "Rendering the <App/> tag");
    return (
      <div className=" ">
        <NavPanel className=" " />
        <MainPanel className=" " />
        <PlayerPanel className="player-panel" />
      </div>
    );
  }
}

// Will run when the electron browser is done initializing
window.onload = () => {
  Logger.logInfo(__filename, "Creating the database instance");
  dbh.createDatabase();

  Logger.logVerbose(__filename, "Rendering <App/> tag and loading into index.html at #app-load-point");
  ReactDOM.render(<App />, document.getElementById("app-load-point"));
};
