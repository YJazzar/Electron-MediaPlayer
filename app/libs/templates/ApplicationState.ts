import FileDetails from './FileDetails';
import PlaylistDetails from './PlaylistDetails';

export default interface ApplicationState {
    playing: boolean;
    currFilePlaying: string | null;
    window: {
        width: number;
        height: number;
    };
    playlistNames: string[];
    playlists: PlaylistDetails[];
    currSelectedPlaylist: string;
    queue: FileDetails[]; // An array of filePaths that need to be played
    getNextQueue: () => void; // Modifies ApplicationState to play the next file
    playFileCB: (file: FileDetails) => void;
    addToQueue: (file: FileDetails) => void;
}
