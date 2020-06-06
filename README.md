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

```
npm run-script start
```


readDirectory.js:
    -[ ] Make it so that only audio files are returned (filter out non-audio files)
    -[ ] Maybe make an exception where a file can have a certain name (such as "youtubePLaylist.txt") where it can read url links and play them with react-player

New Application Requirements:
    -[ ] Have a button to add a youtube playlist (or individual video) to the player
        -[ ] the user might need to choose whether he wants to add the url link to a file, download the actual video, or any other action (that I might think of later).

Logger.js:
    -[x] Make it utilize the winston library from npm

        
To pick up: 
    continue playing with different libraries to see what can play audio.