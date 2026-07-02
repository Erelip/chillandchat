import { Module } from "@nestjs/common";
import { IdGenerator } from "../../core/interfaces/uuid-generator.interface";
import { UuidGenerator } from "../../infrastructure/generator/uuid.generator";
import { FileStorage } from "../../core/interfaces/file-storage.interface";
import { LocalStorage } from "../../infrastructure/storage/local-storage/local-storage";

@Module({
  providers: [
    {
      provide: IdGenerator,
      useClass: UuidGenerator,
    },
    {
      provide: FileStorage,
      useClass: LocalStorage,
    },
  ],
  exports: [IdGenerator, FileStorage],
})
export class SharedModule {}