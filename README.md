# Electron-MediaPlayer

## Dependecies used to create app:
- electron: For main application window and backend interface\
  - npmjs.com/package/electron
- winston: A logging library
  - https://www.npmjs.com/package/winston
- react-player: For playing audio/video files
  - https://www.npmjs.com/package/react-player
- Babel: To transpile JSX to JS. Commands used:
  - ```npm i @babel/core --save-dev```
  - ```npm i @babel/preset-env @babel/preset-react --save-dev```
- Gulp: The build tool of choice. Commands used:
  - ```npm i gulp gulp-babel --save-dev```
  - ```npm i gulp-concat gulp-clean-css```
  - ```npm install --save-dev gulp-clean```
- react and react-dom command:
  - ```npm i react react-dom --save-dev```


## Tutorial for application basic setup: 
- https://medium.com/@michael.m/creating-an-electron-and-react-template-5173d086549a

## Tutorial for making electron notifications: 
- https://stackoverflow.com/questions/42851198/how-can-i-send-a-notification-in-electron


## Running the program

To run the program, setup the package.json file's "start" script. The configurations possible are as follow:

flag: level
values possible:

- "error"
- "critical"
- "info"
- "debug"
- "verbose" 

examples:

```
"start": "electron . level error"

"start": "electron . level critical"

"start": "electron . level info"

"start": "electron . level debug"
```

Then, run this script to start the program:



# Backlog:

#### readDirectory.js:
- [ ] Make it so that only audio files are returned (filter out non-audio files)
- [ ] Maybe make an exception where a file can have a certain name (such as "YouTubePlaylist.txt") where it can read url links and play them with react-player


#### New Application Requirements:
- [ ] Have a button to add a YouTube playlist (or individual video) to the player
  - [ ] the user might need to choose whether he wants to add the url link to a file, download the actual video, or any other action (that I might think of later).



# Daily log:
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

