import { File } from './file';

export class UpdateUserAvatarCommand {
  constructor(
    public readonly userId: string,
    public readonly file: File,
  ) {}
}

export class UpdateUserInfoCommand {
  constructor(
    public readonly id: string,
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly phoneNumber: string,
  ) {}
}