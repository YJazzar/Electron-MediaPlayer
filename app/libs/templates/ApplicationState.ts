import PlaylistDetails from './PlaylistDetails';

export default interface ApplicationState {
    playing: boolean;
    currFilePlaying: string | null;
    window: {
        width: number;
        height: number;
    };
    playNewFileCB: (filePath: string) => void;
    playlistNames: string[];
    playlists: PlaylistDetails[];
    currSelectedPlaylist: string;
}
