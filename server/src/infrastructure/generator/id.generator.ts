import { Injectable } from "@nestjs/common";
import { Generator } from "../../core/interfaces/generator.interface";
import { randomUUID, randomInt } from "crypto";

@Injectable()
export class IdGenerator
  implements Generator {

  generateUUID(): string {
    return randomUUID();
  }

  generateInt(min: number, max: number): number {
    return randomInt(min, max);
  }
}