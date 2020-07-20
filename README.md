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

-   separate style sheets for different themes (light and dark themes)
-   find a way to dynamically change the style sheet or styles added to each element without needing a refresh

*   use the chalk package to make interesting changes

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
