const { ipcRenderer } = require("electron");



let tableBody = document.getElementById("tableBody");
let t = tableBody;
if (tableBody !== null) {
    console.log(tableBody);

    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var txt = document.createTextNode("TEXTTTTTT");
    cell.appendChild(txt);
    row.appendChild(cell);
    tableBody.appendChild(row);
}
else
    alert(false);

// TODO: make diff types of events. one to append to table from file stats obj
//      one to delete all entries from the table
//      one to delete and replace from the table

function tt(){
    ipcRenderer.send('test');
}
// Here, we want to catch the data that was sent to main.js after each new item is added
ipcRenderer.on("tableFile:addItems", function (event, item) {
    alert(" :: " + item);
});