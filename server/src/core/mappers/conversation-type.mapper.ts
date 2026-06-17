import { ConversationType } from '../enum/conversation.enum';
import { ConversationType as ConversationPrismaType} from '../../adapters/prisma/generated/client';

export class ConversationTypeMapper {
  static toDomain(type : ConversationPrismaType): ConversationType {
    return type == ConversationPrismaType.DIRECT ? ConversationType.DIRECT : ConversationType.GROUP;
  }

  static toPersistence(type : ConversationType): ConversationPrismaType {
    return type == ConversationType.DIRECT ? ConversationPrismaType.DIRECT : ConversationPrismaType.GROUP;
  }
}