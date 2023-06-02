import fs from 'fs';
export default class FileHelper {
    static writeStringToFile = async (
        path: string,
        data: string,
    ): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            fs.writeFile(path, data, 'utf-8', (err: any) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    static readStringFromFile = async (
        path: string,
    ): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(path, { encoding: "utf8" }, (err: any, data: any) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
}
