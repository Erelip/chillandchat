import { UserRepository } from "../interfaces/user.repository.interface";
import { ConversationRepository } from "../interfaces/conversation.repository.interface";
import { ConversationType } from "../enum/conversation.enum";
import { ConversationParticipantRepository } from "../interfaces/conversation-participant.repository.interface";
import { ConversationParticipant } from "../entities/conversation-participant.entity";
import { User } from "../entities/users.entity";
import { Conversation } from "../entities/conversation.entity";
import { IdGenerator } from "../interfaces/uuid-generator.interface";

export class CreateConversations {
  constructor(
    private userRepository: UserRepository,
    private conversationRepository: ConversationRepository,
    private conversationParticipantRepository: ConversationParticipantRepository,
    private idGenerator: IdGenerator
  ) {}

  async createConversations(me: string, ids: string[]): Promise<Conversation> {
    const participantIds = [me, ...ids];

    if (participantIds.length < 2) {
        throw new Error("At least two user IDs are required to create a conversation.");
    }

    const users = await Promise.all(participantIds.map(id => this.userRepository.findById(id)));

    const newConversation = new Conversation(
      this.idGenerator.generate(),
      null,
      participantIds.length > 2 ? ConversationType.GROUP : ConversationType.DIRECT,
      [],
      [],
      new Date(),
      new Date(),
      null
    )

    await this.conversationRepository.save(newConversation);
    this.addParticipants(newConversation, users as User[]);
    return newConversation;
  }

  async addParticipants(conversation: Conversation, users: User[]): Promise<void> {
    const conversationParticipants = users.map((user) => {
      const participant = new ConversationParticipant(
        this.idGenerator.generate(),
        conversation.id,
        user,
        new Date()
      )
      return participant;
    });
    conversation.addParticipants(conversationParticipants);
    await this.conversationParticipantRepository.saveMany(conversationParticipants);
  }

}
