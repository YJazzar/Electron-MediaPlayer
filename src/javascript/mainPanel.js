const { ipcRenderer } = require("electron");

const tableBody = document.getElementById("tableBody");

// "cols" contains the text of each column in the row
function createRow(cols) {
    // Create the row and return it        
    let row = document.createElement("tr");

    // Iterate through the diff columns that need to make
    for (let i = 0; i < cols.length; i ++) {
        // Create the elements
        cell = document.createElement("td");
        txt = document.createTextNode("TEXTTTTTT");

        // Append the text to the cell, and the cell to the row
        cell.appendChild(txt);
        row.appendChild(cell);
    }   

    return row;
    
}

function changeTable() {

    let t = tableBody;
    if (tableBody !== null) {

        console.log(tableBody);

        var row = document.createElement("tr");
        var cell = document.createElement("td");
        var txt = document.createTextNode("TEXTTTTTT");
        cell.appendChild(txt);
        row.appendChild(cell);
        tableBody.appendChild(row);
        alert('Changed table');
    }
    else
        alert(false);
}

// TODO: make diff types of events.
//      one to append to table from file stats obj
//      one to delete all entries from the table
//      one to delete and replace from the table

function appendTable(event, data) {
    console.log('inside of ipcRenderer tableFile:appendItems');
    
    // Logic to append to table
    if (tableBody) {

    } else {
        alert("Could not get tableBody in mainPanel.js");
    }

}

function clearTable(event, data) {
    console.log('inside of ipcRenderer tableFile:clearItems');
    
}

function clearAndLoadTable(event, data) {
    console.log('inside of ipcRenderer tableFile:clearAndLoadItems');
    
}

// Here, we want to catch the data that was sent to main.js after each new item is added
ipcRenderer.on("tableFile:appendItems", appendTable);
ipcRenderer.on("tableFile:clearItems", clearTable);
ipcRenderer.on("tableFile:clearAndLoadItems", clearAndLoadTable);

ipcRenderer.send('loadDone', "Done setting up everything");