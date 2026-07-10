import { environment } from '../../../environments/environment.dev';
import { UserDTO } from '../../application/dto/user.dto';
import { User } from '../../core/entities/users.entity';

export class UserMapper {
	static toDTO(user: User): UserDTO {
		const avatar = `${environment.APP_URL}/uploads/avatars/${user.avatar}`
		
		return new UserDTO(
			user.id!,
			user.email,
			user.firstname,
			user.lastname,
			user.phoneNumber,
			user.avatar ? avatar : null
		);
	}
}