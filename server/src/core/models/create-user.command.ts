export class CreateUserCommand {
  constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly phoneNumber: string,
  ) {}
}