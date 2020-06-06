const fs = require('fs');

class Logger {

    // These two constructors call another function for code reuser
    /**
     * 
     * @param {*} options can put in a variable: flags: 'a' to append (pass in an empty object to ignore)
     * @param {*} logPath path of the regular log file
     * @param {*} logVerbosePath path of the verbose log file (more info will be logged there)
     */
    constructor(options, logPath, logVerbosePath) {
        this.options = options;

        // Check if both logPath and logVerbosePath are defined
        this.logPath = logPath;
        this.logVerbosePath = logVerbosePath;
        if (this.logPath == undefined) {
            this.logPath = "D:\\Projects\\Electron-MediaPlayer\\Logs\\log.txt";
        }
        if (this.logVerbosePath == undefined) {
            this.logVerbosePath = "D:\\Projects\\Electron-MediaPlayer\\Logs\\logVerbose.txt";
        }

        // Create the file streams
        if (this.options.flags == 'a') {
            this.logStream = fs.createWriteStream(this.logPath, { flags: 'a' });
            this.logVerboseStream = fs.createWriteStream(this.logVerbosePath, { flags: 'a' })
        } else {
            this.logStream = fs.createWriteStream(this.logPath);
            this.logVerboseStream = fs.createWriteStream(this.logVerbosePath)
        }

        this.log("Logger.js", "App started running");
        this.log("Logger.js", "Log files finished setting up");
    }


    // Function to log normally
    log(source, mess) {
        if (!this.options.useRegularConsole) {
            this.logStream.write(`[${this.getDateTime()}] [${source}]: ${mess}\n`);
            this.logVerbose(source, mess);
        } else 
            console.log(`[${this.getDateTime()}] [${source}]: ${mess}\n`);
    }

    // Function to log verbose
    logVerbose(source, mess) {
        if (!this.options.useRegularConsole) {
            this.logVerboseStream.write(`[${this.getDateTime()}] [${source}]: ${mess}\n`);
        } else
            console.log(`[${this.getDateTime()}] [${source}]: ${mess}\n`);
    }



    // Helper functions:
    getDateTime() {

        let date = new Date();

        let hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        let min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        let sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        let year = date.getFullYear();

        let month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        let day = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return month + ":" + day + ":" + year + " " + hour + ":" + min + ":" + sec;
    }
}

let logger = new Logger({ flags: 'a', useRegularConsole:true});

module.exports = { logger };