import { ConversationType } from "../../core/enum/conversation.enum";
import { ConversationParticipantDTO } from "./conversation-participant.dto";
import { MessageDTO } from "./message.dto";

export class ConversationDTO {
	id: string;
	participants: ConversationParticipantDTO[];
	name: string | null;
	message: MessageDTO | null;
	createdAt: Date;
	updatedAt: Date;
	type: ConversationType;
	avatar: string|null;

	constructor(id: string,
		participants: ConversationParticipantDTO[],
		name: string | null,
		message: MessageDTO | null,
		createdAt: Date,
		updatedAt: Date,
		type: ConversationType,
		avatar: string|null
	) {
		this.id = id;
		this.participants = participants;
		this.name = name;
		this.message = message;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.type = type;
		this.avatar = avatar;
	}
}