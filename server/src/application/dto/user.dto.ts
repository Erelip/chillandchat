export class UserDTO {
  id: string | null;
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  avatar: string|null;

  constructor(
    id: string | null,
    email: string,
    firstname: string,
    lastname: string,
    phoneNumber: string,
    avatar: string|null
  ) {
    this.id = id;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phoneNumber = phoneNumber;
    this.avatar = avatar;
  }
}