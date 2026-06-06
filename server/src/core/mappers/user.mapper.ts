import { UserDTO } from '../../application/dto/user.dto';
import { User } from '../entities/users.entity';

export class UserMapper {
  static toDomain(data: {
    id: string;
    username: string;
    email: string;
    password: string;
  }): User {
    return new User(
      data.id,
      data.username,
      data.email,
      data.password
    );
  }

  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}