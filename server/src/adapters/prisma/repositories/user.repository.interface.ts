interface UserRepository {
  createUser(user: { username: string; email: string; password: string }): Promise<void>;

  getUserByEmail(email: string): Promise<{ id: number; username: string; email: string; password: string } | null>;

  getUserById(id: number): Promise<{ id: number; username: string; email: string; password: string } | null>;
}