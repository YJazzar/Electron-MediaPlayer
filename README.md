# tnyPlayer - Status: migrating to use webpack

entry for render:
/app/index.tsx

enrty for main:
/app/main.dev.ts

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
