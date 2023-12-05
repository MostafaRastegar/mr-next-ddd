import type { User } from "@/modules/users/domains/models/User";

export interface IUserService {
  createUser(userData: User): Promise<User>;
  getAllUser(): Promise<User[] | null>;
  getUserById(userId: number): Promise<User | null>;
}
