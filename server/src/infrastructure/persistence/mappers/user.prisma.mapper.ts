import { User } from '../../../core/entities/users.entity';
import { Prisma } from '../generated/client';

export type UserWithRelations =
  Prisma.UserGetPayload<{}>;

export class UserPrismaMapper {
  static toDomain(raw: UserWithRelations): User {
    return new User(
      raw.id,
      raw.username,
      raw.email,
      raw.password,
      raw.firstname,
      raw.lastname,
      raw.phoneNumber,
    );
  }
}