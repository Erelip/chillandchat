export class UserDTO {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;

  constructor(id: string, username: string, email: string, firstname: string, lastname: string, phoneNumber: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phoneNumber = phoneNumber;
  }
}