export class UserDTO {
  id: string | null;
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;

  constructor(
    id: string | null,
    email: string,
    firstname: string,
    lastname: string,
    phoneNumber: string
  ) {
    this.id = id;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phoneNumber = phoneNumber;
  }
}