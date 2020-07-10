# tnyPlayer - Status: migrating to use webpack



## Dependecies used to create app:
- electron:
    - ```npm install --save-dev electron```
- Typescript compiler:
    - ```npm install --save-dev typescript```
- Webpack: 
    - ```npm install --save-dev webpack webpack-cli ts-loader```
    - ```npm install --save-dev html-webpack-plugin```
- React:
    - ```npm install --save-dev react react-dom @types/react @types/react-dom```
- Mocka: 
    - ```npm install --save-dev mocha chai```
    - ```npm install --save-dev ts-node```    
    - ```npm install --save-dev @types/chai @types/mocha```


  
- winston: A logging library
  - https://www.npmjs.com/package/winston
- react-player: For playing audio/video files
  - https://www.npmjs.com/package/react-player
- Babel: To transpile JSX to JS. Commands used:
  - ```npm i @babel/core --save-dev```
  - ```npm i @babel/preset-env @babel/preset-react --save-dev```
  - ```@babel/plugin-syntax-class-properties```
- Gulp: The build tool of choice. Commands used:
  - ```npm i gulp gulp-babel --save-dev```
  - ```npm i gulp-concat gulp-clean-css```
  - ```npm install --save-dev gulp-clean```
- react and react-dom command:
  - ```npm i react react-dom --save-dev```
- get-video-duration: 
  - https://www.npmjs.com/package/get-video-duration


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

