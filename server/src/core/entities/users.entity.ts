export class User {

  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly phoneNumber: string,
    public readonly avatar: string|null
  ) {}
}