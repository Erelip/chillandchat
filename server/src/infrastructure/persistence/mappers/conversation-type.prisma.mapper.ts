import { ConversationType } from '../../../core/enum/conversation.enum';
import { ConversationType as ConversationPrismaType} from '../generated/client';

export class ConversationTypePrismaMapper {
  static toDomain(type : ConversationPrismaType): ConversationType {
    return type == ConversationPrismaType.DIRECT ? ConversationType.DIRECT : ConversationType.GROUP;
  }

  static toPersistence(type : ConversationType): ConversationPrismaType {
    return type == ConversationType.DIRECT ? ConversationPrismaType.DIRECT : ConversationPrismaType.GROUP;
  }
}