const { ipcRenderer } = require("electron");
const config = require("D:/Projects/tnyPlayer/config.js");
const Logger = require(config.htmlLoggerPath);
const MediaPlayer = require(config.buildPath + config.reactSourcePath + 'utils/MediaPlayer.js');
const getCellText = require(config.buildPath + config.jsSourcePath + "fileOperations/getFileAttribute.js");
const dbh = require(config.buildPath + config.jsSourcePath + "backend/dbHandler.js");

Logger.logDebug(__filename, "Started running TableEvents.js file");

const tableHeaders = config.tableOptions.tableHeaderTitles;

function createRow(fileObj) {

    // Create the row and return it        
    let row = document.createElement("tr");
    row.setAttribute("filePath", fileObj.path);

    // Iterate through the diff columns that need to make
    for (let i = 0; i < tableHeaders.length; i++) {
        // Create the elements
        cell = document.createElement("td");
        txt = document.createTextNode(getCellText(tableHeaders[i], fileObj));

        // Append the text to the cell, and the cell to the row
        cell.appendChild(txt);
        row.appendChild(cell);
    }

    // Add the eventHandler whenever the row is clicked:
    row.onclick = function (row) {
        return function () {
            Logger.log(Logger.levelNames.info, __filename, row.getAttribute("filePath"));
            MediaPlayer.run(row.getAttribute("filePath"));
        };
    }(row);

    return row;
}


// Given a list of files (from the data structure returned by readDirectory()), this function will
//  append all files into the table
function appendTable(event, data) {
    if (!data) {
        Logger.log(Logger.levelNames.info, __filename, "appendTable() was called with no data... ending function call")
        return;
    }
    Logger.log(Logger.levelNames.verbose, __filename, 'ipcRenderer signal received -> tableFile:appendItems');

    const tableBody = document.getElementById("tableBody");

    // Store the newly imported data:
    // dbh.addToImportHistory(data);

    // Logic to append to table
    if (tableBody) {

        // A loop to go through all discovered files:
        // (i starts at 1 since data[0] is not a file)
        let tempRow;
        let tempCols;
        for (let i = 1; i < data.length; i++) {
            tempRow = createRow(data[i]);
            tableBody.appendChild(tempRow);
        }

        Logger.log(Logger.levelNames.info, __filename, "Created rows for the recent files that were opened");

    } else {
        Logger.log(Logger.levelNames.error, __filename, "Could not get tableBody in appendTable()");
        alert("[mainPanel.js] Could not get tableBody in appendTable()");
    }

}

// This will erase everything out of the table
function clearTable(event) {
    Logger.log(Logger.levelNames.verbose, __filename, 'ipcRenderer signal received -> tableFile:clearItems');
    const tableBody = document.getElementById("tableBody");
    if (tableBody) {
        tableBody.innerHTML = "";
    } else {
        Logger.log(Logger.levelNames.error, __filename, "Could not get tableBody in clearTable()");
        alert("[mainPanel.js] Could not get tableBody in clearTable");
    }
}

// This will erase everything off the table and then populate it again
function clearAndLoadTable(event, data) {
    Logger.log(Logger.levelNames.debug, __filename, 'ipcRenderer signal received -> tableFile:clearAndLoadItems');
    clearTable(event);
    appendTable(event, data);

}

// TODO: remove the button
const clearButton = document.getElementById("submit:clearTable");
if (clearButton)
    clearButton.addEventListener("click", clearTable);

// Here, we want to catch the data that was sent to main.js after each new item is added
// Setting up all event handlers:
ipcRenderer.on("tableFile:appendItems", appendTable);
ipcRenderer.on("tableFile:clearItems", clearTable);
ipcRenderer.on("tableFile:clearAndLoadItems", clearAndLoadTable);




// Send signal that processing can start:
ipcRenderer.send('loadDone', "Done setting up everything");

function test() {
    console.log(tableBody);
}

module.exports = { appendTable, clearTable, clearAndLoadTable}