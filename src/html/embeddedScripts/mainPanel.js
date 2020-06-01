const { ipcRenderer } = require("electron");
const { logger } = require('D:/Projects/Electron-MediaPlayer/src/javascript/Logger.js');

const tableBody = document.getElementById("tableBody");

// "cols" contains the text of each column in the row
function createRow(cols) {
    // Create the row and return it        
    let row = document.createElement("tr");

    // Iterate through the diff columns that need to make
    for (let i = 0; i < cols.length; i ++) {
        // Create the elements
        cell = document.createElement("td");
        txt = document.createTextNode(cols[i]);

        // Append the text to the cell, and the cell to the row
        cell.appendChild(txt);
        row.appendChild(cell);
    }   

    return row;
}


// Given a list of files (from the data structure returned by readDirectory()), this function will
//  append all files into the table
function appendTable(event, data) {
    if(!data) {
        logger.log("mainPanel.js", "appendTable() was called with no data... ending function call")
        return;
    }

    logger.logVerbose('mainPanel.js', 'ipcRenderer signal received -> tableFile:appendItems');
    
    // Logic to append to table
    if (tableBody) {
        
        // A loop to go through all discovered files:
        // (i starts at 1 since data[0] is not a file)
        let tempRow;
        let tempCols;
        for (let i = 1; i < data.length; i ++) {
            tempCols = [data[i].name, data[i].formattedDate, data[i].name, data[i].size];
            tempRow = createRow(tempCols);
            tableBody.appendChild(tempRow);
        }
        

    } else {
        alert("[mainPanel.js] Could not get tableBody in appendTable()");
    }

}

// This will erase everything out of the table
function clearTable(event) {
    logger.logVerbose('mainPanel.js', 'ipcRenderer signal received -> tableFile:clearItems');
    if (tableBody) {
        tableBody.innerHTML = "";
    } else {
        alert("[mainPanel.js] Could not get tableBody in clearTable");
    }
}

// This will erase everything off the table and then populate it again
function clearAndLoadTable(event, data) {
    logger.logVerbose('mainPanel.js', 'ipcRenderer signal received -> tableFile:clearAndLoadItems');
    clearTable(event);
    appendTable(event, data);
    
}

const clearButton = document.getElementById("submit:clearTable");
clearButton.addEventListener("click", clearTable);

// Here, we want to catch the data that was sent to main.js after each new item is added
// Setting up all event handlers:
ipcRenderer.on("tableFile:appendItems", appendTable);
ipcRenderer.on("tableFile:clearItems", clearTable);
ipcRenderer.on("tableFile:clearAndLoadItems", clearAndLoadTable);

// Send signal that processing can start:
ipcRenderer.send('loadDone', "Done setting up everything");