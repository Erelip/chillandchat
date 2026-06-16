import { UserDTO } from '../../application/dto/user.dto';
import { User } from '../entities/users.entity';

export class UserMapper {
  static toDomain(data: {
    id: string;
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
  }): User {
    return new User(
      data.id,
      data.username,
      data.email,
      data.password,
      data.firstname,
      data.lastname,
      data.phoneNumber,
    );
  }

  static toDTO(user: User): UserDTO {
    return new UserDTO(
      user.id!,
      user.email,
      user.firstname,
      user.lastname,
      user.phoneNumber
    );
  }
}