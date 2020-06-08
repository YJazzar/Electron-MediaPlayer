# Electron-MediaPlayer

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


# Currently working on: 
- Getting babel, gulp, and react setup in a bioler plate project. 
- Create a separate branch to add these tools named: dev/react
- Use this website for more directions:
  - https://medium.com/@michael.m/creating-an-electron-and-react-template-5173d086549a
- Use this website to make sure the gulp file written in made using the new standards set in: 
  - https://gulpjs.com/docs/en/getting-started/creating-tasks


# On Hold:
## Agenda

### Previous day:

- [x] Played around with the logger files. Changed a lot of the backend structure in the logger file and made it much more robust. 
- [x] Now logging supports having different levels of logging which will increase readability whenever logging. 
- [x] Added program functionality to log with a level set by the user (through the command line, as seen in the package.json scripts) 


### Up next:

- [x] Refactor code that used the old code (implement the logger made yesterday). 
  - [x] Not many changes needed for requires, as the logging file ("Logger.js") remains with the same name. Only need to change how the logging functions are called/
- [ ] Find a good library that can work well with playing audio/video files (already started using youtube-dl to download video files)
- [ ] Learn react to leverage the react-player library 



## Backlog:

#### readDirectory.js:
- [ ] Make it so that only audio files are returned (filter out non-audio files)
- [ ] Maybe make an exception where a file can have a certain name (such as "youtubePLaylist.txt") where it can read url links and play them with react-player


#### New Application Requirements:
- [ ] Have a button to add a youtube playlist (or individual video) to the player
  -[ ] the user might need to choose whether he wants to add the url link to a file, download the actual video, or any other action (that I might think of later).


#### Logger.js:
- [x] Make it utilize the winston library from npm