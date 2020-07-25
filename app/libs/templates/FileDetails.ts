export interface DateElements {
    hours: number;
    minutes: number;
    seconds: number;
    month: number;
    day: number;
    year: number;
    formattedDate: string;
}

export default interface FileDetails {
    isFile: boolean;
    isDirectory: boolean;
    filePath: string; // The full (resolvable) filePath
    fileName: string; // The pure name of the file (without the file extension or the full path)
    fileExtension: string;
    size: string;
    duration: number;
    dateElements: DateElements;
}
