# tnyPlayer - Status: migrating to use webpack

entry for render:
/app/index.tsx

enrty for main:
/app/main.dev.ts

## Tutorial for making electron notifications:

-   https://stackoverflow.com/questions/42851198/how-can-i-send-a-notification-in-electron

## Running the program

examples:

# TODO:

-   use the chalk package to make interesting changes

*   When i come back:

    -   TEST THE CURRENT WINDOW BOUNDS:
        -   Add a dummy table in the main contents panel (main panel) and see if it can correctly resize on its own


    -   clean the old code that was using the re-resize library (the panel configs, their impls, and clean up state variables for the vertical resizer)

<br/>

# Config file options:

-   `theme` to set the theme of the application
    -   `dark` (default)
    -   `light`
-   `applicationWindow` an object to set default application behavior:
    -   `width`: The width of the main window spawned in pixels (Ex: `1420`)
    -   `height`: The height of the main window spawned in pixels (Ex: `800`)
    -   `navPanelWidth`: The default width of the navigation pane set as a percent of the screen's width (Ex: `0.2` for `20%` of the screen's width)
    -   `playerControlsHeight`: The default height of the navigation pane set as a percent of the screen's height (Ex: `0.15` for `15%` of the screen's height)
