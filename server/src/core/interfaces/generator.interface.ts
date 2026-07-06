export abstract class Generator {
  abstract generateUUID(): string;
  abstract generateInt(min: number, max: number): number;
}