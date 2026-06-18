import { Module } from "@nestjs/common";
import { IdGenerator } from "../../core/interfaces/uuid-generator.interface";
import { UuidGenerator } from "../../infrastructure/generator/uuid.generator";

@Module({
  providers: [
    {
      provide: IdGenerator,
      useClass: UuidGenerator,
    },
  ],
  exports: [IdGenerator],
})
export class SharedModule {}