const { Stack } = require('./Stack.js');


// This class will store all important information:
//  1. The history of files played
//  2. All folders that have been imported
//  3. All constructed playlists
class Database {
    // Initialize all database objects
    constructor() {
        this.playHistory = new Stack();

    }
}

let db = new Database();