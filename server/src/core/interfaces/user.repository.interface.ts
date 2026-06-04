import { User } from "../../adapters/prisma/entities/user";

export abstract class UserRepository {
  abstract save(username: string, email: string, password: string): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract findById(id: string): Promise<User | null>;

  abstract findByEmail(email: string): Promise<User | null>;

  abstract findByUsername(username: string): Promise<User | null>;
}