export default class DirectoryOperations {
    static async getFolderContents() {
        console.log('now calling async funct');
        // const result: string = await this.readDirectory();
        // console.log(result);
        console.log(await this.readDirectory());
        console.log(this.readDirectory());
        console.log('exiting applicaton');
        // return result;
    }

    private static readDirectory(): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve('hello from Directory Operations');
        });
    }
}
