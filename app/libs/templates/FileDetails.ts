export interface DateElements {
    hours: number;
    minutes: number;
    seconds: number;
    month: number;
    day: number;
    year: number;
    formattedDate: string; // Will be in the form of: MM/DD/YYYY (Ex: 5/7/2020)
    formattedTime: string; // Will be in the form of: HH:MM:SS [AM|PM] (Ex: 8:30:00 PM)
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
