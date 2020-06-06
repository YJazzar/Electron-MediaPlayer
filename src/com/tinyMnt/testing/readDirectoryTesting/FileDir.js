// A test file to experiment with: 
//  How to read a directory and get information on what files 
//   exist inside it (and extract helpful information from each file)

console.log("isFile() : isDir() : fileName");

var fs = require('fs');
var events = require('events');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

var path = process.argv[2];

// Look at this website for more explanation (bottom of the page): 
//      https://code-maven.com/list-content-of-directory-with-nodejs
fs.readdir(path, function (err, items) {
    // Here, 'items' is a string array holding the names of the files (of the given directory)
    let result = [];
    result.push();

    let counter = 0;
    var em = new events.EventEmitter();
    em.on('fileFound', function(data) {
        result.push(data);
        counter++;
        console.log('A file was added : counter = ' + counter);
    }); 

    // For each file, call the function fs.stat() to get more information about it
    for (var i = 0; i < items.length; i++) {
        let file = path + '/' + items[i];

        // After the file path was found, we query for more information and display it
        fs.stat(file, getFileData(file, em));
    }
    while (items.length - counter > 0) {}
    console.log(result);
});


function getFileData(file, em) {
    return function (err, stats) {
        let obj = {};
        obj.path = file;

        // Convert time from UNIX EPOCH into something readable
        obj.date = new Date(stats.mtimeMs);
        obj.hours = obj.date.getHours() % 12;
        obj.minutes = "0" + obj.date.getMinutes();
        obj.seconds = "0" + obj.date.getSeconds();
        obj.month = obj.date.getMonth() + 1;
        obj.day = obj.date.getDate();
        obj.year = obj.date.getFullYear();

        // Will display time in 10:30:23 format
        obj.formattedTime = () => {
            return (this.hours + ':' + this.minutes.substr(-2) + ':' + this.seconds.substr(-2));
        }
        // Will display date in MM/DD/YYYY
        obj.formattedDate = () => {
            return (this.month + '/' + this.day + '/' + this.year);
        }
        // console.log(obj);
        // result.push(obj);
        em.emit('fileFound', obj);
    }
}

// Converts bytes to the most appropriate size indicator
//      Source: https://coderrocketfuel.com/article/how-to-convert-bytes-to-kb-mb-gb-or-tb-format-in-node-js 
const convertBytes = function (bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

    if (bytes == 0) {
        return "n/a"
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

    if (i == 0) {
        return bytes + " " + sizes[i]
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}