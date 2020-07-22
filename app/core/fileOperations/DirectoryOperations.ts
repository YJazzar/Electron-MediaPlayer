export default class DirectoryOperations {
    public static async getFolderContents(): Promise<string> {
        return this.readDirectory();
    }

    private static async readDirectory(): Promise<string> {
        return new Promise((resolve, reject) => {
            return 'hello from Directory Operations';
        });
    }
}
