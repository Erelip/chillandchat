import { UserDTO } from '../../application/dto/user.dto';
import { User } from '../../core/entities/users.entity';

export class UserMapper {
  static toDTO(user: User): UserDTO {
    return new UserDTO(
      user.id!,
      user.email,
      user.firstname,
      user.lastname,
      user.phoneNumber,
      user.avatar
    );
  }
}