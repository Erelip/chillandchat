import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from "@nestjs/common";
import { FileStorage } from "../../../core/interfaces/file-storage.interface";
import { File } from "../../../core/models/file";

@Injectable()
export class LocalStorage
    implements FileStorage {

    async storeFile(file: File, filename: string): Promise<string> {
        const filepath = `./uploads/avatars/${filename}`
        const uploadDir = path.join(process.cwd(), 'uploads', 'avatars');

        await fs.promises.mkdir(uploadDir, { recursive: true });

        await fs.promises.writeFile(
            path.join(uploadDir, filename),
            file.buffer,
        );
        
        return filepath;
    }

}