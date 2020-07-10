import React from "react";
const config = require("D:/Projects/tnyPlayer/config.js");

// Import other files needed
const Logger = require(config.htmlLoggerPath);
// const TableEvents = require(config.buildPath + config.reactSourcePath + "mainPanel/TableEvents.js");


class Table extends React.Component {
  componentDidMount() {
    Logger.logVerbose(__filename, "Done mounting table onto webpage");
    Logger.logVerbose(
      __filename,
      "Adding TableEvents.js for its event listeners"
    );

    // Call TableEvents.js
    // const te = require(config.buildPath +
    //   config.reactSourcePath +
    //   "mainPanel/TableEvents.js");


  }

  render() {
    return (
      // <div className="centered">
      <div className=" ">
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
  getCamelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }

  getHeaders() {
    let th = [];
    const headerTitles = config.tableOptions.tableHeaderTitles;

    let title = "";
    let key = "";
    for (let i = 0; i < headerTitles.length; i++) {
      title = headerTitles[i];
      key = this.getCamelCase(title);

      th.push(<th key={key} data-field={key}>{title}</th>);
    }

    return th;
  }

  render() {
    return (
      <thead>
        <tr>
          {this.getHeaders()}
        </tr>
      </thead>
    );
  }
}

class TableBody extends React.Component {

  componentDidMount() {

  }

  render() {
    return <tbody id="tableBody"></tbody>;
  }
}

module.exports = Table;
