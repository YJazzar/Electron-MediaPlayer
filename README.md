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
