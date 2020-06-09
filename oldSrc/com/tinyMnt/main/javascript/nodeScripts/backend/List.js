const Logger = require('D:/Projects/Electron-MediaPlayer/src/com/tinyMnt/main/javascript/nodeScripts/logger/Logger.js');

// TODO: add a save feature
// TODO: make it store to file
class List {

    /**
     * @param {
     *      maxSize: <int>, 
     *      type: <type>        // type can be any of the following: "Stack", "Queue" 
     *      <possible options to later implement: loadFromFile>
     * } options 
     */
    // Functions will by defualt function as a stack if options were not passed in
    constructor(options) {
        this.options = options;

        this.arr = [];
    }

    // The class will always have new elements added to the end of the array
    push(value) {
        // Cannot have a maxSize if it is not of type "Stack"
        if (this.type == "Stack" && this.length() >= this.options.maxSize) {
            this.pop();
        } 
        // Push new element
        this.arr.push(value);
        
    }

    pop() {
        if (this.options.type == undefined || this.options.type == "Stack") {
            return this.arr.pop();

        } else if (this.options.type == "Queue") {
            return this.arr.shift();
        }
    }

    peek() {
        if (this.options.type == undefined || this.options.type == "Stack") {
            return this.arr[this.arr.length - 1];

        } else if (this.options.type == "Queue") {
            return this.arr[0];
        }
    }

    get(index) {
        return this.arr[index];
    }

    // Cannot use to add an index
    set(index, value) {
        if (index < this.length()) {
            this.arr[index] = value;
        } else {
            Logger.logInfo(__filename, "Invalid index passed at: set(int)");
        }
    }

    length() {
        return this.arr.length;
    }

    isEmpty() {
        if (this.arr.length == 0)
            return true;

        return false;
    }

    toString() {
        
        console.log(this.arr);
    }

    getOptions() {
        return this.options;
    }

    getArr() {
        return this.arr;
    }
}

// Code to test the class:
// s = new List({ maxStackSize: 4, type: "Queue"});

// for (let i = 0; i < 10; i ++) {
//     s.push(i);
//     s.toString();
// }

// s.pop();
// s.toString();


module.exports = { List };