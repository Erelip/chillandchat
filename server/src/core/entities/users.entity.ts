export class User {
	constructor(
		public readonly id: string,
		public readonly username: string,
		public readonly email: string,
		public readonly password: string|null,
		public readonly firstname: string|null,
		public readonly lastname: string|null,
		public readonly phoneNumber: string|null,
		public readonly avatar: string|null,
		public readonly provider: string|null,
	) {}
}