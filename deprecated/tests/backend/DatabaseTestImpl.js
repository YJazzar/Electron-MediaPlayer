var http = require('http');
const config = require("D:/Projects/tnyPlayer/config.js");
const Database = require(config.buildPath + config.jsSourcePath + 'backend/Database.js');
const Logger = require(config.loggerPath);

// Running the fake stall command
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('database is still running/nPlease do some db stuff');
    res.end();
}).listen(8080);

// Will call as if an api here
Logger.logInfo(__filename, "Started database testing");

const testData = "D:/Projects/tnyPlayer/src/main/tests/backend/testData.json";
const testData1 = "D:/Projects/tnyPlayer/src/main/tests/backend/testData1.json";
const testData2 = "D:/Projects/tnyPlayer/src/main/tests/backend/testData2.json";
const testData3 = "D:/Projects/tnyPlayer/src/main/tests/backend/testData3.json";

let db = new Database({
    dir: [testData, testData1, testData2, testData3],
    alias: ["test", "test1", "test2", "test3"],
    refreshTime: 10 * 1000
});

// Logger.logDebug(__filename, "test1.buildPath = " + db.get("test1").getValue("buildPath"));

// setTimeout(function () { db.get("test1").setKey("buildPath", "Changing value"); }.bind(this), 5000);

// db.forceRefresh();
// db.closeFile("test");

db.closeAllFiles();