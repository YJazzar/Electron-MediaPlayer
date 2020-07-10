
### 6/10/2020 :: S001
- Created trello board and placed in first few stories
- 

### 6/6/2020
- Started moving the project to use webpack

### 5/14/2020
- Fixed some issues with passing data from readDirectory() to TableEvents functions.
- Minor logging formatting changes (looks more uniform now).

### 5/13/2020
- Created a minimal "Database" (not really a database) for managing some of the files that need to be written
- Created a test implementation in the ```src/test``` folder.
- Can run the test with the npm script: ```npm run testDb```. 
- Started making the database track the imports performed.
- Changed the flow of data when reading a directory (readDirectory() should be called from dbHandler.js)
- Changed the flow of when a folder is opened.

### 5/12/2020:
- Made the player controls panel (at the bottom of the screen) extend through then entire width of the application.
- Rename the temporary div for MediaPlayer (that is under PlayerPanel.jsx).
- Rename MediaPlayer.jsx to ResponsivePlayer.jsx (or any other suitable name).
- Refactored readDirectory() so that unrelated functions are split into their own files
- Applied a filtering function when importing folders. The different file extensions that are allowed are stored in the config file
- Changed table headers so that they become dynamically selected. To change the ordering and which columns to present, changes only need to happen in the config file.
- Added functionality to read the duration of a file.
- Renamed project from Electron-MediaPlayer to tnyPlayer
- Made all table headers to have equal width 
- 
### 5/11/2020:
- Added the first successful React-Player tag.
- Now the player can functionally play any media file (tested on .mp3 and .mp4 so far)
- Still needs work on styling the actual window the video/audio is displayed

### 5/10/2020:
- Added the class TableEvents.js. 
- Setup the basic actions to full up the table from the readDirectory() response
- Changed css styling
- Changed some import file paths to become easier for future changes
- Converted the old html index.html into a new react-based structure (new file: App.jsx)
- Added an HTML logger wrapper to allow the web-pages portion of the application to log to console

### 5/9/2020:
- Experimented with readDirectory() and promptFiles() to try and convert them from async functions to regular ones.
- Ended up with disallowing babel from transpiling .js code, and only transpile react files (.jsx)
- Added more elements within the config file and started changing imports according to the config.

### 5/8/2020:
- Changed the file structure of the code from the ground up to allow adding react into the program.
- Added Babel, ReactJS, and Gulp as dependencies. 
- Set up the new tools installed to make a build environment. An explanation of how the building process works: 
  - First Gulp will copy all files and folders under "/src/" into a buildPath set inside "config.js"
  - Gulp feeds all js files into babel and transpiles them from ReactJS into vanilla JS
  - Finally, electron can be called and runs the program. 
- Set up a config.js file to make configuration easier
- ***Things to do:*** 
  - Need to completely integrate the config.js 
  - Migrate items from the backlog existing in the README.md into a github board/trello/any other alternative
  - Make imports look better with new syntax and/or removing useless curly braces 


### 5/7/2020:
- Learned react and research how to integrate it with electron
- ***Things to do:*** 
  - change the code base structure to allow react to become part of the project

### 5/6/2020:
- Played around with the logger files. Changed a lot of the backend structure in the logger file and made it much more robust. 
- Now logging supports having different levels of logging which will increase readability whenever logging. 
- Added program functionality to log with a level set by the user (through the command line, as seen in the package.json scripts) 

