export class User {
  private _id: string;
  private _username: string;
  private _email: string;
  private _password: string;

  constructor(id: string, username: string, email: string, password: string) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._password = password;
  }

  get id(): string {
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

  set id(id: string) {
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
}