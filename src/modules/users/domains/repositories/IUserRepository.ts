import {
  UserLogin,
  UserRegister,
  UserUpdate,
  UserCurrent,
} from "../models/User";

export interface IUserRepository {
  update(body: UserUpdate): Promise<UserCurrent>;
  findByToken(token?: string): Promise<UserCurrent>;
  findByEmailAndPassword(body: UserLogin): Promise<UserCurrent>;
  create(body: UserRegister): Promise<UserCurrent>;
}
