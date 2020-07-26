# tnyPlayer - Status: migrating to use webpack

entry for render:
/app/index.tsx

entry for main:
/app/main.dev.ts

## Tutorial for making electron notifications:

-   https://stackoverflow.com/questions/42851198/how-can-i-send-a-notification-in-electron

## Running the program

examples:

# TODO:

-   find a way to dynamically change the style sheet or styles added to each element without needing a refresh
-   Create a custom context menu in which the user has the following operations:
    -   add to queue
    -   clear view
    -

*   use the chalk package to make interesting changes

Possible features: - Have users create and define their own themes

<br/>

# Config file options:

-   `theme: string` to set the theme of the application
    -   Possible values:
        -   `'dark'` (default)
        -   `'light'`
-   `applicationWindow: object` an object to set default application behavior:
    -   `width: number`: The width of the main window spawned in pixels (Ex: `1420`)
    -   `height: number`: The height of the main window spawned in pixels (Ex: `800`)
    -   `navPanelWidth: number`: The default width of the navigation pane set as a percent of the screen's width (Ex: `0.2` for `20%` of the screen's width)
    -   `playerControlsHeight: number`: The default height of the navigation pane set as a percent of the screen's height (Ex: `0.15` for `15%` of the screen's height)
-   `logger: object` defines logger behavior:
    -   `minLogLevel: string (default = "debug")` defines what logging level to use (anything below that level will be ignored). Logging levels are in the following order:
        -   `"error"`
        -   `"warning"`
        -   `"database"`
        -   `"info"`
        -   `"debug"`
    -   `fileOutput: boolean`:
        -   use `true` to save the logs to a file, `false` otherwise.
