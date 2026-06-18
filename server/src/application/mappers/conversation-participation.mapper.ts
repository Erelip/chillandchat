import { ConversationParticipant } from '../../core/entities/conversation-participant.entity';
import { UserMapper } from './user.mapper';
import { ConversationParticipantDTO } from '../../application/dto/conversation-participant.dto';

export class ConversationParticipationMapper {
  static toDTO(participant: ConversationParticipant): ConversationParticipantDTO {
    const user = UserMapper.toDTO(participant.user);
    return new ConversationParticipantDTO(
      participant.id,
      user,
      participant.joinedAt
    )
  }
}