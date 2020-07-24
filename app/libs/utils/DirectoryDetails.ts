import FileDetails from './FileDetails';

export default interface DirectoryDetails {
    dirPath: string;
    fileStatDetails: FileDetails[];
}
