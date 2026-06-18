import { Injectable } from "@nestjs/common";
import { IdGenerator } from "../../core/interfaces/uuid-generator.interface";
import { randomUUID } from "crypto";

@Injectable()
export class UuidGenerator
  implements IdGenerator {

  generate(): string {
    return randomUUID();
  }
}