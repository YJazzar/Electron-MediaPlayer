const { ipcRenderer } = require("electron");
const Logger = require('D:/Projects/Electron-MediaPlayer/src/com/tinyMnt/main/javascript/nodeScripts/logger/Logger.js');

const tableBody = document.getElementById("tableBody");

// "cols" contains the text of each column in the row
function createRow(cols, path) {
    // Create the row and return it        
    let row = document.createElement("tr");
    row.setAttribute("filePath", path);

    // Iterate through the diff columns that need to make
    for (let i = 0; i < cols.length; i ++) {
        // Create the elements
        cell = document.createElement("td");
        txt = document.createTextNode(cols[i]);

        // Append the text to the cell, and the cell to the row
        cell.appendChild(txt);
        row.appendChild(cell);
    }   

    // Add the eventHandler whenever the row is clicked:
    row.onclick = function(row) {
        return function() {
            Logger.log(Logger.levelNames.info, __dirname, row.getAttribute("filePath"));
        };
    }(row);

    return row;
}


// Given a list of files (from the data structure returned by readDirectory()), this function will
//  append all files into the table
function appendTable(event, data) {
    if(!data) {
        Logger.log(Logger.levelNames.info, __dirname, "appendTable() was called with no data... ending function call")
        return;
    }

    Logger.log(Logger.levelNames.verbose, __dirname, 'ipcRenderer signal received -> tableFile:appendItems');
    
    // Logic to append to table
    if (tableBody) {
        
        // A loop to go through all discovered files:
        // (i starts at 1 since data[0] is not a file)
        let tempRow;
        let tempCols;
        for (let i = 1; i < data.length; i ++) {
            tempCols = [data[i].name, data[i].formattedDate, data[i].name, data[i].size];
            tempRow = createRow(tempCols, data[i].path);
            tableBody.appendChild(tempRow);
        }

        Logger.log(Logger.levelNames.info, __dirname, "Created rows for the recent files that were opened");

    } else {
        Logger.log(Logger.levelNames.critical, __dirname, "Could not get tableBody in appendTable()");
        alert("[mainPanel.js] Could not get tableBody in appendTable()");
    }

}

// This will erase everything out of the table
function clearTable(event) {
    Logger.log(Logger.levelNames.verbose, __dirname, 'ipcRenderer signal received -> tableFile:clearItems');
    if (tableBody) {
        tableBody.innerHTML = "";
    } else {
        Logger.log(Logger.levelNames.critical, __dirname, "Could not get tableBody in clearTable()");
        alert("[mainPanel.js] Could not get tableBody in clearTable");
    }
}

// This will erase everything off the table and then populate it again
function clearAndLoadTable(event, data) {
    Logger.log(Logger.levelNames.critical, __dirname, 'ipcRenderer signal received -> tableFile:clearAndLoadItems');
    clearTable(event);
    appendTable(event, data);
    
}

// TODO: remove the button
const clearButton = document.getElementById("submit:clearTable");
clearButton.addEventListener("click", clearTable);

// Here, we want to catch the data that was sent to main.js after each new item is added
// Setting up all event handlers:
ipcRenderer.on("tableFile:appendItems", appendTable);
ipcRenderer.on("tableFile:clearItems", clearTable);
ipcRenderer.on("tableFile:clearAndLoadItems", clearAndLoadTable);

// Send signal that processing can start:
ipcRenderer.send('loadDone', "Done setting up everything");