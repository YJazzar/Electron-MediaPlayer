import FileDetails from './FileDetails';

export default interface PlaylistDetails {
    playlistName: string;
    directoryPaths: string[];
    mediaFiles: FileDetails[];
}
