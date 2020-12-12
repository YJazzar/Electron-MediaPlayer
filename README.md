# tnyPlayer - A tiny media player

## Installation:

1. Clone the repository
2. Inside the project's root folder, run: `yarn install`
3. To run the application: `yarn start`

Note for readers:

-   Application entry point (for the renderer process): `/app/index.tsx`

-   Application entry point (for the main process): `/app/main.dev.ts`

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
-   `tableOptions: object` Can set the default options for the table view in the main panel
    -   `tableHeaderTitles: string[]` Can set the table headers
        -   Ex: `tableHeaderTitles: ["Name", "Length", "Type", "Size", "Date Modified"]`
-   `fileExtensions: string[]` Sets the types of files the application should search for
    -   Ex: `fileExtensions: ["mp3", "mp4", "mkv"]`

<br>

# File structure in the 'Music' home directory:

-   `tnyPlayer` (parent folder):
    -   `data`: folder
        -   `index.json`: stores a list of all current media files
        -   Contains all of the media files processed in the `index.json` file
    -   `log`: folder
        -   Contains log files for each run
    -   `config.json`: Configuration file
    -   `history.json`: To be used later
    -   `index.json`: Will store information such as playlists, and other meta-data needed for the navigation panel

# TODO:

-   Implement a verification function inside of DirectoryOperations to make sure data/index.json and index.json are not corrupted
-   make sure to copy all media files into the /data/ folder
-   In file details, add an option `isSymbolicLink` to prevent from copying the media file to the /data/ directory

-   Perform further testing for cross-platform support with ffprobe's integration
    -   Update ffprobe-static binary filepaths when running 'yarn start'
-   Perform further testing for application self-repairing config folders when deleted
-   Create a custom context menu in which the user has the following operations:
    -   add to queue
    -   clear view

<br/>
