# tnyPlayer - A tiny media player (under construction)

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

<br>

# TODO:

-   Perform further testing for cross-platform support with ffprobe's integration
    -   Update ffprobe-static binary filepaths when running 'yarn start'
-   Perform further testing for application self-repairing config folders when deleted
-   Create a custom context menu in which the user has the following operations:
    -   add to queue
    -   clear view
-   Implement a React Table
    Possible features: - Have users create and define their own themes

<br/>
