import { File } from './file';

export class UpdateConversationAvatarCommand {
	constructor(
		public readonly conversationId: string,
		public readonly file: File,
	) {}
}

export class UpdateConversationInfoCommand {
	constructor(
		public readonly conversationId: string,
		public readonly name: string|undefined,
		public readonly participantIdsToRemove: string[],
	) {}
}