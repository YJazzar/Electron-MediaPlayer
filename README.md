# Electron-MediaPlayer

To run the program, setup the package.json file's "start" script. The configurations possible are as follow:

flag: level
values possible:
- "error"
- "critical"
- "info"
- "debug"
- "verbose"

examples: 

    "start": "electron . level error"

    "start": "electron . level critical"

    "start": "electron . level info"

    "start": "electron . level debug"


Then, run this script to start the program: 
...
npm run-script start    
...