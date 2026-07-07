import { File } from './file';

export class UpdateConversationAvatarCommand {
  constructor(
    public readonly conversationId: string,
    public readonly file: File,
  ) {}
}