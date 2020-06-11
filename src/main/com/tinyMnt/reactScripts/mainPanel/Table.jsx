import React from "react";
const config = require("D:/Projects/Electron-MediaPlayer/config.js");

// Import other files needed
const Logger = require(config.htmlLoggerPath);

class Table extends React.Component {
  componentDidMount() {
    Logger.logVerbose(__filename, "Done mounting table onto webpage");
    Logger.logVerbose(
      __filename,
      "Adding TableEvents.js for its event listeners"
    );

    // Call TableEvents.js
    require(config.buildPath +
      config.reactSourcePath +
      "mainPanel/TableEvents.js");
  }

  render() {
    return (
      // <div className="centered">
      <div>
        <table
          id="mainTable"
          className="col s12 centered striped responsive-table"
        >
          <TableHead />
          <TableBody />
        </table>
      </div>

      // </div>
    );
  }
}

class TableHead extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          <th data-field="name">Name</th>
          <th data-field="dateModified">Date Modified</th>
          <th data-field="type">Type</th>
          <th data-field="size">Size</th>
        </tr>
      </thead>
    );
  }
}

class TableBody extends React.Component {
  render() {
    return <tbody id="tableBody"></tbody>;
  }
}

module.exports = Table;
