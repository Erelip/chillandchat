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
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber
    };
  }
}