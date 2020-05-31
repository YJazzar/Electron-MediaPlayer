// A test file to experiment with: 
//  How to read a directory and get information on what files 
//   exist inside it (and extract helpful information from each file)
var fs = require('fs');


// Call the function with a string representing the path of the directory in question
// For safe usage, call with the full path. 
async function readDirectory(path, emitter) {
    let result = [];
    // let items = undefined;

    // Look at this website for more explanation (bottom of the page): 
    //      https://code-maven.com/list-content-of-directory-with-nodejs
    // Here, 'items' is a string array holding the names of the files (of the given directory)
    let items = await readdir(path);

    // For each file, call the function fs.stat() to get more information about it
    for (var i = 0; i < items.length; i++) {
        let file = path + '/' + items[i];

        // After the file path was found, we query for more information and display it
        // The query happens through the Promise made by the local stat() function
        // The resolved value is simply the object constructed with useful information
        // The "await" is placed there to make sure the "result" array contains all needed information 
        //   before the for-loop continues to the next iteration.
        await stat(file).then(data => {
            result.push(data);
        }).catch(err => {
            console.log(err);
        });
        console.log("result is now length: " + result.length);
    }


    console.log("Successfully read the directory: " + path)
    // console.log(result);

    // Since you cannot return, we send the data back through an emit.
    emitter.emit('readDirectory', result);
}

// Makes a promise from fs.readdir() function call
function readdir(path) {
    // Return a promise that runs the external call
    return new Promise((resolve, reject) => {
        fs.readdir(path, async function (err, items) {
            if (err)
                reject(err);

            // Return the list of items
            resolve(items);
        });
    });
}

// Makes a promise from the fs.stat() function call
async function stat(file) {
    // Return a promise that runs the system call
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stat) => {
            if (err) {
                reject(err);
            }

            // Return a resolve value with all of the information extracted
            resolve(getFileData(file, stat));
        });
    });
}

// Extracts usefule information from the "stats" object
// More info on the fs.stats object can be found at: https://nodejs.org/api/fs.html#fs_class_fs_stats 
function getFileData(file, stats) {
    let obj = {};
    obj.path = file;

    // The next section will convert time from UNIX EPOCH (which is returned by stats.mtimeMs) into something readable
    // The Date() object (for future reference if needed)
    obj.date = new Date(stats.mtimeMs);

    // Get the subinformation needed to construct HH:MM:SS
    obj.hours = obj.date.getHours();
    obj.minutes = "0" + obj.date.getMinutes();
    obj.seconds = "0" + obj.date.getSeconds();

    // Get the subinformation needed to construct MM/DD/YYYY
    obj.month = obj.date.getMonth() + 1;
    obj.day = obj.date.getDate();
    obj.year = obj.date.getFullYear();

    // Will display time in HH:MM:SS format
    obj.formattedTime = () => {
        return (this.hours + ':' + this.minutes.substr(-2) + ':' + this.seconds.substr(-2));
    }
    // Will display date in MM/DD/YYYY
    obj.formattedDate = () => {
        return (this.month + '/' + this.day + '/' + this.year);
    }

    // Return the object so it can be resolved by the calling promise
    return obj;
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

/****   An example on how to use the readDirectory() function call:
 * First, you must must create an EventEmitter object and set up an emit
 *      event with the name 'readDirectory'.
 * Next, you must call the function with the folder path you wish to read (as the first 
 *      parameter provided), and pass in the emitter that was created (as the second paramater).
 */
// let em = new events.EventEmitter();
// em.on('readDirectory', (data) => {
//     console.log('recieved emit');
//     console.log(data);
// });
// readDirectory('./', em);

module.exports = { readDirectory };