import { User } from "../models/User";

export interface IUserRepository {
  all(): Promise<User[]>;
  find(id: number): Promise<User>;
  create(data: object): Promise<User>;
}
