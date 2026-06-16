export class User {
  private _id: string|null;
  private _username: string;
  private _email: string;
  private _password: string;
  private _firstname: string;
  private _lastname: string;
  private _phoneNumber: string;

  constructor(id: string|null, username: string, email: string, password: string, firstname: string, lastname: string, phoneNumber: string) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._password = password;
    this._firstname = firstname
    this._lastname = lastname
    this._phoneNumber = phoneNumber
  }

  get id(): string|null{
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get firstname(): string {
    return this._firstname;
  }

  get lastname(): string {
    return this._lastname;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set id(id: string|null) {
    this._id = id;
  }

  set username(date: string) {
    this._username = date;
  }

  set email(date: string) {
    this._email = date;
  }

  set password(password: string) {
    this._password = password;
  }

  set firstname(firstname: string) {
    this._firstname = firstname;
  }

  set lastname(lastname: string) {
    this._lastname = lastname;
  }

  set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }
}