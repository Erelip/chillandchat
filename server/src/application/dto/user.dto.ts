export class UserDTO {
	id: string | null;
	email: string;
	firstname: string|null;
	lastname: string|null;
	phoneNumber: string|null;
	avatar: string|null;
	provider: string|null;

	constructor(
		id: string | null,
		email: string,
		firstname: string|null,
		lastname: string|null,
		phoneNumber: string|null,
		avatar: string|null,
		provider: string|null
	) {
		this.id = id;
		this.email = email;
		this.firstname = firstname;
		this.lastname = lastname;
		this.phoneNumber = phoneNumber;
		this.avatar = avatar;
		this.provider = provider;
	}
}