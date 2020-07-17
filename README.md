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

# Bugs:

-   When resizing the window to become larger, the right resizable div sometimes gains a big border that would only go away if resized again.

*   When i come back:

    -   TEST THE CURRENT WINDOW BOUNDS:
        -   Add a dummy table in the main contents panel (main panel) and see if it can correctly resize on its own
    -   TRY PLAYING with the overflow scroll bars so each panel keeps its contents to itself and doesn't overflow into the other.

    -   clean the old code that was using the re-resize library (the panel configs, their impls, and clean up state variables for the vertical resizer)
