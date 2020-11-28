export default interface ApplicationState {
    playing: boolean;
    currFilePlaying: string | null;
    window: {
        width: number;
        height: number;
    };
    playNewFile: (filePath: string) => void;
}
