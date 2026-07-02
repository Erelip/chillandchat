import { File } from "../../application/dto/file.dto";

export abstract class FileStorage {
    abstract storeFile(file: File, filename: string): Promise<string>;
}