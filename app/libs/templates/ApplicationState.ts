import FileDetails from './FileDetails';
import PlaylistDetails from './PlaylistDetails';

export default interface ApplicationState {
    // Used to determine if an <audio> tag needs to be loaded
    playing: boolean;

    // The full filePath of the file playing
    currFilePlaying: string | null;

    // An array containing the playlists stored in data/index.json
    playlistNames: string[];

    // The full contents of data stored in data/index.json
    playlists: PlaylistDetails[];

    // The name of the playlist selected by the user (used to display its contents in MainContentsPanel)
    currSelectedPlaylist: string;

    // Used to enable and disable adding new items to the queue
    queueEnabled: boolean;

    // An array of filePaths that need to be played
    queue: FileDetails[];

    // The index to use for controlling the queue
    currQueueIndex: number;

    // Modifies ApplicationState to play the next file
    playNextQueue: () => void;

    // Modifies ApplicationState to play the prev file
    playPrevQueue: () => void;

    // Clears the queue
    clearQueue: () => void;

    // Clears all items in the queue until the item playing currently
    clearPlayed: () => void;

    // Plays a specific file (needs the full FileDetails)
    playFileCB: (file: FileDetails) => void;

    // Adds a specific file to the queue
    addToQueue: (file: FileDetails) => void;
}
