import { File } from './file';

export class UpdateUserAvatarCommand {
  constructor(
    public readonly userId: string,
    public readonly file: File,
  ) {}
}