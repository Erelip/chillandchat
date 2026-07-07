import { File } from "../models/file";

export abstract class FileStorage {
    abstract storeFile(file: File, filename: string): Promise<string>;
}